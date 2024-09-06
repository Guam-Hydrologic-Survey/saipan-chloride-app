/* 
LMap.js 
Parameters: "element" - HTML element with ID containing Leaflet map
Return: none
*/

// components 
import { BaseLayers } from "./Baselayers.js";
import { SidePanel } from "./SidePanel.js";
import { MarkerPopup } from "./MarkerPopup.js";
import { MultiplePlots } from "./Plot.js";
import { completeSelection, additionalSelection, alreadySelected } from "./Toast.js";
import { SelectionView, choices, choicesLayers, createCheckBox } from "./SelectionView.js";
import { checkLastValue, getIcon } from "./CustomIcon.js";
import { chlorideToggleBtns, layersResetBtnId, layersRemoveBtnId } from "./Legend_v3.js";

// utils 
import { geoJsonUrl } from "../utils/dataSource.js";
import { createChoice } from "../utils/createChoice.js";

let geoJsonData;

let selectionMode = "";

const lassoControl = L.control.lasso({ position: "bottomright" });

let pointSelectBtnState = false;
let pointSelectLayers = [];

const pointSelectBtn = L.easyButton({
    states: [
        {
            stateName: 'detrigger-pointSelectBtn',
            icon: '<img src="./src/assets/hand-index-thumb.svg">',
            title: 'Select points to plot on click',
            onClick: function(btn, map) {
                console.log("Turned on point selection through click");
                btn.state('trigger-pointSelectBtn');
                pointSelectBtnState = true;
                console.log(pointSelectBtnState);
                map.on("click", function(point) {
                    console.log(point.latlng);
                    // console.log(point.target.feature.properties.name);
                    console.log("Selected a point.")
                });
                selectionMode = "click";
                // additionalSelection(document.getElementById("notif"));
                SelectionView();
            }
        },
        {
            stateName: 'trigger-pointSelectBtn',
            icon: '<img src="./src/assets/hand-index-thumb-fill.svg">',
            title: "Turn off click-on-point selection",
            onClick: function(btn) {
                console.log("Turned off point selection through click");
                btn.state('detrigger-pointSelectBtn');
                pointSelectBtnState = false;
                pointSelectLayers = [];
                // choicesLayers = [];
                const selectionView = document.getElementById("selection-view-offcanvas");
                const selectionViewOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(selectionView);
                selectionViewOffcanvas.hide();
            }
        }
    ]
});

export function LMap(element) {

    // center of guam 
    // const center = [13.5435056,144.7478083];

    // center of saipan
    const center = [15.187953368844124,145.71065791414713];
    const defaultZoom = 12;
    const maxZoom = 19; 

    // creates Leaflet map 
    const map = L.map(element, {
        center: center,
        zoom: defaultZoom,
        zoomControl: false,
    });

    const baseLayers = BaseLayers(map, maxZoom);

    const layerControl = L.control.layers(baseLayers, null, { position: "bottomright" });
    layerControl.addTo(map);

    const mapTitle = L.control({position: 'topleft'});

    //TODO: CHANGE MAP TITLE CARD
    mapTitle.onAdd =  function(map) {
        this._div = L.DomUtil.create('div', 'mapTitle'); 
        this._div.innerHTML = '<img src="./src/assets/WERI_MAppFx_CNMI_Well_Chlorides_Title_Card_White_Bold.png" height="125">';
        return this._div;
    };

    mapTitle.addTo(map);

    const zoomControl = L.control.zoom({
        // options: topleft, topright, bottomleft, bottomright
        position: 'bottomright'
    });
    zoomControl.addTo(map);

    const resetZoomBtn = L.easyButton('<img src="./src/assets/geo-fill.svg">', function() {
        map.setView(center, defaultZoom);
    }, "Reset map view");

    const controlBar = L.easyBar([
        resetZoomBtn,
    ], { position: "bottomright" });

    controlBar.addTo(map);

    // draw control bar
    var drawnFeatures = new L.FeatureGroup();
    map.addLayer(drawnFeatures);

    var drawControl = new L.Control.Draw({
        position: "bottomright",
        draw: {
            polyline: {
                allowIntersection: true,
                shapeOptions: {
                    color: "orange"
                }
            },
            polygon: {
                allowIntersection: false,
                showArea: true,
                showLength: true,
                shapeOptions: {
                    color: "purple",
                    clickable: true
                }
            },
            circle: {
                shapeOptions: {
                    shapeOptions: {
                        color: "blue",
                        clickable: true
                    }
                }
            },
            circlemarker: false,
            rectangle: {
                showArea: true,
                showLength: true,
                shapeOptions: {
                    color: "green",
                    clickable: true
                }
            },
            marker: false
        },
        edit: {
            featureGroup: drawnFeatures,
            remove: true,
        }
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, function(event) {
        var layer = event.layer;
        drawnFeatures.addLayer(layer);
    });

    if (map.hasLayer(drawnFeatures)) {
        layerControl.addOverlay(drawnFeatures, "Drawings");
    } 

     // TODO - refine layers for chloride ranges
    // Layer groups for chloride ranges 
    let chlorideLayers = "Toggle All Chloride Levels"; 

    const chlorideRange0to30 = L.layerGroup();
    const chlorideRange150 = L.layerGroup();
    const chlorideRange250 = L.layerGroup();
    const chlorideRange500 = L.layerGroup();
    const chlorideRange750 = L.layerGroup();
    const chlorideRange1000 = L.layerGroup();
    const chlorideRange1000Plus = L.layerGroup();

    function checkLayerExistence(layer) {
        if (!map.hasLayer(layer)) {
            layer.addTo(map);
        } else {
            map.removeLayer(layer);
        }
    }

    function checkCheckBox(choice, layer) {
        if (choice) {
            layer.addTo(map)
        } else {
            map.removeLayer(layer)
        }
    }

    document.addEventListener('DOMContentLoaded', (e) => {
        setTimeout(() => {

            chlorideRange0to30.addTo(map);
            chlorideRange150.addTo(map);
            chlorideRange250.addTo(map);
            chlorideRange500.addTo(map);
            chlorideRange750.addTo(map);
            chlorideRange1000.addTo(map);
            chlorideRange1000Plus.addTo(map);
            

            // TODO - simplify adding layers back to map
            // Resets layers on map (adds everything back)
            document.getElementById(layersResetBtnId).addEventListener('click', () => {
                chlorideRange0to30.addTo(map);
                chlorideRange150.addTo(map);
                chlorideRange250.addTo(map);
                chlorideRange500.addTo(map);
                chlorideRange750.addTo(map);
                chlorideRange1000.addTo(map);
                chlorideRange1000Plus.addTo(map);
                // Check the respective checkboxes
                // Check all checkboxes value
                const checkboxes = document.querySelectorAll('.form-check-input');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = true;
                });
            });

            // TODO - add event listener for REMOVE LAYERS button on Legend panel 
            document.getElementById(layersRemoveBtnId).addEventListener('click', () => {
                // PSEUDOCODE: uncheck all boxes, remove all chloride and production layers from map 
                const checkboxes = document.querySelectorAll('.form-check-input');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });

                map.removeLayer(chlorideRange0to30);
                map.removeLayer(chlorideRange150);
                map.removeLayer(chlorideRange250);
                map.removeLayer(chlorideRange500);
                map.removeLayer(chlorideRange750);
                map.removeLayer(chlorideRange1000);
                map.removeLayer(chlorideRange1000Plus);

            });

            // TODO - change to for loop, add each chlorideRange layer into an array list (same goes for productionRange layers)
            // Event listeners for chloride range layers 
            document.getElementById(chlorideToggleBtns[0]).addEventListener('click', () => {
                checkLayerExistence(chlorideRange0to30)
            });

            document.getElementById(chlorideToggleBtns[1]).addEventListener('click', () => {
                checkLayerExistence(chlorideRange150)
            });
            
            document.getElementById(chlorideToggleBtns[2]).addEventListener('click', () => {
                checkLayerExistence(chlorideRange250)
            }); 

            document.getElementById(chlorideToggleBtns[3]).addEventListener('click', () => {
                checkLayerExistence(chlorideRange500)
            });

            document.getElementById(chlorideToggleBtns[4]).addEventListener('click', () => {
                checkLayerExistence(chlorideRange750)
            });
            
            document.getElementById(chlorideToggleBtns[5]).addEventListener('click', () => {
                checkLayerExistence(chlorideRange1000)
            });

            document.getElementById(chlorideToggleBtns[6]).addEventListener('click', () => {
                checkLayerExistence(chlorideRange1000Plus)
            });

          

            //
            document.getElementById(chlorideToggleBtns[1]).addEventListener('click', (e) => {
                checkCheckBox(e.target.checked, chlorideRange150)
            });
            
            document.getElementById(chlorideToggleBtns[2]).addEventListener('click', (e) => {
                checkCheckBox(e.target.checked, chlorideRange250)
            }); 

            document.getElementById(chlorideToggleBtns[3]).addEventListener('click', (e) => {
                checkCheckBox(e.target.checked, chlorideRange500)
            });

            document.getElementById(chlorideToggleBtns[4]).addEventListener('click', (e) => {
                checkCheckBox(e.target.checked, chlorideRange750)
            });
            
            document.getElementById(chlorideToggleBtns[5]).addEventListener('click', (e) => {
                checkCheckBox(e.target.checked, chlorideRange1000)
            });

            document.getElementById(chlorideToggleBtns[6]).addEventListener('click', (e) => {
                checkCheckBox(e.target.checked, chlorideRange1000Plus)
            });


        

    }, 1000);
    });

    // console.log(pointSelectBtn.options.states);

    const pointSelectionControls = L.easyBar([
        pointSelectBtn,
    ], { position: "bottomright" });

    pointSelectionControls.addTo(map);
    
    lassoControl.addTo(map); 

    // hides tooltip based on zoom level 
    map.on('zoomend', function(z) {
        var zoomLevel = map.getZoom();
        if (zoomLevel >= 15 ){
            [].forEach.call(document.querySelectorAll('.leaflet-tooltip'), function (t) {
                t.style.visibility = 'visible';
            });
        } else {
            [].forEach.call(document.querySelectorAll('.leaflet-tooltip'), function (t) {
                t.style.visibility = 'hidden';
            });
        }
    });

    // array holding well with status for use on point selection through click 
    // let choices = [];
    
    // get data 
    fetch(geoJsonUrl)
        .then(response => response.json())
        .then(geojson => {
            let popup = L.popup()
            const getValues = (feature, layer) => {
                // popup with basic well info and buttons for stats and plot
                layer.bindPopup(MarkerPopup(feature.properties.name, feature.properties.basin, feature.properties.lat, feature.properties.lon, feature.properties.desc)); 

                // label for well name
                layer.bindTooltip(feature.properties.name, {permanent: true, direction: 'bottom', offset: [0,10]});

                // check if point selection button has been triggered 
                layer.on("click", point => { 
                    map.closePopup(); 
                    // prevents popup from opening since side panel automatically opens 
                    if (!pointSelectBtnState) {
                        // map.closePopup(); 
                        SidePanel(point.target.feature.properties);
                        pointSelectLayers = [];
                        // choicesLayers = [];
                        choicesLayers.length = 0;
                       
                    } else {
                        console.log(point.target.feature.properties.name);

                        // check if point was already clicked/selected 
                        if (!pointSelectLayers.includes(point.target.feature.properties)) {
                            pointSelectLayers.push(point.target.feature.properties);
                            choicesLayers.push(point.target.feature.properties);
                            createCheckBox(point.target.feature.properties.name);

                            // create choice object and add to choices array 
                            choices.push(createChoice(point.target.feature.properties.name, true));
                            // console.log(choices);

                        } else {
                            alreadySelected(document.getElementById("notif"), point.target.feature.properties.name);
                        }
                    }
                })
            }
            geoJsonData = L.geoJSON(geojson, { 
                pointToLayer: function(feature, latlng) { // Designates custom marker for each well 
                    let svg = getIcon(feature.properties); 

                    let point = L.marker(latlng, {
                        icon: L.divIcon({
                            className: "custom-icon",
                            html: `${svg}`,
                            iconSize: [30, 30],
                        }),
                    });

                    // Add point to chloride range layer group
                    const latestChloride = checkLastValue(feature.properties.y_vals)[0]

                    // Adds point to chloride range layer based on value 
                    if (latestChloride == null ) {
                        point.addTo(chlorideRange0to30);
                    } else if (latestChloride == 0) {
                        point.addTo(chlorideRange0to30);
                    } else if (latestChloride <= 30) {
                        point.addTo(chlorideRange0to30);
                    } else if (latestChloride <= 150) {
                        point.addTo(chlorideRange150);
                    } else if (latestChloride <= 250) {
                        point.addTo(chlorideRange250);
                    } else if (latestChloride <= 500) {
                        point.addTo(chlorideRange500);
                    } else if (latestChloride <= 750) {
                        point.addTo(chlorideRange750);
                    } else if (latestChloride <= 1000) {
                        point.addTo(chlorideRange1000);
                    } else if (latestChloride > 1000) {
                        point.addTo(chlorideRange1000Plus);
                    }


                    return point;
                },
                onEachFeature: (getValues) 
            }).addTo(map);
            layerControl.addOverlay(geoJsonData, "Layer Name");

            // for search control 
            let searchCoords = [];
            let searchMarker = L.circle(searchCoords, {
                color: "red",
                fillColor: "",
                fillOpacity: 0.5,
                weight: 3,
                radius: 300,
            });

            // search control 
            const searchControl = new L.Control.Search({ 
                container: "search-box",
                layer: geoJsonData, 
                initial: false,
                collapsed: false,
                propertyName: 'name', 
                casesensitive: false, 
                textPlaceholder: 'Search wells...', 
                textErr: 'Sorry, could locate well. Please try again.', 
                autoResize: true, 
                moveToLocation: function(latlng, title, map) { 
                    searchCoords = latlng;
                    searchMarker = L.circle(searchCoords, {
                        color: "red",
                        fillColor: "",
                        fillOpacity: 0.5,
                        weight: 3,
                        radius: 80,
                        className: "search-pulse",
                    });
                    searchMarker.addTo(map);
                    map.flyTo(latlng, 16); 
                    setTimeout(() => {
                        searchMarker.remove();
                      }, 8000);
                }, 
                marker: false,
            }); 

            searchControl.on("search:locationfound", function(point) { 
                // point.layer.openPopup(); 
                SidePanel(point.layer.feature.properties);
                document.getElementById("searchtext15").value = "";
            }); 

            // initialize search 
            map.addControl(searchControl);
        });

    // leaflet lasso configuration 
    map.on("lasso.finished", event => {
        // error handing checks if there are layers within selection using array.length
        if (event.layers.length != 0) {
            completeSelection(document.getElementById("notif"), event.layers);
            MultiplePlots(event.layers, document.getElementById("multi-plot-view-contents"), "lasso");
            // console.log(event.layers);
        } 

        selectionMode = "lasso";
    });

    // functionality for #select-more-points btn in FullscreenModal.js 
    let fullScreenModalMorePoints = document.getElementById("select-more-points");
    fullScreenModalMorePoints.addEventListener("click", () => {
        additionalSelection(document.getElementById("notif"));
        if (lassoControl.enabled()) {
            lassoControl.disable();
        } else {
            lassoControl.enable();
        }
    });
}

// other components have access to this export 
// TODO - include point selection control as an export along with lassoControl to be triggered back on/off upon clicking "Select more points to plot" button in FullscreenModal.js 
export { selectionMode, lassoControl, pointSelectBtn };

let selectionState;

export function updateSelectionStates() {
    selectionState = {
        method: "",
        state: false,
    }

    for (let input of document.querySelectorAll('input')) {
        if (input.checked) {
            switch (input.className) { }
        }
    }
}
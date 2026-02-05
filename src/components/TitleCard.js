/*
TitleCard.js
*/

export function TitleCard(map) {
    const img_path = "./src/assets/WERI_MAppFx_CNMI_Production_Chloride_Title_Card_White_Bold.png";

    const mapTitle = L.control({position: 'topleft'});

    mapTitle.onAdd =  function(map) {
        this._div = L.DomUtil.create('div', 'mapTitle'); 
        this._div.innerHTML = `<img src="${img_path}" height="125">`;
        return this._div;
    };

    mapTitle.addTo(map);
}
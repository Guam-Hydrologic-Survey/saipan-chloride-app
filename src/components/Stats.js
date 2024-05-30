/*
Stats.js
Exports: getStats(statistics, element)
Parameters: "statistics" - JSON object with available statistic properties; "element" - HTML element to be updated with generated HTML content 
Return: None. Appends formatted HTML content in the "content" variable to the given HTML element passed through the parameters of the getStats() function. 
*/

// utils 
import { roundDec } from "../utils/roundDec.js";

// globals 
let content = "";

function header(statistics) {
    let info = /*html*/
    `
    <div class="side-panel-header">
        <h4>Well ${statistics.name}</h4>
        <div class="location" id="basin">${statistics.well_name} </div>
        <div class="location" id="coords">${roundDec(statistics.lat)}, ${roundDec(statistics.lon)}</div>
    </div>
    <hr/>
    `;
    return info;
}

/* 
Function: basicStats()
Parameters: "statistics" - JSON data (specifically "feature.properties" from fetch methon in LMap.js) containing statistic attributes 
Return: "basics" - a string variable containing HTML code for the basic statistics available 
Notes: This is the first row of the statistics section of the side panel. Update/change with available JSON properties and  the remove roundDec() util, if needed. 
*/
function basicStats(statistics) {
    let basics = /*html*/
    `
    <div id="stats-basic">
        <div class="stats-row">
            <!-- labels for basic statistics -->
            <div class="stats-col">
                <p class="stats-text">Facility ID</p>
                <p class="stats-text">Source ID</p>
                <p class="stats-text">Station No.</p>
                <p class="stats-text">Island</p>
            </div>
            <!-- values for basic statistics --> 
            <div class="stats-col">
                <p class="stats-num">${roundDec(statistics.facility_ID)}</p>
                <p class="stats-num">${roundDec(statistics.source_ID)}</p>
                <p class="stats-num">${roundDec(statistics.station_no)}</p>
                <p class="stats-num">${roundDec(statistics.island)}</p>
            </div>
        </div>
    </div>
    `;
    return basics;
}

/* 
Function: additionalStats()
Parameters: "statistics" - JSON data (specifically "feature.properties" from fetch methon in LMap.js) containing statistic attributes 
Return: "additionals" - a string variable containing HTML code for any additional statistics/analysis/information 
Notes: This is the second row of the statistics section of the side panel. Update/change with available JSON properties and  the remove roundDec() util, if needed. 
*/
function additionalStats(statistics) {
    let additionals = /*html*/
    `
    <div class="accordion" id="stats-additional">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <i>View Additional ${statistics.name} Statistics</i>
            </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#stats-additional">
                <div class="accordion-body">
                    <div class="stats-row">
                        <!-- labels for additional statistics -->
                        <div class="stats-col">
                            <p class="stats-text">Analyte</p>
                            <p class="stats-text">Unit</p>
                            <p class="stats-text">Production</p>
                        </div>
                        <!-- values for additional statistics -->
                        <div class="stats-col">                
                            <p class="stats-num">${(statistics.analyte)}</p>
                            <p class="stats-num">${(statistics.unit)}</p>              
                            <p class="stats-num">${(statistics.production)}</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    return additionals;
}

/* 
Function: getStats()
Parameters:
    "statistics" - JSON data (specifically "feature.properties" from fetch methon in LMap.js) containing statistic attributes 
    "element" - HTML element with ID for the statistics section's parent container 
Return: none 
Notes: Because of the reserve word, "export," this function is available to other components within the project. 
*/
export function getStats(statistics, element) {
    content = header(statistics) + basicStats(statistics) + additionalStats(statistics)
    document.getElementById(element).innerHTML = content;
}
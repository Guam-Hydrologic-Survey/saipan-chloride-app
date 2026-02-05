/* 
About.js
Parameters: "element" - an HTML element with ID for about modal
Return: none
*/

export function About(element) {
  element.innerHTML = /*html*/
  `
  <div class="modal fade" id="about" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">About</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
             <!-- nav tabs -->
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1"
                        type="button" role="tab" aria-controls="tab1" aria-selected="true">Abstract</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2"
                        type="button" role="tab" aria-controls="tab2" aria-selected="false">Developers</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="tab3-tab" data-bs-toggle="tab" data-bs-target="#tab3"
                        type="button" role="tab" aria-controls="tab3" aria-selected="false">Acknowledgements</button>
              </li>
            </ul>

            <!-- tab content -->
            <div class="tab-content mt-3" id="myTabContent">
              <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                <p>
                  <strong>MAppFx</strong> is a web page interactive map environment that retrieves an interactive graph of a site upon clicking a map feature object (be it a point, polygon, or a line). WERI Web MAppFx is a product of WERI through the Guam Hydrologic Survey Program (P.L. 24-247) and USGS 104-b, available through the <a href="https://guamhydrologicsurvey.uog.edu/" target="_blank" rel="noreferrer noopener">Guam Hydrologic Survey website</a>. 
              
                  <br><br>
                  Data originated from Bureau of Environmental and Coastal Quality's Data Manager and Team. Through a collaborative effort, the GHS Information 
                  Management Team created this online data visualization tool to facilitate modern means of data sharing and interagency outreach. The primary focus of this tool is to use nitrates as an indicator of groundwater contamination, making it an essential resource for environmental monitoring.
                  <br><br>
                  In terms of future development, the team behind WERI MAppFx plans to further enhance the user interface and user experience, taking into account feedback received during the 2023 CNMI Water Advisory Council Meeting. This includes improvements in identifying well shapes, implementing a color legend, incorporating additional statistics, and providing layers for different islands like Saipan, Tinian, and Rota. The ultimate goal is to seek approval to make this valuable product available for public viewing online, ensuring that it serves as a powerful tool for a wide range of users.
                  <br><br>
                </p>
              </div> <!-- end of tab 1 -->
              <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                <p>
                  <strong>WERI-GHS Information Management Team:</strong>
                  <br>MW Zapata · DK Valerio · SM Quintanilla · NC Habana
                </p>
              </div> <!-- end of tab 2 -->
              <div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                <p>
                  <strong>Acknowledgements</strong><br>
                  <i>Bureau of Environmental and Coastal Quality</i><br>
                  Glenn Arriola · Travis Spaeth · BECQ Team
                  <br><br>

                  <i>Brigham Young University</i><br>
                  Civil Engineering Department, Hydroinformatics Laboratory <br>
                  Riley Hales · Dr. Gus Williams · Dr. Norm Jones <br><br>
                  
                  <i>Water & Environmental Research Institute of the Western Pacific</i> <br>
                  University of Guam <br>
                  Shahram Khosrowpanah · Mark A. Lander · Bill Whitman <br><br>
                  
                  <i>University of Guam’s Web Team</i><br>
                  John Wiglesworth · Matthew Raymundo · UOG Web Team · Rommel Hidalgo
                </p>
              </div> <!-- end of tab 3 -->
            </div> <!-- end of tab content -->
          </div> <!-- end of modal body -->
          
          <div class="modal-footer about-btns">
            <a class="btn btn-success" title="MAppFx: Production Well Nitrates - CNMI" href="https://guam-hydrologic-survey.github.io/saipan-nitrates-app/" target="_blank" rel="noreferrer noopener" role="button">MAppFx: Production Well Nitrates - CNMI</a>
            <a class="btn btn-primary" title="Coming soon!" href="https://guamhydrologicsurvey.uog.edu/2025/11/07/mappfx-saipan-cnmi-production-well-nitrates/" target="_blank" rel="noreferrer noopener" role="button">WERI Technical Report</a>
            <div class="dropdown">
                <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  WERI Map Series
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="https://guamhydrologicsurvey.uog.edu/mappfx-library/" title="MAppFx Library on GHS" target="_blank" rel="noreferrer noopener">MAppFx Library</a></li>
                  <li><a class="dropdown-item" href="https://guamhydrologicsurvey.uog.edu/web-mapps-library/" title="Web MApps on GHS" target="_blank" rel="noreferrer noopener">Web MApps</a></li>
                </ul>
              </div>
          </div>
          
        </div>
      </div>
    </div>
    `
}
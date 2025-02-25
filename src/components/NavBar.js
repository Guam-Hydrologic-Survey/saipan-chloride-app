/* 
NavBar.js 
Parameters: "element" - HTML element with ID containing the nav bar
Return: none 
*/

export function NavBar(element) {

  // update this with link to designated GHS page/post, if available 
  const ghsPageLink = "https://guamhydrologicsurvey.uog.edu/";

  element.innerHTML = /*html*/
  `
  <!-- navbar button group -->
  <div class="bs-btn-group">
    <div class="btn-group" role="group" aria-label="Button group with nested dropdown">

      <!-- about button -->
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#about" title="About">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        </svg>
      </button>

      <!-- Toggle for Legend modal -->
      <button type="button" class="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#legend" title="Legend">
      <!--
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-task" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"/>
          <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z"/>
          <path fill-rule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"/>
        </svg>
        -->
        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.41439 5.63953L4.09302 1L6.77166 5.63953H1.41439Z" fill="white" stroke="white"/>
        <circle cx="4.83712" cy="11.5347" r="2.84884" fill="white" stroke="white"/>
        <rect x="9.80225" y="4.59302" width="5.69767" height="5.69767" fill="white" stroke="white"/>
        </svg>  
      </button>

      <!-- link to GHS page -->
      <!--
      <a class="btn btn-primary" href="${ghsPageLink}" target="_blank" rel="noreferrer noopener" role="button" title="Home">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
          <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
        </svg>
      </a>
      -->
    
      <!-- dropdown for links to WERI and GHS sites -->
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" title="Links">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
          </svg>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="https://weri.uog.edu/" target="_blank" rel="noreferrer noopener">Water & Environmental Research Institute of the Western Pacific (WERI)</a></li>
          <li><a class="dropdown-item" href="https://guamhydrologicsurvey.uog.edu/" target="_blank" rel="noreferrer noopener">Guam Hydrologic Survey (GHS)</a></li>
        </ul>
      </div>

      <!-- container for the Leaflet Control Search -->
      <div class="input-group" id="search-box"></div>

    </div>
  `
}
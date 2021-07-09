// Declare global variables
const main = document.querySelector(`.main-content`);
const {planet} = main.dataset;
const header = document.querySelector(`.header`);
const menu_toggle = header.querySelector(`.header__menu-icon`);
const menu = header.querySelector(`.menu`);

// Declare Variables for tablist, tabs, and tabpanels
const tablist = main.querySelector(`.tabs`);
const tabImg = tablist.querySelector(`.planet-image`);
const tabs = tablist.querySelectorAll(`[role='tab']`);
const tabpanels = Array.from(tablist.querySelectorAll(`[role='tabpanel']`));

// console.log(tabImg);

// Handle mobile menu toggle
function handleMenuToggle () {
    menu_toggle.classList.toggle(`--transition-opacity`);   
    menu.classList.toggle(`--hide`);   
}

menu_toggle.addEventListener(`click`, handleMenuToggle);


// Retrieve and parse json contents back into a Javascript array of objects.            
const getPlanets = async() => {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {    
            const message = `An error has occured: ${response.status}`;    
            throw new Error(message);  
        }
        const data = await response.json();
        // return data;
        getPlanetObject(data, planet);
        // getData(data);
    }catch(error) {
        console.error(error);
    }
};

// Retrieve and parse json contents back into a Javascript array of objects.
function getPlanetObject(data, planet) {
    const currentPlanet = data[planet];
    getPlanetInfo(currentPlanet);
}

function getPlanetInfo(currentPlanet) {    
    const suppInfo_copy = Array.from(main.querySelectorAll(`.suppInfo__copy`));
    const planetColor = `--${currentPlanet.name.toLowerCase()}`;
    const planetName = `${currentPlanet.name}`;
    const planetOverview_Content = `${currentPlanet.overview.content}`;
    const planetOverview_Source = `${currentPlanet.overview.source}`;
    const planetStructure_Content = `${currentPlanet.structure.content}`;
    const planetStructure_Source = `${currentPlanet.structure.source}`;
    const planetGeology_Content = `${currentPlanet.geology.content}`;
    const planetGeology_Source = `${currentPlanet.geology.source}`;
    const planetImage_Planet = `${currentPlanet.images.planet}`;
    const planetImage_Internal = `${currentPlanet.images.internal}`;
    const planetImage_Geology = `${currentPlanet.images.geology}`;
    const planetRotation = `${currentPlanet.rotation}`;
    const planetRevolution = `${currentPlanet.revolution}`;
    const planetRadius = `${currentPlanet.radius}`;
    const planetTemp = `${currentPlanet.temperature}`;    
    tabpanels[0].innerHTML = `
        <p>${planetOverview_Content}</p>
        <p>
            <span class="tabs__source">Source : <a href="${planetOverview_Source}" title="Learn more about ${planetName} on Wikipedia.">Wikipedia</a></span>
        </p>
    ` ;
    tabpanels[1].innerHTML = `
        <p>${planetStructure_Content}</p>
        <p>
            <span class="tabs__source">Source : <a href="${planetStructure_Source}" title="Learn more about ${planetName}'s internal structure on Wikipedia.">Wikipedia</a></span>
        </p>
    ` ;
    tabpanels[2].innerHTML = `
        <p>${planetGeology_Content}</p>
        <p>
            <span class="tabs__source">Source : <a href="${planetGeology_Source}" title="Learn more about ${planetName}'s surface geology on Wikipedia.">Wikipedia</a></span>
        </p>
    ` ;
    // console.log(planetColor);
    // console.log(planetName);
    // console.log(planetOverview_Content);
    // console.log(planetOverview_Source);
    // console.log(planetStructure_Content);
    // console.log(planetStructure_Source);
    // console.log(planetGeology_Content);
    // console.log(planetGeology_Source);
    // console.log(planetImage_Planet);
    // console.log(planetImage_Internal);
    // console.log(planetImage_Geology);
    // console.log(planetRotation);
    // console.log(planetRevolution);
    // console.log(planetRadius);
    // console.log(planetTemp);
    main.querySelector(`h1`).innerHTML = `${planetName}`;
    suppInfo_copy[0].innerHTML = `${planetRotation}`;
    suppInfo_copy[1].innerHTML = `${planetRevolution}`;
    suppInfo_copy[2].innerHTML = `${planetRadius}`;
    suppInfo_copy[3].innerHTML = `${planetTemp}`;
    
}


// Listen for click on tab buttons and show appropriate tabpanel.
// h2 is now e.target of tab, add closest so it goes back to the button for the tabs.


function getPlanetColor(planetColor) {
    return planetColor;
}

function handleTabSelect (e) {
    // console.log(e);
    tabpanels.forEach(tabpanel => {
        tabpanel.hidden = true;
    });
    tabs.forEach(tab => {
        tab.setAttribute(`aria-selected`, false);
    });
    let tabTarget = e.target.closest(`[role='tab']`);
    let planetColor = getPlanetColor();
    tabTarget.setAttribute(`aria-selected`, true);
    console.log(planetColor);
    // console.log(tabTarget.parentElement.style[`boder-bottom-color`] = `var(${planetColor})`);
    // tabTarget.parentElement.classList.add(`border-bottom: solid var(${planetColor})`);
    const {id} = tabTarget;
    // handlePlanetImage(id, tabImg);
    // console.log(`After handlePlanetImage: ${tabImg.src} ${tabImg.alt}`)
    const tabPanel = tabpanels.find(
        tabpanel => tabpanel.getAttribute(`aria-labelledby`) === id
        );
        tabPanel.hidden = false;
    }
    
    // function handlePlanetImage (id, tabImg) {
        //     switch (id, tabImg) {
            //         case id === `overview-tab`:
            //         tabImg.src = `${planetImage_Planet}`
            //         tabImg.alt = `Look at this planet!`
            //         break;
            //         case id === `structure-tab`:
            //         tabImg.src = `${planetImage_Internal}`
            //         tabImg.alt = `Look at this planet!`
            //         break;
            //         case id === `geology-tab`:
            //         tabImg.src = `${planetImage_Geology}`
            //         tabImg.alt = `Look at this planet!`
            //         break;
            //         default:
            //         break;
            //     }
            //     return tabImg;
            // }
            

            tabs.forEach(button => button.addEventListener(`click`, handleTabSelect));
            
            getPlanets();
            
            
            
            // const planetIndex = getPlanets.findIndex(name => name === planet);
            
            // console.log(planetIndex);
            
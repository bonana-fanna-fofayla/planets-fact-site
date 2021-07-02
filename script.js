// Declare global variables
const main = document.querySelector(`main`);
const {planet} = main.dataset;  

// Declare Variables for tablist, tabs, and tabpanels
const tablist = main.querySelector(`.tabs`);
const tabs = tablist.querySelectorAll(`[role='tab']`);
const tabpanels = Array.from(tablist.querySelectorAll(`[role='tabpanel']`));

// Retrieve and parse json contents back into a Javascript array of objects.
// fetch('data.json')
//   .then(response => {
//       if (!response.ok) {
//           throw new Error(`Network response was not ok.`);
//       }
//       return response.json();
//     })
//   .then(data => {
//       const planetArray = data;
//     //   console.log(planetArray[0]);
//       returnPlanetIndex(planet, planetArray);
//      })
//   .catch((error) => {
//     console.error('Error:', error);
// })

const getPlanets = async() => {
    const response = await fetch('data.json');
    try {
        if (!response.ok) {    
            const message = `An error has occured: ${response.status}`;    
            throw new Error(message);  
        }
        const planetArray = await response.json();
        doSomething(planetArray);
        // getData(data);
    }catch(error) {
        console.error(error);
    }
};

function doSomething(planetArray) {
    return console.log(planetArray);
}




// const planetIndex = getPlanets.findIndex(name => name === planet);

// console.log(planetIndex);

// Listen for click on tab buttons and show appropriate tabpanel.
// h2 is now e.target of tab, add closest so it goes back to the button for the tabs.
function handleTabSelect (e) {
    // console.log(e);
    tabpanels.forEach(tabpanel => {
        tabpanel.hidden = true;
    });
    tabs.forEach(tab => {
        tab.setAttribute(`aria-selected`, false);
    });
    let tabTarget = e.target.closest(`[role='tab']`);
    tabTarget.setAttribute(`aria-selected`, true);
    const {id} = tabTarget;
    const tabPanel = tabpanels.find(
        tabpanel => tabpanel.getAttribute(`aria-labelledby`) === id
        );
        tabPanel.hidden = false;
}
    
tabs.forEach(button => button.addEventListener(`click`, handleTabSelect));
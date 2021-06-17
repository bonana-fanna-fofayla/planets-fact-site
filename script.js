// Declare global variables
const main = document.querySelector(`main`);
const {planet} = main.dataset; 

// Declare Variables for tablist, tabs, and tabpanels
const tablist = main.querySelector(`.tabs`);
const tabs = tablist.querySelectorAll(`[role='tab']`);
const tabpanels = Array.from(tablist.querySelectorAll(`[role='tabpanel']`));

console.log(planet);

// Retrieve and parse json contents back into a Javascript array of objects.
fetch('data.json')
  .then(response => {
      if (!response.ok) {
          throw new Error(`Network response was not ok.`);
      }
      return response.json();
    })
  .then(data => {
      const planetObj = data;
    //   console.log(planetObj);
     })
  .catch((error) => {
    console.error('Error:', error);
});


// Listen for click on tab buttons and show appropriate tabpanel.
function handleTabSelect (e) {
    // console.log(e);
    tabpanels.forEach(tabpanel => {
        tabpanel.hidden = true;
    });
    tabs.forEach(tab => {
        tab.setAttribute(`aria-selected`, false);
    });
    e.target.setAttribute(`aria-selected`, true);
    const {id} = e.target;
    const tabPanel = tabpanels.find(
        tabpanel => tabpanel.getAttribute(`aria-labelledby`) === id
        );
        tabPanel.hidden = false;
}
    
tabs.forEach(button => button.addEventListener(`click`, handleTabSelect));
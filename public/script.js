/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'

const food_info = [];

fetch(endpoint)
/* Watch March 4 Lecture in how to adjust this */
    .then(blob => blob.json())
    .then(data => food_info.push(...data))

function findMatches(wordToMatch, food_info) {
    return food_info.filter(result => {
        const regex = new RegExp(wordToMatch, 'gi');
        return  result.category.match(regex) || result.address_line_1.match(regex) || result.zip.match(regex);
});
}

const searchInput = document.querySelector('input');
const suggestions = document.querySelector('.suggestions')

function displayMatches() {
    const matchArray = findMatches(this.value, food_info);
    const html = matchArray.map(result => {        
        return `
            <li>
            <span class= "place">${result.name}<br/>
            ${result.category}<br/>
            ${result.address_line_1}<br/>
            ${result.zip}<br/></span>
            </li>
            `
        ;
    }).join('');
    suggestions.innerHTML = html;
}


searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
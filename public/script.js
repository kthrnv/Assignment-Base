/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* Commented out Wes Bos Tutorial Stuff for reference */

async function windowActions() {
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'
    const request = await fetch(endpoint);
    const food_info = await request.json();
    

    // const food_info = [];

    // fetch(endpoint)
    /* Watch March 4 Lecture in how to adjust this */
    //    .then(blob => blob.json())
    //    .then(data => food_info.push(...data))

    function findMatches(wordToMatch, food_info) {
        return food_info.filter(result => {
            const regex = new RegExp(wordToMatch, 'gi');
            return result.category.match(regex);
        });
    }

    const searchInput = document.querySelector('input');
    const suggestions = document.querySelector('.suggestions')

    function displayMatches(event) {
        const matchArray = findMatches(event.target.value, food_info);
        const html = matchArray.map(result => {        
            return `
                <li>
                <span class= "place">
                <div class="list-name">
                    ${result.name}
                </div>
                ${result.category}<br/>
                ${result.address_line_1}<br/>
                ${result.zip}<br/></span>
                </li>
                `
            ;
        }).join('');
        suggestions.innerHTML = html;
    }

    searchInput.addEventListener('keyup', (evt) => { displayMatches(evt) });
    // searchInput.addEventListener('change', displayMatches);
    // searchInput.addEventListener('keyup', displayMatches); 
}

window.onload = windowActions;
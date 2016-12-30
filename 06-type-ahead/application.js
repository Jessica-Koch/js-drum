const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    // spread so cities array isn't nested
    .then(data => cities.push(...data));


function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        // figure out if the city or state matches what was searched
        // g = global
        // i = case insensitive
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex)

    });
}

function displayMatches(){
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');

        const cityName = place.city.replace(regex. `<span></span>`)
        return ` 
            <li>
                <span class="name">${place.city}, ${place.state}</span>
                <span class="population">${place.population}</span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.search');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
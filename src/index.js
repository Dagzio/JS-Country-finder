import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry() {
    const name = searchInput.value.trim();
    if (name === '') {
        clearCountryLists();
        return;
    }
    fetchCountries(name).then(countries => {
        if(countries.length > 10) {
                Notify.info("Too many matches found. Please enter a more specific name.");
        };
            clearCountryLists();
            checkInput(countries);
        });
       
}

function checkInput(countries) {
   
    if (countries.length === 1) {
        countryList.insertAdjacentHTML("beforeend", renderCountriesMarkup(countries));

        const countryTitle = countryList.querySelector(".country-list__title");
        countryTitle.style.fontSize = '45px';
        countryTitle.style.fontWeight = '800';

        countryInfo.insertAdjacentHTML("beforeend", renderCountriesInfo(countries));

    } else if (countries.length >= 2 && countries.length <= 10) {
        countryList.insertAdjacentHTML("beforeend", renderCountriesMarkup(countries));
      
    }

};

function renderCountriesMarkup(countries) {

    return countries.map(({ flags, name }) => {
        return `<li class="country-list__item">
        <img class="country-list__icon" src="${flags.svg}" width=35px height=35px/>
        <p class="country-list__title">${name.official}</p>
        </li>`
    }).join('');

};


function renderCountriesInfo(countries) {
    return countries.map(({ capital, population, languages }) =>
        `<ul class="country-info__list">
        <li class="country-info__item"><span class="country-info__description">Capital:</span> ${capital}</li>
        <li class="country-info__item"><span class="country-info__description">Population:</span> ${population}</li>
        <li class="country-info__item"><span class="country-info__description">Languages:</span> ${Object.values(languages)}</li>
        </ul>`
    ).join('');

};


function clearCountryLists() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
};
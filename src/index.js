import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(onSearchCountry, 1500));

function onSearchCountry() {
    const name = searchInput.value.trim();
    fetchCountries(name);
       
}



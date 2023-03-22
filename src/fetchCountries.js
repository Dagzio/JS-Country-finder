import { Notify } from 'notiflix';

export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=capital,population,flags,languages,name`)
        .then(response => {
            if (!response.ok) {
                Notify.failure("Oops, there is no country with that name")
            }
            return response.json()
        }).then(countries => {
            if (countries.length > 10) {
                Notify.info("Too many matches found. Please enter a more specific name.");
            }
        });
};


// fullText=true&
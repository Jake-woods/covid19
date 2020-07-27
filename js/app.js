const allCountriesURL = 'https://api.covid19api.com/countries';
const casesDataURL = 'https://api.covid19api.com/summary';
const casesEle = document.querySelector('.cases');

function createOption(country, slug) {
    const option = document.createElement('option');
    const par = document.querySelector('#country-dropdown');
    option.textContent = country;
    option.setAttribute('value', slug)

    par.appendChild(option);
}

function compareStr(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();

    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }
}


fetch(casesDataURL)
    .then(resp => resp.json())
    .then(data => {
        const countries = data.Countries;
        const dropdown = document.querySelector('#country-dropdown');
        const todayCasesEle = document.querySelector('.today-cases > span');
        const todayDeathsEle = document.querySelector('.today-deaths > span');
        const todayRecoveredEle = document.querySelector('.today-recovered > span');

        // Creating dropdown elements
        const sortedData = [...countries].sort((a, b) => {
            return compareStr(a.Country, b.Country);
        })

        sortedData.forEach(item => {
            createOption(item.Country, item.Slug);
        })

        // Filtering and returning relevant data
        dropdown.addEventListener('input', (e) => {
            const match = countries.filter(item => {
                if (item.Slug === e.target.value) {
                    return item;
                }
            });

            const data = match[0];
            casesEle.textContent = data.TotalConfirmed.toLocaleString();
            todayCasesEle.textContent = data.NewConfirmed;
            todayDeathsEle.textContent = data.NewDeaths;
            todayRecoveredEle.textContent = data.NewRecovered;

            console.log(data)
        });
    });
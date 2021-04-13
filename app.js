
let covidData = []
const today = new Date().toJSON().split('T')[0]
getCovidData(`https://api-covid19.rnbo.gov.ua/data?to=${today}`)




async function getCovidData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        covidData = data
    } catch (error) {
        console.warn('Fetch error!', error);
    }
}




function addCountryData(elem, covidData) {
    let covidDataHtml = '' //переменная равна строке
    covidData.forEach(country => {
      covidDataHtml += renderCountry(country)
    });
    elem.innerHTML = covidDataHtml//приравниваем
}
addCountryData()



function renderCountry(data) {
    const html =
        `<table class="dashboard-content" id="dashboardContent">
        <thead>
          <th>}</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </thead>
        <tbody>
          <tr>
            <td>${data.country}</td>
            <td class="confirmed">
              <div>${data.confirmed}</div>
              <div>${data.delta_confirmed}</div>
            </td>
            <td class="deaths">
              <div>${data.deaths}</div>
              <div>${data.delta_deaths}</div>
            </td>
            <td class="recovered">
              <div>${data.recovered}</div>
              <div>${data.delta_recovered}</div>
            </td>
            <td class="existing">
              <div>${data.existing}</div>
              <div>${data.delta_existing}</div>
            </td>
          </tr>`
    return html
}
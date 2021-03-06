let DATA = []
let covidData = []
let dataType = 'world'
let lang = 'en'
const today = new Date().toJSON().split('T')[0]

const dashboardLangs = document.getElementById('dashboardLangs')
const dashboardTabs = document.getElementById('dashboardTabs')
const dashboardTable = document.getElementById('dashboardContent')
const dashboardSummary = document.getElementById('dashboardSummary')
const dashboardTableBody = dashboardTable.querySelector('tbody')
const dashboardSearch = document.getElementById('dashboardSearch')
const firstTh = document.getElementById('firstTh')


const numberFormatter = new Intl.NumberFormat()

getCovidData(`https://api-covid19.rnbo.gov.ua/data?to=${today}`)

dashboardLangs.addEventListener('click', event => {
  const btnEl = event.target.closest('button')
  if (!btnEl) {
    return
  }
  const l = btnEl.dataset.lang
  lang = l
  renderTableData(dashboardTableBody, covidData)
})

  // ("button").addClass("white")
  // function myFunction() {
//   let element = document.getElementById("dashboardLangs");
//   element.classList.toggle("white");
// }

dashboardTabs.addEventListener('click', event => {
  const btnEl = event.target.closest('button')
  if (!btnEl) {
    return
  }
  const type = btnEl.dataset.type
  dataType = type
  if (dataType === 'world') {
    firstTh.textContent = 'Country'
  } else if (dataType === 'ukraine'){
    firstTh.textContent = 'Region'
  }
  
  getCovidData(`https://api-covid19.rnbo.gov.ua/data?to=${today}`)
})

dashboardSearch.addEventListener('input', event => {
  const query = event.target.value.trim().toLowerCase()
  covidData = DATA.filter(dataObj => {
    return dataObj.label[lang].toLowerCase().includes(query)
  })
  renderTableData(dashboardTableBody, covidData)
})

async function getCovidData(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    DATA = data[dataType]
    covidData = data[dataType]
    dashboardSummary.innerHTML = createSummary(covidData)
    renderTableData(dashboardTableBody, covidData)
  } catch (error) {
    console.warn('Fetch error!', error);
  }
}
// {
//   "id": 105,
//   "label": {
//   "en": "Vinnytsia",
//   "uk": "?????????????????? ??????????????"
//   },
//   "country": 4907,
//   "confirmed": 60453,
//   "deaths": 1176,
//   "recovered": 38148,
//   "existing": 21129,
//   "suspicion": 59638,
//   "lat": 48.920517,
//   "lng": 28.685484,
//   "delta_confirmed": 446,
//   "delta_deaths": 17,
//   "delta_recovered": 755,
//   "delta_existing": -326,
//   "delta_suspicion": 0


dashboardTable.addEventListener('click', event => {
  const thEl = event.target.closest('th')
  if (!thEl) {
    return
  }
  const thEls = dashboardTable.querySelectorAll('th')
  thEls.forEach(th => th.dataset.sorting = 'false')
  thEl.dataset.sorting = 'true'
  const {key, order} = thEl.dataset
  if (typeof covidData[0][key] === 'object') {
    covidData.sort((a,b) => a[key][lang].localeCompare(b[key][lang]) * order)
  } else{
    covidData.sort((a,b) => (a[key] - b[key]) * order)
  }
  
  thEl.dataset.order *= -1
  renderTableData(dashboardTableBody, covidData)
})

function renderTableData(elem, data) {
  elem.innerHTML = ''
  let covidDataHtml = '' //???????????????????? ?????????? ????????????
  data.forEach(country => {
    covidDataHtml += createTableRow(country)
  });
  elem.innerHTML = covidDataHtml//????????????????????????
}

function createSummary(dataArray) {
  const summaryCounts = {
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    existing: 0,
    delta_confirmed: 0,
    delta_deaths: 0,
    delta_recovered: 0,
    delta_existing: 0,
  }
  const summaryCountsKeys = Object.keys(summaryCounts)

  dataArray.forEach(dataObj => {
    summaryCountsKeys.forEach(key => {
      summaryCounts[key] += dataObj[key]
    })
  })
  return `
  <div class="confirmed">
    <h3 class="text-color">Confirmed:</h3>
    <div>
      ${numberFormatter.format(summaryCounts.confirmed)}
    </div>
    <div>
      ${summaryCounts.delta_confirmed !== 0 ? `<span>${summaryCounts.delta_confirmed < 0 ? "&#9660;" : "&#9650;"}</span>` : ''}
      ${summaryCounts.delta_confirmed === 0 ? "-" : numberFormatter.format(summaryCounts.delta_confirmed)}
    </div>
  </div>
  <div class="deaths">
    <h3 class="text-color">Deaths:</h3>
    <div>
      ${numberFormatter.format(summaryCounts.deaths)}
    </div>
    <div>
      ${summaryCounts.delta_deaths !== 0 ? `<span>${summaryCounts.delta_deaths < 0 ? "&#9660;" : "&#9650;"}</span>` : ''}
      ${summaryCounts.delta_deaths === 0 ? "-" : numberFormatter.format(summaryCounts.delta_deaths)}
    </div>
  </div>
  <div class="recovered">
    <h3 class="text-color">Recovered:</h3>
    <div>
      ${numberFormatter.format(summaryCounts.recovered)}
    </div>
    <div>
      ${summaryCounts.delta_recovered !== 0 ? `<span>${summaryCounts.delta_recovered < 0 ? "&#9660;" : "&#9650;"}</span>` : ''}
      ${summaryCounts.delta_recovered === 0 ? "-" : numberFormatter.format(summaryCounts.delta_recovered)}
    </div>
  </div>
  <div class="existing">
    <h3 class="text-color">Existing:</h3>
    <div>
      ${numberFormatter.format(summaryCounts.existing)}
    </div>
    <div>
      ${summaryCounts.delta_existing !== 0 ? `<span>${summaryCounts.delta_existing < 0 ? "&#9660;" : "&#9650;"}</span>` : ''}
      ${summaryCounts.delta_existing === 0 ? "-" : numberFormatter.format(summaryCounts.delta_existing)}
    </div>
  </div>
  `
}
function createTableRow(data) {
  const html =
    `<tr>
        <td>${data.label[lang]}</td>
        <td class="confirmed">
          <div>${numberFormatter.format(data.confirmed)}</div>
          <div>
              ${data.delta_confirmed !== 0 ? `<span>${data.delta_confirmed < 0 ? "&#9660;" : "&#9650;"}</span>` : ''}
            ${data.delta_confirmed === 0 ? "-" : numberFormatter.format(data.delta_confirmed)}
          </div>
        </td>
        <td class="deaths">
          <div>${numberFormatter.format(data.deaths)}</div>
          <div>
              ${data.delta_deaths !== 0 ? `<span>${data.delta_deaths < 0 ? "&#9660;" : "&#9650;"}</span>` : ''}
            ${data.delta_deaths === 0 ? "-" : numberFormatter.format(data.delta_deaths)}
          </div>
        </td>
        <td class="recovered">
          <div>${numberFormatter.format(data.recovered)}</div>
          <div>
              ${data.delta_recovered !== 0 ? `<span>${data.delta_recovered < 0 ? "&#9660;" : "&#9650;"}</span>` : ''}
            ${data.delta_recovered === 0 ? "-" : numberFormatter.format(data.delta_recovered)}
          </div>
        </td>
        <td class="existing">
          <div>${numberFormatter.format(data.existing)}</div>
          <div>
              ${data.delta_existing !== 0 ? `<span>${data.delta_existing < 0 ? "&#9660;" : "&#9650;"}</span>` : ''}
            ${data.delta_existing === 0 ? "-" : numberFormatter.format(data.delta_existing)}
          </div>
        </td>
      </tr>
          `
  return html
}

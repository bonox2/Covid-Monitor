
let covidData = {}
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

function addMessages(elem, messages) {
    let messagesHtml = '' //переменная равна строке
    messages.forEach(message => {//функцыя для каждого елемента
        messagesHtml += renderMessage(message)//messagesHtml добавляем renderMessage
    });
    elem.innerHTML = messagesHtml//приравниваем
}
/*{
"id": 32893,
"label": {
"en": "Kazakhstan",
"uk": "Казахстан"
},
"country": "Kazakhstan",
"confirmed": 307676,
"deaths": 3249,
"recovered": 275505,
"existing": 28922,
"suspicion": 0,
"lat": 48.0196,
"lng": 66.9237,
"delta_confirmed": 1816,
"delta_deaths": 7,
"delta_recovered": 1293,
"delta_existing": 516,
"delta_suspicion": 0
},*/
function renderMessage(data) {//каркас секции
    const html =
        `<table class="dashboard-content" id="dashboardContent">
        <thead>
          <th>${data.country}</th>
          <th>${data.confirmed}</th>
          <th>${data.Deaths}</th>
          <th>${data.Recovered}</th>
          <th>${data.Existing}</th>
        </thead>
        <tbody>
          <tr>
            <td>usa</td>
            <td class="confirmed">
              <div>confirmed</div>
              <div>confirmed delta</div>
            </td>
            <td class="deaths">
              <div>death</div>
              <div>death delta</div>
            </td>
            <td class="recovered">
              <div>recover</div>
              <div>recover delta</div>
            </td>
            <td class="existing">
              <div>exist</div>
              <div>exist delta</div>
            </td>
          </tr>
        </tbody>
      </table>
    return html//возвращаем результат
}
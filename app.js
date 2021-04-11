
let covidData = {}
const today = new Date().toJSON().split('T')[0]
getCovidData(`https://api-covid19.rnbo.gov.ua/data?to=${today}`)

async function getUsers(url) {
    const response = await fetch(url)
    console.log(response);
    const data = await response.json()
    console.log(data)
}





async function getCovidData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        covidData = data
    } catch (error) {
        console.warn('Fetch error!', error);
    }
}

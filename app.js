
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
    allCountEl.textContent = messages.length//не прочитаные и посчитаные сообщения равны длинне масива
    const unreadMessages = messages.filter(message => !message.seen)
    unreadCountEl.textContent = unreadMessages.length//не прочитаные и посчитаные сообщения равны длинне длинне нового чегото

    elem.innerHTML = ''
    
     messages.sort((a,b) => {
         return a.seen - b.seen || b.date - a.date//??
     })

    let messagesHtml = '' //переменная равна строке
    messages.forEach(message => {//функцыя для каждого елемента
        messagesHtml += renderMessage(message)//messagesHtml добавляем renderMessage
    });
    elem.innerHTML = messagesHtml//приравниваем
}

function renderMessage(data) {//каркас секции
    const html =
        `<div class="letter-section ${data.seen ? 'seen' : 'not_seen'}" data-id="${data.id}">
            <div class="sender-info">
                <div class="senders-photo"><img width="50" height="50" loading="lazy" src="${data.avatar}" alt="${data.name}"></div>
                <div>
                    <div class="sender-name">${data.name}</div>
                    <div class="sender-number">${data.phone}</div>
                </div>
            </div>
            <div class="message-info"> ${data.text}</div>
            <div class="date-time">
                <div class="time">${timeFormat.format(data.date)}</div>
                <div class="time">${dateFormat.format(data.date)}</div>
            </div>
        </div>
    </div>`
    return html//возвращаем результат
}
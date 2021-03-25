const axios = require('axios')

let qualities = 'Outstanding'
let place = 'Martlock'
let itemId = 'T4_SHOES_CLOTH_ROYAL@3'

let apiCode = `https://www.albion-online-data.com/api/v2/stats/Prices/${itemId}?locations=${place}&qualities=${qualities}`

axios.get(apiCode)
.then(res => {
    console.log(res)
})

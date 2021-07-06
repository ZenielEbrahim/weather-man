
const form= document.querySelector('form')
const input = document.querySelector('input')

let locationOrErrorMessage= document.querySelector('.locationError')
let forecastMessage = document.querySelector('#forecast')

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    getWeather(input.value)
})

function getWeather(address){
    locationOrErrorMessage.textContent="Loading..."
    forecastMessage.textContent=''

    fetch(`/weather?address=${address}`).then(response=>{
        response.json().then(data=>{
            if(data.error){
                locationOrErrorMessage.textContent=data.error
                return console.log(data.error)
            }
            locationOrErrorMessage.textContent=data.location
            forecastMessage.textContent=data.weatherForecast
            console.log(data)
        })
    })

}


console.dir(forecastMessage)

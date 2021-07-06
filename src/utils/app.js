
const request = require('request')
const API_KEY= '7f281f3eaacc6e8156d089c44b7d7481'

const geocode= require('./geoCode')
const forecast= require('./forecast')




geocode('boston', (error, {location, latitude, longitude})=>{

    if(error){
        return console.log(error)
    }

forecast(latitude,longitude, (error, data)=>{

    if(error){
      return console.log(error)
    }
console.log(location)
console.log(data) 

})






})

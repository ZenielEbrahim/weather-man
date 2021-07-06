
const request = require('request')

function forecast(lat, long, callback){
    const url =`http://api.weatherstack.com/current?access_key=7f281f3eaacc6e8156d089c44b7d7481&query=${lat},${long}`
   // const url =`http://api.weatherstack.com/current?access_key=7f281f3eaacc6e8156d089c44b7d7481&query=${30},${22}$m=f`
    request({url, json:true}, (error, response)=>{
     if(error){
        callback('Unable to connect to weather service!')
    } else if(response.body.error) {
         callback('Unable to find location!')
    } else{
    const data= response.body.current
    const message= `${data.weather_descriptions[0]}. It's currently ${data.temperature} degrees out. However, It feels like ${data.feelslike} degrees out.`
    callback(undefined, message)
}
})
}


module.exports = forecast


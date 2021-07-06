const request = require('request')



const geocode = (address, callback)=>{

    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiemVuaWVsIiwiYSI6ImNrOGZ2bXJkYTA2eWwzZG1ra3BuMngzZzEifQ.Tfdp1W8ZlIq0LTgdghg5jA&limit=1`

    request({url, json:true},(error, response)=>{
         
    if(error){
        callback('unable to connect to service!')
    }else if(response.body.features.length===0){
       callback('Search term invalid. Please try again.')
    }else{
    const data= response.body.features[0].center
    callback(undefined,{ 
        latitude:data[1],
        longitude:data[0],
        location:response.body.features[0].place_name
                })   
    }

    })
}


module.exports = geocode
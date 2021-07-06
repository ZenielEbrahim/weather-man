 const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const PORT = process.env.PORT || 3000
const geocode= require('./utils/geoCode')
const forecast= require('./utils/forecast')








//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname, '../templates/_partials')

// //set up handlebars engine and  views location
app.set('views', viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)


// //set up static directory to server
 app.use(express.static(publicDirectoryPath))










app.get('', (req,res)=>{
    res.render('index',{title:'Weather Man',name:'Zeniel Ebrahim'})
})

app.get('/about', (req, res)=>{
    res.render('about',{title:'About',name:'Zeniel Ebrahim'})
})



app.get('/help', (req, res)=>{
    res.render('help',{title:'Help',message:'How can we help you?',name:'Zeniel Ebrahim'})
})
app.get('/help/*', (req, res)=>{
    res.render('404',{errorMessage:'Help article not found',name:"Zeniel Ebrahim",title:'404'})
})

app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send('error: please provide an address!')
    }
    
    geocode(req.query.address, (error, data={})=>{
        if(error){
            return res.send({error})
        }

        const {latitude, longitude, location} = data
        console.log( longitude, latitude)

       forecast(latitude, longitude, (error, weatherForecast)=>{
        if(error){
            return res.send({error})
        }

        res.send({location,weatherForecast})
       }) 
    })

   // res.send({weather:"warm", forecast:'32c', location:req.query.address})
})


app.get('*', (req, res)=>{
    res.render('404',{errorMessage:'page not found',name:"Zeniel Ebrahim",title:'404'})
})

app.listen(PORT, ()=>{
    console.log('server is up on port '+ PORT)
})
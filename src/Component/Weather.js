import React from 'react'
import {useState} from 'react'
import './WeatherStyling.css'

const Weather = () => {
    const [locations, setLocations]= useState('london')
    // Weather Parameter
    const [weather, setWeather]= useState('')
    const [area, setArea]=useState('')
    const [lat, setLat]= useState('')
    const [lon, setLon]= useState('')
    // photo
    const [photo, setPhoto]= useState([]);

    function ifClicked(){
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=3e0ea2c582f1fe24ec6db49546ed81d9`
        )
        .then((res)=>{
          if(res.ok){
            console.log(res.status)
            return res.json()
          } else{
            if(res.status === 404){
              return alert('there seem to be an error, wrong location')
            }
            alert('there is an error')
            throw new Error('you have an error')
          }
        })
        .then((object)=>{ 
         
              console.log(object);
              setWeather(object.main.temp)
              setLat(object.coord.lat)
              setLon(object.coord.lon)
              setArea(object.name)
         })
         
         
            
              
          
          fetch(
            `https://api.unsplash.com/search/photos?query=${locations}&client_id=YQ0fZUb4s9iyObuDS_8Sm6V3by_-LgaXmRykyRgCbGs`
          )
          .then((res)=>{
            if(res.ok){
              return res.json();
            } else{
              //return alert('you made a mistake')
              throw new Error('you made a mistake')
            }
          })
          .then((data)=>{
            console.log(data);
            setPhoto(data?.results[0]?.urls?.raw)
  
          })
          .catch((error)=>
          console.log(error))
      }
  return (
    <div className='app'>
        <p className='first-p'>Weather App</p> 
     <div className='card'>
       {/* input text field */}
      <input type="text"  value={locations} onChange={(e)=>setLocations (e.target.value)} placeholder='enter location' className='input-box'  />

{/* button */}
        <button  className='button' onClick={ifClicked}  >Search Location</button>

        {/* weather parameter */}
        <div className='weather-parameter'>

        
        <p><h3> Temparature: {weather}</h3></p>
        <p><h3> Longitude: {lon}</h3></p>
        <p><h3> Latitude: {lat}</h3></p>
        <p><h3> Location: {area}</h3></p>
     
        </div>

{/* image */}
        <img src={photo} alt="" className='img' />
      </div>

    </div>
  )
}

export default Weather
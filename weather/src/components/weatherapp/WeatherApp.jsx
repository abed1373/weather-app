
import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from "../assets/search.png"

import wind_icon from "../assets/wind.png"
import humidity_icon from "../assets/humidity.png"
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchWeatherAction } from '../../redux/slices/weatherSlices'


const WeatherApp = () => {

  const [city,setCity]=useState("new york")

    const dispatch=useDispatch()
    const state=useSelector((state)=>state)
     const {loading,error,weather}=state
    
    useEffect(()=>{
  dispatch(fetchWeatherAction(city))
    },[city, dispatch])

    
   
  return (
    <div className='container'>
      <div className="top-bar">
        <input 
        
        value={city} 
        onChange={e=>setCity(e.target.value)}
         type="text" className="cityInput" placeholder='search' spellcheck="false"
        
         />
        <button 
        onClick={()=>dispatch(fetchWeatherAction(city))}
         className="search-icon">
            <img src={search_icon} alt="" />
        </button>
      </div>
      {loading ? 
      <>
     
        <h1 style={{color:'white'}}>Loading please wait...</h1>
        <i style={{fontSize:'70px',color:'white'}} className="fa-solid fa-spinner fa-spin"></i>
        </>
      : error ? 
        <h1 className='error'>{error?.message}</h1>
      :
<>

      <div id='icon' className="weather-image">
        <img id='wicon'   src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="Weather icon" />
      </div>
      <div className="weather-temp">{Math.ceil(Number(weather?.main.temp))}{" "}C°</div>
      <div className="weather-location">{weather?.name}</div>
      <div className="data-container">
        <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
                <div className="humidity-percent">{weather?.main.humidity}%</div>
                <div className="text">Humidity</div>
            </div>
        </div>
        <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
                <div className="wind-rate">{weather?.wind.speed}km/h</div>
                <div className="text">Wind Speed</div>
            </div>
        </div>

      </div>
      </>
    }
    </div>
  )
}

export default WeatherApp

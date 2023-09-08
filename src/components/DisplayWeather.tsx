import React, { useEffect, useState } from 'react';
import { MainWrapper } from './styles.module';
import { AiOutlineSearch } from 'react-icons/ai';
import { WiHumidity } from 'react-icons/wi';
import { SiWindicss } from 'react-icons/si';
import { BsFillSunFill, BsCloudyFill, BsFillCloudRainFill, BsFillCloudFog2Fill } from 'react-icons/bs';
import { RiLoaderFill } from 'react-icons/ri';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import axios from 'axios';

interface WeatherDataProps{
	name: string;
	main: {
		temp: string
	}
}

const DisplayWeather = () => {

	const API_KEY = '296ca70b705896abe7fd056d2eae003f';
	const API_CALL = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}';
	const API_Endpoint = 'https://api.openweathermap.org/data/2.5/';

	const [weatherData, setWeatherData] = React.useState();

	const fetchCurrentWeather = async (lat:number, lon:number) => {
		const url = `${API_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

		const response = await axios.get(url);
		return response.data;
	}

	useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const currentWeather = await fetchCurrentWeather(latitude, longitude);
        setWeatherData(currentWeather);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    });
  }, []);

	return (
    <MainWrapper>
			<div className="container">
				<div className="searchArea">
					<input type="text" placeholder="enter a city"/>
				
					<div className="searchCircle">
						<AiOutlineSearch className='searchIcon'/>
					</div>
				</div>
				<div className="weatherArea">
					<h1> Moscow </h1>
					<span> Russia </span>
					<div className='icon '>icon</div>
					<h2>18C</h2>
					<h2>Cloudy</h2>
				</div>
				<div className="bottomInfoArea">
					<div className="humidity">
						<WiHumidity className='windIcon'/>
						<div className='humiInfo'>
							<h2>60%</h2>
							<p>Humidity</p>
						</div>
					</div>
					<div className="wind">
						<SiWindicss className="windIcon"/>
						<div className='windInfo'>
							<h2>2.35km
								h
							</h2>
							<p>Wind speed</p>
						</div>
					</div>
				</div>
			</div>
		</MainWrapper>
	)
}

export default DisplayWeather;

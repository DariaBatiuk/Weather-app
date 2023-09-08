import React, { useEffect, useState } from 'react';
import { MainWrapper } from './styles.module';
import { AiOutlineSearch } from 'react-icons/ai';
import { WiHumidity } from 'react-icons/wi';
import { SiWindicss } from 'react-icons/si';
import axios from 'axios';

interface WeatherDataProps {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: {
    main: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

const DisplayWeather = () => {
  const API_KEY = '296ca70b705896abe7fd056d2eae003f';
  const API_Endpoint = 'https://api.openweathermap.org/data/2.5/';
  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
  const [searchCity, setSearchCity] = useState('');

  const fetchCurrentWeather = async (lat: number, lon: number) => {
    const url = `${API_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  };

  const fetchWeatherData = async (city: string) => {
    try {
      const urlCity = `${API_Endpoint}weather?q=${city}&appid=${API_KEY}&units=metric`;
      const searchResponse = await axios.get(urlCity);
      const currentSearchResults: WeatherDataProps = searchResponse.data;
      return { currentSearchResults };
    } catch (error) {
      console.error('No Data Found');
      return null; 
    }
  };

	const handleSearch = async () => {
		console.log('handleSearch called')
		if (searchCity.trim() === '') {
			return;
		}
		try {
			const searchResults = await fetchWeatherData(searchCity);
			if (searchResults && searchResults.currentSearchResults) {
				setWeatherData(searchResults.currentSearchResults);
				setSearchCity('');
			} else {
				setWeatherData(null); // if nothing found
				alert('Failed search');
				setSearchCity('');
			}
		} catch (error) {
			console.log('City not found');
			setSearchCity('');
			throw error;
		}
	};
	const iconChange = (iconCode: string) => {
		const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
		
		return (
			<img src={iconUrl} alt="Weather Icon" className="icon" />
		);
	};

  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const currentWeather = await fetchCurrentWeather(latitude, longitude);
        setWeatherData(currentWeather);
        console.log(currentWeather);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    });
  }, []);

  return (
    <MainWrapper>
      <div className="container">
        <div className="searchArea">
          <input
            type="text"
            placeholder="enter a city"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								handleSearch(); 
							}
						}}
          />

          <div className="searchCircle">
            <AiOutlineSearch className="searchIcon" onClick={handleSearch} />
          </div>
        </div>

        {weatherData && ( //check if there is anything 
          <>
            <div className="weatherArea">
              <h1> {weatherData.name} </h1>
              <span> {weatherData.sys.country} </span>
              <div className="icon ">{iconChange(weatherData.weather[0].icon)}</div>
              <h2>{Math.round(weatherData.main.temp)}°C</h2>
              <h2>{weatherData.weather[0].main}</h2>
            </div>
            <div className="bottomInfoArea">
              <div className="humidity">
                <WiHumidity className="windIcon" />
                <div className="humiInfo">
                  <h2>{weatherData.main.humidity} %</h2>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="wind">
                <SiWindicss className="windIcon" />
                <div className="windInfo">
                  <h2>{weatherData.wind.speed} km/h</h2>
                  <p>Wind speed</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </MainWrapper>
  );
};

export default DisplayWeather;

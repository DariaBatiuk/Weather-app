import React from 'react';
import { MainWrapper } from './styles.module';
import { AiOutlineSearch } from 'react-icons/ai';
import { WiHumidity } from 'react-icons/wi';

const DisplayWeather = () => {
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
					</div>
				</div>
			</div>
		</MainWrapper>
	)
}

export default DisplayWeather;

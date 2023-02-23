import { useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import axios from 'axios';

import Now from './Now';
import Forecast from './Forecast';
export default function Form() {
    const [ready, setReady] = useState(false);
    const [weatherData, setWeatherData] = useState({});
    const [forecastresponse, setforecastresponse] = useState('');
    const [timeData, setTimeData] = useState('');

    function handleResponse(aResponse) {
        setWeatherData({
            temperature: Math.round(aResponse.data.main.temp),
            wind: Math.round(aResponse.data.wind.speed),
            city: aResponse.data.name,
            weatherDescription: aResponse.data.weather[0].description,
            humidity: Math.round(aResponse.data.main.humidity),
            imageNow: aResponse.data.weather[0].icon,
        });
        setReady(true);
    }
    function handleRespo(param) {
        setTimeData(param);
    }
    function doAjaxNow(parameterCityName = 'zanjan') {
        axios
            .get(
                'https://api.openweathermap.org/data/2.5/weather?q=' +
                    parameterCityName +
                    '&appid=9d5e9ae00531cc47a1afce47e2f9473b&units=metric'
            )
            .then(function (response) {
                // handle success
                axios
                    .get(
                        'https://api.ipgeolocation.io/timezone?apiKey=37b300937c0e4b4dbaaf00bf0f852cb9&lat=' +
                            response.data.coord.lat +
                            '&long=' +
                            response.data.coord.lon
                    )
                    .then(function (respo) {
                        handleRespo(respo.data.date_time_txt);
                    })
                    .catch(function (ero) {
                        console.log(ero);
                    });
                //handleResponse(response);
                handleResponse(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });

        axios
            .get(
                `https://api.shecodes.io/weather/v1/forecast?query=${parameterCityName}&key=56cb6ef4c4t2co40cabe790e0e85623b`
            )
            .then(function (forecastresponse) {
                // handle success
                console.log(
                    'This is forecast response',
                    forecastresponse.data.daily
                );
                setforecastresponse(forecastresponse.data.daily);
            })
            .catch(function (err) {
                // handle error
                console.log(err);
            });
    }
    function submitForm(event) {
        event.preventDefault();
        let cityName = document.getElementById('searchContent').value;
        doAjaxNow(cityName);
    }
    if (ready) {
        return (
            <div className="Form">
                <form id="formSearch" onSubmit={submitForm}>
                    <div className="row mb-3">
                        <div className="col-7">
                            <div className="input-group">
                                <input
                                    type="search"
                                    className="form-control rounded"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="search-addon"
                                    id="searchContent"
                                />
                            </div>
                        </div>
                        <div className="col-2">
                            <input
                                type="submit"
                                className="btn btn-primary"
                                value="Search"
                                id="submitSearch"
                            />
                        </div>
                    </div>
                </form>
                <Now weatherDataForNow={weatherData} timeData={timeData} />
                <Forecast forecastresponse={forecastresponse} />
            </div>
        );
    } else {
        doAjaxNow();
        return (
            <div>
                <BeatLoader />
            </div>
        );
    }
}

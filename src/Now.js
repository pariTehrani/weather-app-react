import { useState } from 'react';
export default function Now(props) {
    console.log(props.weatherDataForNow);
    let currentDate = new Date();
    let day_time = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
    });

    //console.log(props.weatherDataForNow.imageNow);
    let imgAdr =
        'http://openweathermap.org/img/wn/' +
        props.weatherDataForNow.imageNow +
        '@2x.png';

    let [celsiusTemp, setCelsiusTemp] = useState(
        props.weatherDataForNow.temperature
    );
    let [fahrenheitTemp, setFahrenheitTemp] = useState(null);
    let [defaultCelsius, setDefaultCelsius] = useState(
        'celsiusTemp removeUnderline disabledTemp'
    );
    let [defaultFahrenheit, setDefaultFahrenheit] = useState(
        'fahrenheitTemp removeUnderline'
    );

    function handleCelsiusToFahrenheit(event) {
        event.preventDefault();
        setCelsiusTemp(null);
        setFahrenheitTemp(() => {
            return Math.round(props.weatherDataForNow.temperature * 1.8 + 32);
        });
        setDefaultCelsius('celsiusTemp removeUnderline');
        setDefaultFahrenheit('fahrenheitTemp removeUnderline disabledTemp');
        console.log('Celsius to Fahrenheit');
    }

    function handleFahrenheitToCelsius(event) {
        event.preventDefault();
        setCelsiusTemp(props.weatherDataForNow.temperature);
        setFahrenheitTemp(null);
        setDefaultCelsius('celsiusTemp removeUnderline  disabledTemp');
        setDefaultFahrenheit('fahrenheitTemp removeUnderline');
        console.log('Fahrenheit to Celsius');
    }

    return (
        <div className="NOW">
            <div className="row">
                <div className="col-8">
                    <div className="row col-12">
                        <span className="col-6 m-0 pe-0">
                            <span className="imagenow">
                                <img
                                    src={imgAdr}
                                    alt=""
                                    className="imagenow"
                                    id="imgeForNow"
                                />
                            </span>
                            <span className="temperature">
                                {celsiusTemp}
                                <span className="fahrenheitTemperature">
                                    {fahrenheitTemp}
                                </span>
                            </span>

                            <span className="units">
                                <a
                                    href="#0"
                                    className={defaultCelsius}
                                    onClick={handleFahrenheitToCelsius}
                                >
                                    °C
                                </a>{' '}
                                |{' '}
                                <a
                                    href="#0"
                                    className={defaultFahrenheit}
                                    onClick={handleCelsiusToFahrenheit}
                                >
                                    ℉
                                </a>
                            </span>
                        </span>
                        <span className="col-6 ps-0 pt-3">
                            <ul className="weatherDetails">
                                <li>
                                    Humidity:{' '}
                                    <span className="humidity">
                                        {props.weatherDataForNow.humidity}
                                    </span>
                                    %
                                </li>
                                <li>
                                    wind:{' '}
                                    <span className="wind">
                                        {props.weatherDataForNow.wind}
                                    </span>{' '}
                                    km/h
                                </li>
                            </ul>
                        </span>
                    </div>
                </div>
                <div className="col-4">
                    <p className="cityName">{props.weatherDataForNow.city}</p>
                    <ul className="dayDescription">
                        <li id="date">{day_time}</li>
                        <li id="weatherDescription">
                            {props.weatherDataForNow.weatherDescription}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

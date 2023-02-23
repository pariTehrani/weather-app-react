import axios from 'axios';
import { useState } from 'react';
import Now from './Now';
import Forecast from './Forecast';
export default function Form() {
    let [city, setcity] = useState('');
    let [response, setresponse] = useState('');
    let [forecastresponse, setforecastresponse] = useState('');
    function showchange(event) {
        setcity(event.target.value);
    }
    function doajax(event) {
        event.preventDefault();
        axios
            .get(
                'https://api.openweathermap.org/data/2.5/weather?q=' +
                    city +
                    '&appid=9d5e9ae00531cc47a1afce47e2f9473b&units=metric'
            )
            .then(function (response) {
                // handle success
                setresponse(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });

        axios
            .get(
                `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=56cb6ef4c4t2co40cabe790e0e85623b`
            )
            .then(function (forecastresponse) {
                // handle success
                setforecastresponse(forecastresponse);
            })
            .catch(function (err) {
                // handle error
                console.log(err);
            });
    }
    return (
        <div className="Form">
            <form id="formSearch">
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
                                onChange={showchange}
                            />
                        </div>
                    </div>
                    <div className="col-2">
                        <input
                            type="submit"
                            className="btn btn-primary"
                            value="Search"
                            id="submitSearch"
                            onClick={doajax}
                        />
                    </div>
                </div>
            </form>
            <Now response={response} />
            <Forecast forecastresponse={forecastresponse} />
        </div>
    );
}

// function showcontent(){
//     let searchContent = document.querySelector('#searchContent');
// console.log(searchContent.value.length);
// }
//api https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

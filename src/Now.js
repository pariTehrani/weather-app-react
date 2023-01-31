export default function Now(props){ 
  if(typeof(props.response) === 'object') {
      
    let temperature = document.querySelector('.temperature');
    let celsiusTemp = document.querySelector('.celsiusTemp');
    let fahrenheitTemp = document.querySelector('.fahrenheitTemp');
    let date = document.querySelector('#date');
    let humidity = document.querySelector('.humidity');
    let wind = document.querySelector('.wind');
    let weatherDescription = document.querySelector('#weatherDescription');
    let cityName = document.querySelector('.cityName');   
    


    let currentDate = new Date();
let day_time = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
});
date.innerHTML = day_time;


//convert celsius to fahrenheit temperature
fahrenheitTemp.addEventListener('click', (event) => {
  event.preventDefault();
  fahrenheitTemp.classList.add('disabledTemp');
  celsiusTemp.classList.remove('disabledTemp');
  let fahrenheitTemperature = Math.round(
      (parseInt(temperature.innerHTML) * 9) / 5 + 32
  );
  //console.log(fahrenheitTemperature);
  temperature.innerHTML = fahrenheitTemperature;
});

//convert fahrenheit temperature to celsius
celsiusTemp.addEventListener('click', (event) => {
  event.preventDefault();
  celsiusTemp.classList.add('disabledTemp');
  fahrenheitTemp.classList.remove('disabledTemp');
  let celsiusTemperature = Math.round(
      ((parseInt(temperature.innerHTML) - 32) * 5) / 9
  );
  temperature.innerHTML = celsiusTemperature;
});


    humidity.innerHTML = Math.round(props.response.data.main.humidity);
    wind.innerHTML = Math.round(props.response.data.wind.speed);
    cityName.innerHTML = props.response.data.name;
    weatherDescription.innerHTML = props.response.data.weather[0].description;
    temperature.innerHTML = Math.round(props.response.data.main.temp);
  } else {
    console.log('Not OK');
  }



 
    return(
       <div className="NOW">
         <div className="row">
        <div className="col-8">
          <div className="row col-12">
            <span className="col-6 m-0 pe-0">
              
              <span className="temperature"></span>
              <span className="units">
                <a href="#0" className="celsiusTemp removeUnderline disabledTemp">°C</a> | <a href="#0" className=" fahrenheitTemp removeUnderline">℉</a>
              </span>
            </span>
            <span className="col-6 ps-0 pt-3">
              <ul className="weatherDetails">
                <li>Humidity: <span className="humidity"></span>%</li>
                <li>wind: <span className="wind"></span> km/h</li>
              </ul>
            </span>
          </div>
        </div>
        <div className="col-4">
          <p className="cityName"></p>
          <ul className="dayDescription">
            <li id="date"></li>
            <li id="weatherDescription">
                      
            </li>
          </ul>
        </div>
      </div>
      
       </div>
    );

    


}



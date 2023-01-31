function Forecast(props){
    if(typeof(props.forecastresponse) === 'object') {
        //console.log(props.forecastresponse);
        let showForecast = document.querySelector('#Forecast');
        //console.log(showForecast);
        showForecast.innerHTML = '';

        for (let i = 1; i < 6; i++) {
            let forecastDate = props.forecastresponse.data.daily[i].time;
            forecastDate = new Date(forecastDate * 1000);
            let forecastDay = forecastDate.toLocaleDateString('en-US', {
                weekday: 'short',
            });

            showForecast.innerHTML =
                showForecast.innerHTML +
                `<span class="mt-4 me-2 mb-3 ms-2 col-2"><ul><li>
          ${forecastDay}
        </li>
        <li>
          <img src="${
              props.forecastresponse.data.daily[i].condition.icon_url
          }" alt="" id="imageId">
        </li>
        <li>
          <span>${Math.round(
              props.forecastresponse.data.daily[i].temperature.minimum
          )}°</span>
          <span> ${Math.round(
              props.forecastresponse.data.daily[i].temperature.maximum
          )}° </span>
        </li>
      </ul>
    </span>`;
            //console.log(i);
        }
    }    
    return(
        <div id="Forecast" className="row">
            
        </div>
    );
}


export default Forecast;
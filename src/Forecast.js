function Forecast(props) {
    if (Array.isArray(props.forecastresponse)) {
        //console.log(props.forecastresponse);
        let showForecast = document.querySelector('#Forecast');
        //console.log(showForecast);
        showForecast.innerHTML = '';

        for (let i = 1; i < 6; i++) {
            let forecastDate = props.forecastresponse[i].time;
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
              props.forecastresponse[i].condition.icon_url
          }" alt="" id="imageId">
        </li>
        <li>
          <span id="minimum">${Math.round(
              props.forecastresponse[i].temperature.minimum
          )}°</span>  
          <span> ${Math.round(
              props.forecastresponse[i].temperature.maximum
          )}° </span>
        </li>
      </ul>
    </span>`;
            //console.log(i);
        }
    }
    return <div id="Forecast" className="row"></div>;
}

export default Forecast;

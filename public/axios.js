  const icons = {
      clear: '☀',
      rain: '️🌧',
      storm: '⛈',
      snow: '🌨',
      mist: '🌫',
      clouds: '☁',
    };

  axios({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?q=Jeddah,ksa&APPID=c0e8b8b52ddfeffe28108f5917407c3f'
  })
      .then(response => {
          if (response.status == 200) {
              console.log(response);
              console.log(response.data.main.temp);
              var tempF = response.data.main.temp * (9/5) - 459.67;
              var icon = response.data.weather[0].main.toLowerCase();
              $("#icon").text(icons[icon]);
              $("#tempValue").text(tempF.toFixed(1)+"℉");
              $("#city").text(`${response.data.name}`);
          }
          else {
              console.log("Please try again later")
          }
      })
      .catch(error => {
          console.log(error);
      })

  $("#time").text(moment().format('LTS'));

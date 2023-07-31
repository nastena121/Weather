const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
locationBtn = inputPart.querySelector(".buttonloc"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
dayBtn = inputPart.querySelector(".buttonday"),
weatherPart = wrapper.querySelector(".weather-part"),
weather4Part = wrapper.querySelector(".weather-4part"),
wIcon = weatherPart.querySelector(".img11"),
wIcon1 = weather4Part.querySelector(".img1"),
wIcon2 = weather4Part.querySelector(".img2"),
wIcon3 = weather4Part.querySelector(".img3"),
wIcon4 = weather4Part.querySelector(".img4"),
arrowBack = wrapper.querySelector("header i");
let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

//запрос местоположение по городу
function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3f4a2c5dd5f261f187039b48e6ac1e68`;
    fetchData();
}

locationBtn.addEventListener("click", e => {
  console.log('1 rjgrf ')
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccessOneDay, onError);
    }else{
        alert("Your browser not support geolocation api");
    }

});


//после нажадия на 2 кнопку
dayBtn.addEventListener("click", e => {

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccessFourDay, onError);
    }else{
        alert("Your browser not support geolocation api");
    }

});

//запрос местоположения и вывод на 1 день
function onSuccessOneDay(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=3f4a2c5dd5f261f187039b48e6ac1e68`;
    fetchDataOneDay();
}


//запрос местоположения и вывод на 4 дня
function onSuccessFourDay(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=3f4a2c5dd5f261f187039b48e6ac1e68`;
    fetchDataFourDay();
}

//ошибка
function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

//загрузка на один день
function fetchDataOneDay(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetailsOneDay(result)).catch((error) =>{
      console.log(error);
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });

}

function fetchDataFourDay(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetailsFourDay(result)).catch((error) =>{
      console.log(error);
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetailsFourDay(info) {
  //console.log(info); // Обращаемся ко всей дате
  console.log(info);
  if(info.cod == "404"){
      infoTxt.classList.replace("pending", "error");
      infoTxt.innerText = `${inputField.value} isn't a valid city name`;
  }else{

      const city = info.city.name;
      const country = info.city.country;
      console.log(city);
      weather4Part.querySelector(".location span").innerText = `${city}, ${country}`;

    function weatherDetailsFirstDay(info) {
        const arrayAllFourDay = info.list; // Обращаемся к всему массиву
        const firstArrayDay = arrayAllFourDay[0]; // Обращаемся к определенному элементу массива

        const firstArrayDayDate = firstArrayDay.dt_txt; //Обращение к дате определенного элемента

        const firstArrayDayMain = firstArrayDay.main; // Получаем все параметры вкладки main
        const firstArrayDayMainTemp = firstArrayDayMain.temp; //получаем температуру

        const firstArrayDayWather = firstArrayDay.weather; //Получаем все параметры вкладки weather
        const firstArrayDayWatherNull = firstArrayDayWather[0]; //Получаем доступ к подмассиву вкладки weather
        const firstArrayDayWatherNullMain = firstArrayDayWatherNull.main; //Получаем доступ к main, подмассива 0, массива weather
        const {description, id} = firstArrayDayWather[0];

        if(id == 800){
            wIcon1.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon1.src = "icons/storm.svg";
        }else if(id >= 600 && id <= 622){
            wIcon1.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon1.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon1.src = "icons/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon1.src = "icons/rain.svg";
        }

        weather4Part.querySelector(".data").innerText = firstArrayDayDate;
        weather4Part.querySelector(".temp .numb").innerText = firstArrayDayMainTemp;
        weather4Part.querySelector(".weather").innerText = firstArrayDayWatherNullMain;

    }

    function weatherDetailsSecondDay() {
        const arrayAllFourDay = info.list; // Обращаемся к всему массиву
        const secondArrayDay = arrayAllFourDay[8]; // Обращаемся к определенному элементу массива

        const secondArrayDayDate = secondArrayDay.dt_txt; //Обращение к дате определенного элемента

        const secondArrayDayMain = secondArrayDay.main; // Получаем все параметры вкладки main
        const secondArrayDayMainTemp = secondArrayDayMain.temp; //получаем температуру

        const secondArrayDayWather = secondArrayDay.weather; //Получаем все параметры вкладки weather
        const secondArrayDayWatherNull = secondArrayDayWather[0]; //Получаем доступ к подмассиву вкладки weather
        const secondArrayDayWatherNullMain = secondArrayDayWatherNull.main; //Получаем доступ к main, подмассива 0, массива weather
        const {description, id} = secondArrayDayWather[0];

        if(id == 800){
            wIcon2.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon2.src = "icons/storm.svg";
        }else if(id >= 600 && id <= 622){
            wIcon2.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon2.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon2.src = "icons/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon2.src = "icons/rain.svg";
        }

        weather4Part.querySelector(".data2").innerText = secondArrayDayDate;
        weather4Part.querySelector(".temp2 .numb2").innerText = secondArrayDayMainTemp;
        weather4Part.querySelector(".weather2").innerText = secondArrayDayWatherNullMain;
    }

    function weatherDetailsThirdDay() {
        const arrayAllFourDay = info.list; // Обращаемся к всему массиву
        const thirdArrayDay = arrayAllFourDay[16]; // Обращаемся к определенному элементу массива

        const thirdArrayDayDate = thirdArrayDay.dt_txt; //Обращение к дате определенного элемента

        const thirdArrayDayMain = thirdArrayDay.main; // Получаем все параметры вкладки main
        const thirdArrayDayMainTemp = thirdArrayDayMain.temp; //получаем температуру

        const thirdArrayDayWather = thirdArrayDay.weather; //Получаем все параметры вкладки weather
        const thirdArrayDayWatherNull = thirdArrayDayWather[0]; //Получаем доступ к подмассиву вкладки weather
        const thirdArrayDayWatherNullMain = thirdArrayDayWatherNull.main; //Получаем доступ к main, подмассива 0, массива weather
        const {description, id} = thirdArrayDayWather[0];

        if(id == 800){
            wIcon3.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon3.src = "icons/storm.svg";
        }else if(id >= 600 && id <= 622){
            wIcon3.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon3.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon3.src = "icons/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon3.src = "icons/rain.svg";
        }

        weather4Part.querySelector(".data3").innerText = thirdArrayDayDate;
        weather4Part.querySelector(".temp3 .numb3").innerText = thirdArrayDayMainTemp;
        weather4Part.querySelector(".weather3").innerText = thirdArrayDayWatherNullMain;
    }

    function weatherDetailsFourthDay() {
         const arrayAllFourDay = info.list; // Обращаемся к всему массиву
        const fourthArrayDay = arrayAllFourDay[24]; // Обращаемся к определенному элементу массива

        const fourthArrayDayDate = fourthArrayDay.dt_txt; //Обращение к дате определенного элемента

        const fourthArrayDayMain = fourthArrayDay.main; // Получаем все параметры вкладки main
        const fourthArrayDayMainTemp = fourthArrayDayMain.temp; //получаем температуру

        const fourthArrayDayWather = fourthArrayDay.weather; //Получаем все параметры вкладки weather
        const fourthArrayDayWatherNull = fourthArrayDayWather[0]; //Получаем доступ к подмассиву вкладки weather
        const {description, id} = fourthArrayDayWather[0];

        if(id == 800){
            wIcon4.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon4.src = "icons/storm.svg";
        }else if(id >= 600 && id <= 622){
            wIcon4.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon4.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon4.src = "icons/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon4.src = "icons/rain.svg";
        }
        const fourthArrayDayWatherNullMain = fourthArrayDayWatherNull.main; //Получаем доступ к main, подмассива 0, массива weather

        weather4Part.querySelector(".data4").innerText = fourthArrayDayDate;
        weather4Part.querySelector(".temp4 .numb4").innerText = fourthArrayDayMainTemp;
        weather4Part.querySelector(".weather4").innerText = fourthArrayDayWatherNullMain;

    }

    weatherDetailsFirstDay(info);
    weatherDetailsSecondDay(info);
    weatherDetailsThirdDay(info);
    weatherDetailsFourthDay(info);
    wrapper.classList.add("active");
    document.getElementById('weatherfour').setAttribute("style", "display: block");
  }
}


function weatherDetailsOneDay(info){
    console.log(info);
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{

        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp} = info.main;
        const data = info.dt_txt;

        if(id == 800){
            wIcon.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "icons/storm.svg";
        }else if(id >= 600 && id <= 622){
            wIcon.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "icons/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "icons/rain.svg";
        }

        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;

        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
        document.getElementById('weather').setAttribute("style", "display: block");
    }
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});

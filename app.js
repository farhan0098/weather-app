// .then((res)=>{
    //     return res.json();
    
    // })
    // .then((data)=>{
        //     console.log(data)
        
        // })
        // .catch((err)=>{
            //     console.log(err)
            
            // })
            let notFound="assets/images/page-not-found.png";
let search=document.getElementById("search")
let btn=document.getElementById("btn")
let API_KEY=`94c8fa67a0a4f5bf168a5e93159ae243`
let box=document.querySelector('.box')
 function fetchData(){
    if(search.value.trim()===""){
        box.innerHTML=`<p class="error"> please enter a city name </p>`
    }else{
        box.innerHTML=`<p>loading......</p>`
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=${API_KEY}`
        fetch(url)
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            showData(data)
    
        })
        
        .catch((err) => {
            box.innerHTML = `<h1> city not found</h1>`;
            
            
        });
        
        

    }
    search.value=""
    }
    let body=document.querySelector("body")
    function showData(data){
        const{country}=data.sys;
        const{temp}=data.main;
        let updatetemp=Math.round(temp)
    let {main,id}=data.weather[0]
    let urlImage="";
    

    if(id >=200 && id <=232){
        urlImage="./assets/images/thunderstorm.png"
        body.className ="thunderstorm"
    }else if(id >=300 && id <=321){
        urlImage="./assets/images/drizzle.png"
         body.className =" drizzle"
    }
    else if(id >=500 && id <=531){
        urlImage="./assets/images/heavy-rain.png"
         body.className ="heavy-rain"
    }
    else if(id >=600 && id <=622){
        urlImage="./assets/images/snowy.png"
         body.className ="snowy"
    }
    else if(id >=701 && id <=781){
        urlImage="./assets/images/haze.png"
         body.className ="haze"
    }
    else if(id >=801 && id <=804){
        urlImage="./assets/images/clouds.png"
         body.className ="clouds"
    }else{
        urlImage="./assets/images/sun.png"
         body.className ="sun"

    }

    console.log(data)
    box.innerHTML=`

     <p>${data.name},${country}</p>
            <img src="${urlImage}"/>
                <h1>${updatetemp} <sup>0</sup>C</h1>
                <p>${main}</p>
    
    
    
    
    `
    
}


let  Gpslocation=document.querySelector(".location")
    
function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            console.log(lat,lon)
            let Currenturl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
            fetch(Currenturl)
                .then((res) => res.json())
                .then((data) => showData(data))
                .catch((err) => {
                    box.innerHTML = ` <img src="assets/images/page-not-found.png" alt="">`
                    console.log(err);
                });
        },
        (error) => {
            const { message } = error;
            box.innerHTML = `<p class="Error">${message}</p>`;
        }
    );
}











btn.addEventListener('click', fetchData);
Gpslocation.addEventListener("click",getCurrentLocation)
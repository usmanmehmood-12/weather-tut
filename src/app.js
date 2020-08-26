window.addEventListener('load',()=>{

    let long;
    let lat;
    let temperatureDescription=document.querySelector(".temperature-description");
    let temperatureDegree=document.querySelector(".temperature-degree");
    let locationTimezone=document.querySelector(".location-timezone");
    let temperatureSection=document.querySelector('.temperature');
    let temperatureSpan=document.querySelector('.temperature span'); 

    if(navigator.geolocation) /*so if this thing exists in the browser than we can find the exact position of the user
     (it will ask you to allow your geolocation */
        {
            navigator.geolocation.getCurrentPosition(position=>{
                //console.log(position);
                long=position.coords.longitude;
                lat=position.coords.latitude;
                
                const proxy='https://cors-anywhere.herokuapp.com/'; //because darksky doesnt shows their data on localhost but the one im using does, so just trying it out anyway
                const api=`${proxy}http://api.weatherapi.com/v1/current.json?key=07bd7b5be1c74318a6c181218202608&q=${lat},${long}`;

                fetch(api)
            .then(response =>
            {
                return response.json()
            }).then(data=>{
                console.log(data);
                const {temp_c,humidity,condition}=data.current;
               
                //set DOM Elements from the API
                console.log(temp_c);
                console.log(humidity);
                console.log(data.location.region);
                               temperatureDegree.textContent=temp_c;
                temperatureDescription.textContent=condition.text;
                //locationTimezone.textContent=data.location.region;
            //setIcons(condition.text,document.querySelector(".icon"));
        //change temperature to celcius/fahrenheit  
        let celcius=(temp_c-32)*(5/9);        
        temperatureSection.addEventListener('click',()=>
                {
                    if(temperatureSpan.textContent==="F°")
                    {
                        temperatureSpan.textContent="C°";
                        temperatureDegree.textContent=Math.floor(celcius);
                    }
                    else{
                        temperatureSpan.textContent="F°";
                        temperatureDegree.textContent=temp_c;
                    }
                });
        
        });

            });
            
        }
        // else
        // {
        //     h1.textContent="Hey this only works if you allow your geolocation";
        // }

function setIcons(text,IconId )
{
    const skycons=new Skycons({color:"white"});
    //const currentIcon=text.replace(/-/g);
    skycons.play();
    return skycons.set(IconId,Skycons[text]);
}

});/* so after our page loads bascially this function 
runs and everything inside here runs (equivalent 
    to onload or something in jquery */
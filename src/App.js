import React, { useEffect , useState } from 'react';
import './App.css';
import {useHistory , Switch , Route} from "react-router-dom";
import { toast } from 'react-toastify';
import Pending from './Pages/Global/Pending';


const App=()=>{
  const history=useHistory();
  const [loading , setLoading]=useState(false);

  useEffect(()=>{
    setLoading(true);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setCoord,handler);
        function setCoord(position){
            localStorage.setItem("lat",position.coords.latitude.toFixed(6));
            localStorage.setItem("long",position.coords.longitude.toFixed(6));
            setLoading(false);
        }
        function handler(error){
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    toast.error("برای استفاده از نرم افزار نیاز به دسترسی موقعیت مکانی میباشد.لطفا خارج شوید و دوباره وارد شوید یا صفحه را رفرش کنید",{
                        position: toast.POSITION.TOP_RIGHT
                    });
                  break;
                case error.POSITION_UNAVAILABLE:
                    toast.error("موقعیت جغرافیایی ناشناس میباشد.",{
                        position: toast.POSITION.TOP_RIGHT
                    });
                  break;
                case error.TIMEOUT:
                    toast.error("لطفا از برنامه خارج شوید و دوباره امتحان کنید.",{
                        position: toast.POSITION.TOP_RIGHT
                    });
                  break;
                case error.UNKNOWN_ERROR:
                    toast.error("یک خطای ناشناس رخ داده !",{
                        position: toast.POSITION.TOP_RIGHT
                    });  
                  break;
              }
        }
    }
},[])

  return (
    <div className="App">
      <div className="app-container">
        {loading===true ?
          <Pending/>
          :
          <div>app</div>
        }
      </div>
    </div>
  );
}

export default App;

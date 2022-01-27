import React, { useEffect , useState } from 'react';
import './App.css';
import "./Helper/NotifStyle.css"
import {useHistory , Switch , Route , useLocation} from "react-router-dom";
import { toast } from 'react-toastify';
import Pending from './Pages/Global/Pending';
import Login from './Components/Auth/Login';
import Dashboard from "./Components/Dashboard/Dashboard";


const App=()=>{
  const history=useHistory();
  const location=useLocation();
  const [loading , setLoading]=useState(false);

  useEffect(()=>{
    setLoading(true);
      setTimeout(()=>{
          if(localStorage.getItem("token")){
            history.push("/dashboard/home");
            setLoading(false);
          }else{
            history.push("/login");
            setLoading(false);
          }
        },1000)
      }
    ,[])

  return (
    <div className={`${location.pathname!=="/dashboard/process/map" && "app-bg-is-map"} App`}>
      <div className="app-container">
        {loading===true ?
          <Pending/>
          :
          <div>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        }
      </div>
    </div>
  );
}

export default App;

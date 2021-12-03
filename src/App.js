import React, { useEffect } from 'react';
import './App.css';
import { toast } from 'react-toastify';

function App() {

  useEffect(()=>{
    toast.warning("لطفا نوع آگهی را انتخاب کنید",{
      position: toast.POSITION.BOTTOM_LEFT
  });
  },[])

  return (
    <div className="App">
      app
    </div>
  );
}

export default App;

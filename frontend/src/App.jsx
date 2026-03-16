import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userslice";
import InterviewPage from "./pages/InterviewPage.jsx"

export const serverUrl = "http://localhost:3000";

const App = () => {
  const dispatch=useDispatch()
  useEffect(() => {
    const getUser = async () => {
      try {
        const result =await axios.get(serverUrl+ "/api/user/current-user",{withCredentials:true})
        dispatch(setUserData(result.data))
      } catch (error) {
        dispatch(setUserData(null))
      }
    };
    getUser();
  }, [dispatch]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/interview" element={<InterviewPage />} />
        
      </Routes>
    </div>
  );
};

export default App;

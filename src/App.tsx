// #region 'Importing stuff'
import { useEffect, useState } from "react"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import "./App.css"

import ErrorPage from "./Pages/Error/ErrorPage"
import HomePage from "./Pages/Home/HomePage"
import LoginPage from "./Pages/Login/LoginPage"
import ProfilePage from "./Pages/Profile/ProfilePage"
import RegisterPage from "./Pages/Register/RegisterPage"
import VideoItemPage from "./Pages/VideoItem/VideoItemPage"
import WelcomePage from "./Pages/Welcome/WelcomePage"
import ContactPage from "./Pages/Contact/ContactPage"
import { useStore } from "./Zustand/store"
import FileUpload from "./Components/FileUpload/FileUpload"
// #endregion

function App() {

  const { setUser } = useStore()

  function validateUser() {

    if (localStorage.token) {

      fetch("http://localhost:4000/validate", {
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {

          if (data.error) {
            console.log("Validation failed.");
          } 
          
          
          else {
            setUser(data);
          }

      });

    }

  }

  return (

    <>

      <Routes>

        <Route index element={<Navigate replace to="/welcome" />} />
        
        <Route path="/home" element={
          <HomePage validateUser = {validateUser} />} 
        />

        <Route path="/videos/:id" element={
          <VideoItemPage validateUser = {validateUser} />} 
        />

        <Route path="/users/:id" element={
          <ProfilePage validateUser = {validateUser} />} 
        />

        <Route path="/login" element={
          <LoginPage 
            validateUser = {validateUser}
          />} 
        />

        <Route path="/contact" element={
          <ContactPage 
            validateUser = {validateUser}
          />} 
        />

        <Route path="/register" element={
          <RegisterPage 
            validateUser = {validateUser}
          />} 
        />
        
        <Route path="/welcome" element={
          <WelcomePage validateUser = {validateUser} />} 
        />
        
        <Route path="*" element={
          <ErrorPage validateUser = {validateUser} />} 
        />

        <Route path="/fileUpload" element={
          <FileUpload validateUser = {validateUser} />} 
        />
      
      </Routes>

    </>

  );

}

export default App;
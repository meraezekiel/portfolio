import React from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import { HomePage } from '../pages';

export default function MainNavigation() {
  const navigate = useNavigate();
  return (
   <Routes>
        <Route path="/" element={<HomePage navigation={navigate}/>} />
    </Routes>
  )
}


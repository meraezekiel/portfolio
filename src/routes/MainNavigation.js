import React, { useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import { HomePage } from '../pages';
import {ProtectedOnboardingRoute} from './ProtectedOnboardingRoute';
import { ProtectedPartTimerRoute } from './ProtectedPartTimerRoute';

export default function MainNavigation() {
  const navigate = useNavigate();
  const [routeParams, setRouteParams] = useState({});
  return (
   <Routes>
        <Route path="/" element={<HomePage navigation={navigate}/>} />
      {/* <Route path="/interview/:UUID/:applicantid?/:resumeid?" element={<ProtectedOnboardingRoute><DetailsScreen navigation={navigate}/></ProtectedOnboardingRoute>} /> */}
    </Routes>
  )
}


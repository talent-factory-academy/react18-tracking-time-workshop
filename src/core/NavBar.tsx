import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {

  function setActive(params: { isActive: boolean }) {
    return params.isActive ? 'text-orange-300' : ''
  }

  return (
    <nav className="flex items-center gap-3 p-5 mb-5 bg-slate-500 text-white">
      <svg width={50}  id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.08">
        <title>time-tracking</title>
        <path fill="white" d="M56.47,21.6a50.48,50.48,0,0,1,43,38.21l-.32-.1a35.09,35.09,0,0,0-8.51-1.36,42.32,42.32,0,1,0-30.25,54.46,35.13,35.13,0,0,0,5.93,6.73A50.43,50.43,0,1,1,46.94,21.36V12.9c0-.12,0-.25,0-.38H37.52A2.82,2.82,0,0,1,34.7,9.71V2.82A2.83,2.83,0,0,1,37.52,0H65.9a2.82,2.82,0,0,1,2.81,2.82V9.71a2.81,2.81,0,0,1-2.81,2.81H56.45c0,.13,0,.26,0,.38v8.7ZM86.82,69.24a24.27,24.27,0,0,1,24.35,35.07l11.71,10.21-6.46,7.39-11.31-10A24.27,24.27,0,1,1,86.82,69.24Zm14.37,9.51a18.71,18.71,0,1,0,6.91,12.54,18.65,18.65,0,0,0-6.91-12.54ZM54.47,64.13A8.55,8.55,0,1,1,43,76H28.18a4,4,0,0,1,0-8.1H42.74a8.56,8.56,0,0,1,3.63-3.76V44.54a4.05,4.05,0,0,1,8.1,0V64.13Zm41.24-27.3c2-4.67,1.72-9.56-1.08-12.84-3.36-3.93-9.44-4.38-15.08-1.61A81.78,81.78,0,0,1,95.71,36.83Zm-90.57,0c-2-4.67-1.73-9.56,1.07-12.84,3.36-3.93,9.44-4.38,15.08-1.61A81.73,81.73,0,0,0,5.14,36.83Z"/>
      </svg>
      <NavLink
        className={setActive}
        to="/tracking">Tracking</NavLink>
      <NavLink
        className={setActive}
        to="/reports">Reports</NavLink>
    </nav>
  )
};

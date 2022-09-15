import React, {createContext, useReducer} from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Dashboard from "./Dashboard";
import Header from "./Header";
import {Route, Routes} from 'react-router-dom';
import LogOut from "./LogOut";
import {reducer, initialstate} from "../reducer/useReducer";

export const Usercontext = createContext();

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialstate);

  return (
    <>
      <Usercontext.Provider value={{state, dispatch}}>
      <Header />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login"  element={<LogIn />}></Route>
          <Route path="/signup"  element={<SignUp />}></Route>
          <Route path="/logout"  element={<LogOut />}></Route>
        </Routes>
      </Usercontext.Provider>
    </>
  )
}



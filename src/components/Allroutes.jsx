import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Product from '../pages/Product'
import Workfloweditor from './Workfloweditor'

export default function Allroutes() {
  return (
    <div>
        <Routes>
            {/* <Route path="/" element={<Home/>}></Route> */}
            <Route path='/' element={<Workfloweditor/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
         
        </Routes>
    </div>
  )
}

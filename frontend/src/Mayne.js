import React from "react";
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import SecondPage from "./pages/SecondPage";
import NotFound from "./pages/NotFound";

const Mayne = () => {
    return(
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/SecondPage" element={<SecondPage/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
        </Routes>
    )
}

export default Mayne;
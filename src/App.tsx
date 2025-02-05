import React from "react";
import Wheel from "./components/Wheel/Wheel";
import "./App.css";
import MyList from "./components/List/MyList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Card from "./components/Card/Card";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Wheel/>}/>
                <Route path="list" element={<MyList/>}/>
                <Route path="/list/card" element={<Card/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
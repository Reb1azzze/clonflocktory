import React from "react";
import Wheel from "../components/Wheel/Wheel";
import "./App.css";
import MyList from "../components/List/MyList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import Card from "../components/Card/Card";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Wheel/>}/>
                <Route path="list" element={<MyList/>}/>
                <Route path="spinner" element={<Spinner/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
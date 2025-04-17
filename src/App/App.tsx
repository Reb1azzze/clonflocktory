import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Wheel from "../components/Wheel/Wheel";
import MyList from "../components/List/MyList";
import Spinner from "../components/Spinner/Spinner";
import useUserUUID from "../hooks/useUserUUID";
import TestGameBall from "../pages/TestGameBall";
import TestGameCard from "../pages/TestGameCard";

import "./App.css";

const App: React.FC = () => {
    useUserUUID();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Wheel/>}/>
                <Route path="list" element={<MyList/>}/>
                <Route path="spinner" element={<Spinner/>}/>
                <Route path="testGameBall" element={<TestGameBall/>}/>
                <Route path="testGameCard" element={<TestGameCard/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
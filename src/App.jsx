import React from "react";
import Room from "./Room";
import "./App.scss";

function App() {
    return (
        <div style={{ minHeight: "100vh !important" }} className="app">
            <h1>Alvo Connect</h1>
            <Room />
        </div>
    );
}

export default App;

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Mapa } from './mapa';
import { Search } from './Search';


export const Main = () => {
    const [position, setPosition] = useState(null);

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100vW', height: '100vh' }}>
            <div style={{ width: '50vw', height:'100vh'}}>
                <Mapa position = {position}/>
            </div>
            <div style={{ border: '2px solid black', width: '50vw' }}>
                <Search selectPosition = {position} setPosition = {setPosition}/>
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('main')).render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
)
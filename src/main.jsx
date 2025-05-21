import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {CurrencyProvider} from "./Context/CurrencyContext.jsx";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <CurrencyProvider>
                <App />
            </CurrencyProvider>
        </LocalizationProvider>
    </React.StrictMode>
);

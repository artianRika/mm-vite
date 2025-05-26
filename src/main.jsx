import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {CurrencyProvider} from "./Context/CurrencyContext.jsx";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {TransactionsProvider} from "@/Context/TransactionsContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <CurrencyProvider>
                <TransactionsProvider>
                    <App />
                </TransactionsProvider>
            </CurrencyProvider>
        </LocalizationProvider>
    </React.StrictMode>
);

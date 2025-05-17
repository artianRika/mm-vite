import BalanceCard from "./BalanceCard.jsx";
import React from "react";

const MainView = (props) =>{
    const { selectedCurrency, getCurrencies } = props;

    const isCurrencySelected =
        selectedCurrency && Object.keys(selectedCurrency).length > 0;

    return (
        <div>
            {
                isCurrencySelected && <BalanceCard getCurrencies={getCurrencies} selectedCurrency={selectedCurrency} />
            }
        </div>
    );
}

export default MainView
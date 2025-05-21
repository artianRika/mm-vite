import {supabase} from "../../utils/supabase.js";
import {createContext, useEffect, useState} from "react";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {

    const [currencyList, setCurrencyList] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState({});


    const getCurrencies = async (curr_id = null) => {
        const { data, error } = await supabase.from("Currencies").select().order('currency_id', { ascending: true });

        if (error) {
            console.error('Error fetching currencies:', error);
        } else {
            setCurrencyList(data);

            if (data.length > 0) {
                if (curr_id !== null) {
                    const index = data.findIndex(item => item.currency_id === curr_id);
                    if (index !== -1) {
                        setSelectedCurrency(data[index]);
                    }
                    if(curr_id === "last"){
                        setSelectedCurrency(data[data.length - 1])
                    }
                } else {
                    setSelectedCurrency(data[0]);
                }
            }
        }
    };

    useEffect(() => {
        getCurrencies()
    }, [])

    return (
        <CurrencyContext.Provider
            value={{
                currencyList,
                setCurrencyList,
                selectedCurrency,
                setSelectedCurrency,
                getCurrencies,
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );


}
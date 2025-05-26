import React, {createContext, useContext, useEffect, useState} from "react";
import {supabase} from "../../utils/supabase.js";
import {CurrencyContext} from "@/Context/CurrencyContext.jsx";
import moment from "moment/moment.js";

export const TransactionsContext = createContext();

export const TransactionsProvider = ({children}) =>{

    const { selectedCurrency } = useContext(CurrencyContext)
    const [transactions, setTransactions] = useState({})

    const [fromDate, setFromDate] = React.useState(moment().startOf('month'));
    const [toDate, setToDate] = React.useState(moment());


    const getTransactions = async () => {
        const {data, error} = await supabase
            .from('Transactions')
            .select(`
                *,
                Currencies (
                  *,
                  Users (
                    *
                  )
                )
              `)
            .eq('currency_id', selectedCurrency.currency_id)
            .eq('Currencies.user_id', '3bf91472-8ad5-4e00-aa6e-90f1b28ff841')
            .gte('created_at', fromDate.toISOString())
            .lte('created_at', toDate.clone().endOf('day').toISOString())
            .order('created_at', { ascending: false });

        if(error) {
            console.log("error fetching the trans..")
        }
        else{
            setTransactions(data)
        }
    }
    useEffect(() => {
        getTransactions()
    }, [selectedCurrency, fromDate, toDate]);

    return(
        <TransactionsContext.Provider
            value={{
                transactions,
                fromDate,
                setFromDate,
                toDate,
                setToDate,
                getTransactions
            }}
        >
            { children }
        </TransactionsContext.Provider>
    )
}
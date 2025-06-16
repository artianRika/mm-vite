import React, {createContext, useCallback, useContext, useEffect, useState} from "react";
import {supabase} from "../../utils/supabase.js";
import {CurrencyContext} from "@/Context/CurrencyContext.jsx";
import moment from "moment/moment.js";
import {UserContext} from "@/Context/UserContext.jsx";

export const TransactionsContext = createContext();

export const TransactionsProvider = ({children}) =>{

    const { authUser } = useContext(UserContext);
    const { selectedCurrency, currencyList } = useContext(CurrencyContext)

    const [transactions, setTransactions] = useState({})

    const [fromDate, setFromDate] = React.useState(moment().startOf('month'));
    const [toDate, setToDate] = React.useState(moment());


    const getTransactions = useCallback(async () => {
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
            .eq('Currencies.user_id', authUser?.id)
            .gte('created_at', fromDate.toISOString())
            .lte('created_at', toDate.clone().endOf('day').toISOString())
            .order('created_at', { ascending: false });

        if(error) {
            console.log("error fetching the trans..")
        }
        else{
            setTransactions(data)
        }
    }, [selectedCurrency.currency_id, authUser?.id, fromDate, toDate])

    useEffect(() => {
        getTransactions()
    }, [selectedCurrency, fromDate, toDate, currencyList]);

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
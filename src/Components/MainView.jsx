import BalanceCard from "./BalanceCard.jsx";
import React, {useContext, useEffect, useState} from "react";
import {CurrencyContext} from "../Context/CurrencyContext.jsx";
import {supabase} from "../../utils/supabase.js";
import TransactionsTable from "./TransactionsTable.jsx";

const MainView = () =>{
    const { currencyList } = useContext(CurrencyContext)

    const [user, setUser] = useState({});

    async function fetchUser() {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
            console.error('Error fetching user:', error.message);
        } else {
            setUser(data.user);
        }
    }

    useEffect(() => {
        // fetchUser();
    }, []);

    const listNotNull =
        currencyList.length > 0

    return (
        <div>
            {
                listNotNull && <BalanceCard/>
            }
            <div style={{padding: "0 8rem"}}>
                <TransactionsTable/>
            </div>
        </div>
    );
}

export default MainView
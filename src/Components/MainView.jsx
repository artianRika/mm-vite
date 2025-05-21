import BalanceCard from "./BalanceCard.jsx";
import React, {useContext, useEffect, useState} from "react";
import {CurrencyContext} from "../Context/CurrencyContext.jsx";
import {supabase} from "../../utils/supabase.js";
import TransactionsTable from "./TransactionsTable.jsx";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import moment from "moment";

const MainView = () =>{
    const { currencyList } = useContext(CurrencyContext)

    const [user, setUser] = useState({});


    const [fromDate, setFromDate] = React.useState(moment().startOf('month'));
    const [toDate, setToDate] = React.useState(moment());




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
        <div className={"flex flex-col"}>
            <div>
                { listNotNull && <BalanceCard/> }
            </div>
            <div className={"mt-20 px-17 w-[70%] self-center"}>

                <div className={"flex flex-row items-center"}>
                    <div className={"flex gap-2"}>
                        <DatePicker
                            sx={{
                                width: "200px"
                            }}
                            label="From"
                            value={fromDate}
                            onChange={(newValue) => setFromDate(newValue)}
                        />
                        <DatePicker
                            sx={{
                                width: "200px"
                            }}
                            label="То"
                            value={toDate}
                            onChange={(newValue) => setToDate(newValue)}
                        />
                    </div>
                    <div className={"ml-auto"}>
                        <Button variant="outlined"
                                sx={{
                                    color: "#000",
                                    border: `1px solid black`,
                                    fontSize: ".8rem",
                                }}
                        >
                            Export
                        </Button>
                    </div>
                </div>

                    <TransactionsTable/>
            </div>
        </div>
    );
}

export default MainView
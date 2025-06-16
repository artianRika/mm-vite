import BalanceCard from "./BalanceCard.jsx";
import React, {useContext} from "react";
import {CurrencyContext} from "../Context/CurrencyContext.jsx";
import TransactionsTable from "./TransactionsTable.jsx";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import {TransactionsContext} from "@/Context/TransactionsContext.jsx";

const MainView = () =>{

    const { currencyList } = useContext(CurrencyContext)
    const { fromDate, setFromDate, toDate, setToDate } = useContext(TransactionsContext)


    const listNotNull =
        currencyList.length > 0

    return (
        <div className={"flex flex-col"}>
            <div>
                { listNotNull && <BalanceCard/> }
            </div>

            {listNotNull &&
                <div className={"mt-20 px-17 w-[70%] self-center"}>
                    <div className={"flex flex-row items-center"}>
                        <div className={"flex gap-2"}>
                            <DatePicker
                                sx={{
                                    width: "10vw"
                                }}
                                label="From"
                                value={fromDate}
                                onChange={(newValue) => setFromDate(newValue)}
                            />
                            <DatePicker
                                sx={{
                                    width: "10vw"
                                }}
                                label="То"
                                value={toDate}
                                onChange={(newValue) => {
                                    if (newValue && fromDate && newValue.isSameOrAfter(fromDate)) {
                                        setToDate(newValue);
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <TransactionsTable fromDate={fromDate} toDate={toDate}/>
                </div>
            }
        </div>
    );
}

export default MainView
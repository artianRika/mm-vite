import {AddCircleOutline, Edit, RemoveCircleOutline} from "@mui/icons-material";
import {Button} from "@mui/material";
import * as React from "react";
import UpdateCurrencyDialog from "../Dialogs/UpdateCurrencyDialog.jsx";
import {CurrencyContext} from "../Context/CurrencyContext.jsx";
import {useContext, useState} from "react";
import AddTransactionDialog from "@/Dialogs/AddTransactionDialog.jsx";

const BalanceCard = () =>{

    const { selectedCurrency } = useContext(CurrencyContext);

    const [editAmountAlertOpen, setEditAmountAlertOpen] = useState(false);
    const [addTransactionAlertOpen, setTransactionAlertOpen] = useState(false);
    const [type, setType] = useState("Expense");

    return (
        <div className={"flex justify-center"}>

            <div className="bg-[#D0EBD1] flex flex-col items-center
                    w-[50%] p-4 rounded-xl shadow-lg">
                <div className="flex justify-between w-full">
                    <div className="flex flex-col justify-start ml-3">{selectedCurrency.currency_name}</div>
                    <div className="flex flex-col justify-end">
                        <Button color={"#000"} onClick={() => setEditAmountAlertOpen(true)}>
                            <Edit/>
                        </Button>
                        <UpdateCurrencyDialog editAmountAlertOpen={editAmountAlertOpen} editAmountClose={() => setEditAmountAlertOpen(false)} />
                    </div>
                </div>


                <div className="font-semibold text-4xl py-10">{selectedCurrency.amount}{selectedCurrency.currency}</div>

                <div className="flex gap-4">
                    <Button
                        color={"#000"}
                        onClick={() => {
                            setType("Income")
                            setTransactionAlertOpen(true)
                        }
                    }>
                        <AddCircleOutline sx={{fontSize: 40}}/>
                    </Button>

                    <Button
                        color={"#000"}
                        onClick={() => {
                            setType("Expense")
                            setTransactionAlertOpen(true)
                        }
                    }>
                        <RemoveCircleOutline sx={{fontSize: 40}}/>
                    </Button>

                    <AddTransactionDialog type={type} setType={setType} addTransactionAlertOpen={addTransactionAlertOpen} addTransactionAlertClose={() => setTransactionAlertOpen(false)}/>
                </div>
            </div>
        </div>

    );
}

export default BalanceCard;
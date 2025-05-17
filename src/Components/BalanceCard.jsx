import {AddCircleOutline, Edit, RemoveCircleOutline} from "@mui/icons-material";
import {Button} from "@mui/material";
import * as React from "react";
import UpdateCurrency from "./UpdateCurrency.jsx";

const BalanceCard = (props) =>{

    const { selectedCurrency, getCurrencies } = props;

    const [editAmountAlertOpen, setEditAmountAlertOpen] = React.useState(false);

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
                        <UpdateCurrency selectedCurrency={selectedCurrency} getCurrencies={getCurrencies} editAmountAlertOpen={editAmountAlertOpen} editAmountClose={() => setEditAmountAlertOpen(false)} />
                    </div>
                </div>


                <div className="font-semibold text-4xl py-10">{selectedCurrency.amount}{selectedCurrency.currency}</div>

                <div className="flex gap-4">
                    <Button color={"#000"}>
                        <AddCircleOutline sx={{fontSize: 40}}/>
                    </Button>
                    <Button color={"#000"}>
                        <RemoveCircleOutline sx={{fontSize: 40}}/>
                    </Button>
                </div>
            </div>
        </div>

    );
}

export default BalanceCard;
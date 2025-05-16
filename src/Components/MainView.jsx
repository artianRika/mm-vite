import BalanceCard from "./BalanceCard.jsx";
import React, {useEffect, useState} from "react";

const MainView = (props) =>{
    const { currencyId, currencyName } = props;
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        //get amount by currencyId
        // setAmount...
    }, []);

    return (
        <div>
            <BalanceCard name={currencyName} amount={amount} currency={"мкд"} />
        </div>
    );
}

export default MainView
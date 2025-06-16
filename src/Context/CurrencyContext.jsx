import {supabase} from "../../utils/supabase.js";
import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {UserContext} from "@/Context/UserContext.jsx";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {

    const [currencyList, setCurrencyList] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState({});

    const [name, setName] = useState(selectedCurrency.currency_name);
    const [amount, setAmount] = useState(selectedCurrency.amount);

    const { authUser } = useContext(UserContext)

    useEffect(() => {
        if (!authUser?.id) return;

        getCurrencies()
        console.log("authuser iddd: ", authUser.id)
    }, [authUser])

    useEffect(() => {
        if (selectedCurrency) {
            setName(selectedCurrency.currency_name || "");
            setAmount(selectedCurrency.amount || 0);
        }
    }, [selectedCurrency]);


    const getCurrencies = useCallback(async (curr_id = null) => {

        const {data, error} = await supabase
            .from("Currencies")
            .select()
            .eq('user_id', authUser.id)
            .order('currency_id', {ascending: true});

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
                    if (curr_id === "last") {
                        setSelectedCurrency(data[data.length - 1])
                    }
                } else {
                    setSelectedCurrency(data[0]);
                }
            }
        }
    }, [authUser]);


    const updateCurrency = async (transAmount = 0, transType=null) =>{
        let newAmount = amount;
        if(transType !== null){
            if(transType === "Income")
                newAmount += transAmount;
            else
                newAmount -= transAmount;
        }

        if(name !== selectedCurrency.currency_name || (newAmount) !== selectedCurrency.amount){
            const { data, error } = await supabase
                .from('Currencies')
                .update({
                    amount: newAmount,
                    currency_name: name,
                })
                .eq('currency_id', selectedCurrency.currency_id);

            if (error) {
                console.error('Update error:', error);
            } else {
                console.log('Updated successfully:', data);
                getCurrencies(selectedCurrency.currency_id);
            }
        }
    }

    return (
        <CurrencyContext.Provider
            value={{
                currencyList,
                setCurrencyList,
                selectedCurrency,
                setSelectedCurrency,
                getCurrencies,

                name,
                setName,
                amount,
                setAmount,
                updateCurrency
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );


}
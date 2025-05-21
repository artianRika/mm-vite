import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import colors from "../colors.js";
import {DialogContent, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {supabase} from "../../utils/supabase.js";
import {useContext} from "react";
import {CurrencyContext} from "../Context/CurrencyContext.jsx";

export default function AddCurrencyDialog(props) {

    const { addCurrencyAlertOpen, onAddCurrencyAlertClose } = props;
    const { getCurrencies } = useContext(CurrencyContext)


    const [currency, setCurrency] = React.useState("");
    const [currencyName, setCurrencyName] = React.useState("Savings...");
    const [amount, setAmount] = React.useState(0);


    const addCurrency = async () => {
        if(currency !== "") {
            const {data, error} = await supabase
                .from('Currencies')
                .insert([
                    {
                        user_id: "3bf91472-8ad5-4e00-aa6e-90f1b28ff841",
                        amount: amount,
                        currency: currency,
                        currency_name: currencyName,
                    }
                ])

            if (error) {
                console.error('Insert error:', error)
            } else {
                console.log('Inserted')
                getCurrencies("last");
                onAddCurrencyAlertClose();
                setCurrency("");
                setCurrencyName("Savings...");
                setAmount(0);
            }
        }

    }

    return (
        <Dialog open={addCurrencyAlertOpen} onClose={onAddCurrencyAlertClose}
                PaperProps={{
                    sx: {
                        minWidth: '400px',
                        padding: '1rem',
                        borderRadius: '9px',
                    },
                }}
                >
            <DialogTitle sx={{fontSize: "1rem"}}>Add Currency</DialogTitle>

            <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3}}>

                    <FormControl
                        sx={{
                            mt: 1, minWidth: 320,
                    }}
                    >
                        <InputLabel htmlFor="demo-dialog-native">Currency</InputLabel>
                        <Select
                         variant={"outlined"}
                         value={currency}
                         onChange={e => setCurrency(e.target.value)}
                         input={<OutlinedInput label="Currency" id="demo-dialog-native" />}
                        >
                            <MenuItem value={"MKD"}>MKD</MenuItem>
                            <MenuItem value={"EUR"}>EUR</MenuItem>
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"CHF"}>CHF</MenuItem>
                            <MenuItem value={"ALL"}>ALL</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        id="outlined-uncontrolled"
                        label="Name"
                        defaultValue={currencyName}
                        onChange={e => setCurrencyName(e.target.value)}
                    />

                    <TextField
                        id="outlined-uncontrolled"
                        label="Amount"
                        defaultValue={amount}
                        onChange={e => setAmount(Number(e.target.value))}
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button sx={{fontSize: ".8rem"}} onClick={onAddCurrencyAlertClose} color="#000">Cancel</Button>
                <Button variant="contained" onClick={() => {
                    addCurrency();
                }}
                        sx={{backgroundColor: colors.primary,
                            color: "black",
                            fontSize: ".8rem",
                            borderSize: 4}}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import colors from "../colors.js";
import {DialogContent, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import moment from "moment";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

export default function AddTransactionDialog(props) {

    const { addTransactionAlertOpen, addTransactionAlertClose } = props;

    const [date, setDate] = useState(moment());
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState("");


    const addTransaction = async () => {
        // if(currency !== "") {
        //     const {data, error} = await supabase
        //         .from('Currencies')
        //         .insert([
        //             {
        //                 user_id: "3bf91472-8ad5-4e00-aa6e-90f1b28ff841",
        //                 amount: amount,
        //                 currency: currency,
        //                 currency_name: currencyName,
        //             }
        //         ])
        //
        //     if (error) {
        //         console.error('Insert error:', error)
        //     } else {
        //         console.log('Inserted')
        //         getCurrencies("last");
        //         onAddCurrencyAlertClose();
        //         setCurrency("");
        //         setCurrencyName("Savings...");
        //         setAmount(0);
        //     }
        // }

    }

    return (
        <Dialog open={addTransactionAlertOpen} onClose={addTransactionAlertClose}
                PaperProps={{
                    sx: {
                        minWidth: '400px',
                        padding: '1rem',
                        borderRadius: '9px',
                    },
                }}
        >
            <DialogTitle sx={{fontSize: "1rem"}}>Add Transaction</DialogTitle>

            <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3}}>

                    <FormControl
                        sx={{
                            mt: 1, minWidth: 320,
                        }}
                    >
                        <InputLabel htmlFor="demo-dialog-native">Type</InputLabel>
                        <Select
                            variant={"outlined"}
                            value={type}
                            onChange={e => setType(e.target.value)}
                            input={<OutlinedInput label="Type" id="demo-dialog-native" />}
                        >
                            <MenuItem value={"Income"}>Income</MenuItem>
                            <MenuItem value={"Expense"}>Expense</MenuItem>
                            <MenuItem value={"Card"}>Card</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        id="outlined-uncontrolled"
                        label="Description"
                        defaultValue={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <TextField
                        id="outlined-uncontrolled"
                        label="Amount"
                        defaultValue={amount}
                        onChange={e => setAmount(Number(e.target.value))}
                    />

                    <DatePicker
                        label="Date"
                        // value={fromDate}
                        // onChange={(newValue) => setFromDate(newValue)}
                    />

                </Box>
            </DialogContent>

            <DialogActions>
                <Button sx={{fontSize: ".8rem"}} onClick={addTransactionAlertClose} color="#000">Cancel</Button>
                <Button variant="contained" onClick={() => {
                    addTransaction();
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

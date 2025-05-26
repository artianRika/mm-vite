import * as React from 'react';
import {useContext, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import colors from "../colors.js";
import {DialogContent, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import moment from "moment";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {supabase} from "../../utils/supabase.js";
import {CurrencyContext} from "@/Context/CurrencyContext.jsx";
import {TransactionsContext} from "@/Context/TransactionsContext.jsx";

export default function AddTransactionDialog(props) {

    const { addTransactionAlertOpen, addTransactionAlertClose, type, setType } = props;

    const [date, setDate] = useState(moment());
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState(0);

    const { selectedCurrency, updateCurrency } = useContext(CurrencyContext)
    const { getTransactions } = useContext(TransactionsContext)


    const addTransaction = async () => {
        if(description !== "") {
            const {data, error} = await supabase
                .from('Transactions')
                .insert([
                    {
                        currency_id: selectedCurrency.currency_id,
                        transaction_amount: amount,
                        description: description,
                        created_at: date,
                        transaction_type: type
                    }
                ])

            if (error) {
                console.error('Transaction insert error:', error)
            } else {
                console.log('Transaction inserted')
                getTransactions();
                addTransactionAlertClose();
                setDescription("");
                setDate(moment())
                updateCurrency(amount, type);
                setAmount(0);
            }
        }

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
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
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

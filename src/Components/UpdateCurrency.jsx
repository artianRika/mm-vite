import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import colors from "../colors.js";
import {DialogContent, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {supabase} from "../../utils/supabase.js";
import {useEffect} from "react";

export default function UpdateCurrency(props) {

    const { selectedCurrency, getCurrencies, editAmountAlertOpen, editAmountClose } = props;

    const [name, setName] = React.useState(selectedCurrency.currency_name);
    const [amount, setAmount] = React.useState(selectedCurrency.amount);

    useEffect(() => {
        setName(selectedCurrency.currency_name)
        setAmount(selectedCurrency.amount)
    }, [selectedCurrency]);


    const updateCurrency = async () =>{
        if(name !== selectedCurrency.currency_name || amount !== selectedCurrency.amount){
            const { data, error } = await supabase
                .from('Currencies')
                .update({
                    amount: amount,
                    currency_name: name,
                })
                .eq('currency_id', selectedCurrency.currency_id);

            if (error) {
                console.error('Update error:', error);
            } else {
                console.log('Updated successfully:', data);
                getCurrencies(selectedCurrency.currency_id);
                editAmountClose();
            }
        }
    }

    return (
        <Dialog open={editAmountAlertOpen} onClose={editAmountClose}
                PaperProps={{
                    sx: {
                        minWidth: '400px',
                        padding: '1rem',
                        borderRadius: '9px',
                    },
                }}
        >
            <DialogTitle sx={{fontSize: "1rem"}}>Edit Amount</DialogTitle>

            <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3, my: 2}}>
                    <TextField
                        id="outlined-uncontrolled"
                        label="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        id="outlined-uncontrolled"
                        value={amount}
                        label="Amount"
                        onChange={e => setAmount(Number(e.target.value))}
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button sx={{fontSize: ".8rem"}} onClick={editAmountClose} color="#000">Cancel</Button>
                <Button variant="contained" onClick={() => updateCurrency()}
                        sx={{backgroundColor: colors.primary,
                            color: "black",
                            fontSize: ".8rem",
                            borderSize: 4}}
                >
                    Edit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

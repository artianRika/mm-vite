import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import colors from "../colors.js";
import {DialogContent, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {useEffect} from "react";

export default function EditAmountModal(props) {

    const { editAmountAlertOpen, editAmountClose } = props;

    const [amount, setAmount] = React.useState(null);

    useEffect(() => {
        // fetch amount
        // setAmmount()
    }, []);

    const handleClick = () =>{
        console.log("Updating Amount...");
        //post new amount
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
                        label="Amount"
                        // onChange={e => setAmount(e.target.value)}
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button sx={{fontSize: ".8rem"}} onClick={editAmountClose} color="#000">Cancel</Button>
                <Button variant="contained" onClick={() => handleClick()}
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

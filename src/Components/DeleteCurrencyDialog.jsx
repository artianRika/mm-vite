import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import colors from "../colors.js";
import {supabase} from "../../utils/supabase.js";

export default function DeleteCurrencyDialog(props) {

    const { alertOpen, onAlertClose, currencyToDelete, getCurrencies } = props;

    const handleDelete = async () => {
        if (!currencyToDelete) return;

        const { error } = await supabase
            .from('Currencies')
            .delete()
            .eq('currency_id', currencyToDelete.currency_id);

        if (error) {
            console.error('Error deleting currency:', error.message);
        } else {
            await getCurrencies();

            // setSelectedCurrency((prev) =>
            //     prev?.currency_id === currencyToDelete.currency_id ? null : prev
            // );
        }

        onAlertClose();
    };

    return (
        <Dialog  open={alertOpen} onClose={onAlertClose}
                PaperProps={{
                    sx: {
                        width: "400px",
                        padding: ".2rem",
                        borderRadius: "9px",
                    },
                }}
        >

            <DialogTitle sx={{fontSize: "1rem"}}>
                Are you sure you want to delete{' '}
                <strong>{currencyToDelete?.currency_name}</strong>?
            </DialogTitle>

            <DialogActions>
                <Button sx={{fontSize: ".8rem"}} onClick={onAlertClose} color="#000">Cancel</Button>
                <Button variant="outlined"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDelete()
                        }
                        }
                        sx={{color: colors.red,
                            border: `1.3px solid ${colors.red}`,
                            fontSize: ".8rem",
                            borderSize: 4}}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

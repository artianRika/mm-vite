import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import colors from "../colors.js";

export default function DeleteCurrencyDialog(props) {

    const { alertOpen, onAlertClose } = props;

    return (
        <Dialog open={alertOpen} onClose={onAlertClose}
                PaperProps={{
                    sx: {
                        width: "400px",
                        padding: ".2rem",
                        borderRadius: "9px",
                    },
                }}>
            <DialogTitle sx={{fontSize: "1rem"}}>{`Are you sure you want to delete ${"currName"} currency?`}</DialogTitle>

            <DialogActions>
                <Button sx={{fontSize: ".8rem"}} onClick={onAlertClose} color="#000">Cancel</Button>
                <Button variant="outlined"
                        onClick={(e) => {
                            e.stopPropagation()
                            console.log("Deletedd");
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

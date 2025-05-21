import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import colors from "../colors.js";

export default function LogoutDialog(props) {

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
            <DialogTitle sx={{fontSize: "1rem"}} >Are you sure you want to sign out?</DialogTitle>

            <DialogActions>
                <Button sx={{fontSize: ".8rem"}} onClick={onAlertClose} color="#000">Cancel</Button>
                <Button variant="outlined" onClick={() => { console.log("User logged out");}}
                        sx={{
                            color: colors.red,
                            border: `1.3px solid ${colors.red}`,
                            fontSize: ".8rem",
                        }}
                >
                    Sign Out
                </Button>
            </DialogActions>
        </Dialog>
    );
}

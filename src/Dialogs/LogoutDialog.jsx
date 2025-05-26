import * as React from 'react';
import {useContext} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import colors from "../colors.js";
import {UserContext} from "@/Context/UserContext.jsx";

export default function LogoutDialog(props) {

    const { alertOpen, onAlertClose } = props;
    const { signOut } = useContext(UserContext)


    return (
        <Dialog open={alertOpen} onClose={onAlertClose}
                PaperProps={{
                    sx: {
                        width: "400px",
                        padding: ".2rem",
                        borderRadius: "9px",
                    },
                }}>
            <DialogTitle sx={{fontSize: "1rem"}} >Are you sure you want to log out?</DialogTitle>

            <DialogActions>
                <Button sx={{fontSize: ".8rem"}} onClick={onAlertClose} color="#000">Cancel</Button>
                <Button variant="outlined" onClick={signOut}
                        sx={{
                            color: colors.red,
                            border: `1.3px solid ${colors.red}`,
                            fontSize: ".8rem",
                        }}
                >
                    Log Out
                </Button>
            </DialogActions>
        </Dialog>
    );
}

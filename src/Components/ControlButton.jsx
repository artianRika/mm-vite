import ListItemIcon from "@mui/material/ListItemIcon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import * as React from "react";
import LogoutIcon from "@mui/icons-material/Logout";

const ControlButton = (props) =>{
    const {onClick} = props;

    return (
        <ListItemButton
            sx={{
                maxHeight: 34,
                px: 2.5,
                margin: ".5rem 1rem",
                display: "flex",
                justifyContent: props.open ? "space-between" : "center",
                alignItems: "center",
                ...(props.text === "Options"
                    ? { border: "0.3px solid #ccc", backgroundColor: "#fff" }
                    : {border: "0.3px solid #ccc", backgroundColor: "#fff",}),
                borderRadius: "8px",
                transition: "all 0.3s ease",
                "&:hover": {
                    ...(props.text === "Options"
                        ? {border: "0.3px solid rgba(234,234,234,0.67)",
                            backgroundColor:"rgba(234,234,234,0.67)",}
                        : { border: "0.3px solid red",
                            backgroundColor:"rgba(234,234,234,0.67)",
                        }

                    )
                },

            }}
            onClick={onClick}
        >
            <ListItemIcon sx={{ minWidth: 0, justifyContent: "center", mr: props.open ? 3 : "auto" }}>
                { props.text === "Options" ? <MoreVertIcon /> : <LogoutIcon sx={{ color: "red" }} /> }
            </ListItemIcon>

            {props.open && <ListItemText primary={props.text} sx={{ flexGrow: 1 }} />}
        </ListItemButton>
    );
}

export default ControlButton;
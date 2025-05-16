import ListItemButton from "@mui/material/ListItemButton";
import colors from "../colors.js";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as React from "react";

const CurrencyButton = (props) =>{
    function getCurrencyPath(currency) {
        switch (currency){
            case "MKD":
                return "/icons/mkd_symbol.png";
            case "EUR":
                return "/icons/eur_symbol.png";
            case "CHF":
                return "/icons/chf_symbol.png";
            case "ALL":
                return "/icons/all_symbol.png";
            case "USD":
                return "/icons/usd_symbol.png";
            default:
                return "/icons/mkd_symbol.png"
        }
    }

    return(
          <ListItemButton
              sx={{
                  minHeight: 48,
                  px: 2.5,
                  display: "flex",
                  justifyContent: props.open ? "space-between" : "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  // border: ".3px solid #ccc",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                      // border: "0.3px solid #D0EBD1",
                      backgroundColor: colors.primary,
                  },
              }}
              // onClick={}
          >
              <ListItemIcon sx={{ minWidth: 0, justifyContent: "center", mr: props.open ? 3 : "auto" }}>
                  <Box
                      component="img"
                      src={getCurrencyPath(props.currency)}
                      alt="Currency"
                      sx={{ width: "20px", height: "auto", objectFit: "contain" }}
                  />
              </ListItemIcon>

              {props.open && <ListItemText primary={props.text} sx={{ flexGrow: 1 }} />}

              {props.open && (
                  <IconButton sx={{ padding: 0 }}>
                      <MoreVertIcon />
                  </IconButton>
              )}
          </ListItemButton>
    );
}

export default CurrencyButton;
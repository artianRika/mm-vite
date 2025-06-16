import * as React from 'react';
import {useContext} from 'react';
import {useTheme} from '@mui/material/styles';
import {
    Avatar,
    Box,
    CssBaseline,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';

import colors from "../colors.js";
import CurrencyButton from "../Components/CurrencyButton.jsx";
import ControlButton from "../Components/ControlButton.jsx";
import LogoutDialog from "../Dialogs/LogoutDialog.jsx";
import MainView from "../Components/MainView.jsx";
import AddCurrencyDialog from "../Dialogs/AddCurrencyDialog.jsx";
import {CurrencyContext} from "../Context/CurrencyContext.jsx";

import {AppBar, Drawer, DrawerHeader} from './DrawerDependencies.jsx';
import {UserContext} from "@/Context/UserContext.jsx";

import { Outlet } from 'react-router-dom';


export default function MiniDrawerLayout() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [signOutAlertOpen, setSignOutAlertOpen] = React.useState(false);
    const [addCurrencyAlertOpen, setAddCurrencyAlertOpen] = React.useState(false);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const { currencyList } = useContext(CurrencyContext);
    const { user } = useContext(UserContext);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ backgroundColor: colors.primary }}>
                <Toolbar>
                    <IconButton
                        color="black"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap sx={{ color: "black" }}>
                        Where's MM
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader
                    sx={{
                        backgroundColor: "rgba(187,215,186,0.73)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position: "sticky",
                        top: 0,
                        zIndex: 1100,
                        width: "100%",
                        padding: "0.5rem 1rem",
                    }}
                >
                    {open && (
                        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                            <Avatar
                                sx={{ width: "3rem", height: "3rem", flexShrink: 0 }}
                                src="https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525"
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    marginLeft: "1rem",
                                    fontSize: ".9rem",
                                    wordWrap: "break-word",
                                    whiteSpace: "normal",
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 2,
                                    overflow: "hidden",
                                    flexGrow: 1,
                                    minWidth: 0,
                                }}
                            >
                                { `${user.first_name} ${user.last_name}` }
                            </Typography>
                        </Box>
                    )}
                    <IconButton onClick={handleDrawerClose} sx={{ flexShrink: 0 }}>
                        {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>

                <Box
                    sx={{
                        flexGrow: 1,
                        overflowY: "auto",
                        scrollbarWidth: "none",
                        overflowX: "hidden",
                        backgroundColor: "rgba(234,234,234,0.67)",
                        maxHeight: "calc(100vh - 120px)",
                    }}
                >
                    <List>
                        {currencyList.map((currency) => (
                            <ListItem
                                key={currency.currency_id}
                                sx={{ display: "flex", alignItems: "center" }}
                            >
                                <CurrencyButton currencyObj={currency} open={open} />
                            </ListItem>
                        ))}
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                px: 2.5,
                                margin: ".5rem 1rem",
                                display: "flex",
                                backgroundColor: "#fff",
                                justifyContent: open ? "space-between" : "center",
                                alignItems: "center",
                                border: ".3px solid #ccc",
                                borderRadius: "8px",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    border: "0.3px solid #D0EBD1",
                                    backgroundColor: colors.primary,
                                },
                            }}
                            onClick={() => setAddCurrencyAlertOpen(true)}
                        >
                            <ListItemIcon sx={{ minWidth: 0, justifyContent: "center", mr: open ? 3 : "auto" }}>
                                <AddIcon sx={{ color: "black" }} />
                            </ListItemIcon>
                            {open && <ListItemText primary="Add currency" sx={{ flexGrow: 1 }} />}
                        </ListItemButton>
                            <AddCurrencyDialog
                                addCurrencyAlertOpen={addCurrencyAlertOpen}
                                onAddCurrencyAlertClose={() => setAddCurrencyAlertOpen(false)} />
                    </List>
                </Box>

                <List
                    sx={{
                        position: "sticky",
                        bottom: 0,
                        backgroundColor: "rgba(234,234,234,0.67)",
                        width: "100%",
                        zIndex: 1000,
                    }}
                >
                    <ControlButton text="Logout" open={open} onClick={() => setSignOutAlertOpen(true)} />
                    <LogoutDialog alertOpen={signOutAlertOpen} onAlertClose={() => setSignOutAlertOpen(false)} />
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />

                <Outlet/>
                {/*<MainView />*/}
            </Box>
        </Box>
    );
}

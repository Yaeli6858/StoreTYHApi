import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { jwtDecode } from 'jwt-decode';
import Login from '@mui/icons-material/Login';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import HowToRegIcon from '@mui/icons-material/HowToReg'

export default function AccountMenu() {
    let letter
    try {
        const decode = jwtDecode(localStorage.getItem("token"))
        console.log(decode);
        letter = decode.name.charAt(0)
    }
    catch (error) {
        letter = ""
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const logOut = () => {
        localStorage.setItem("token", "")
        handleClose()
        window.location.href = "/"
    }

    const toLogin = ()=>{
        handleClose()
        window.location.href = "/Login"
    }

        const toRegister = ()=>{
        handleClose()
        window.location.href = "/Register"
    }
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>{letter}</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {!letter && <MenuItem onClick={toRegister}>
                    <ListItemIcon>
                        <HowToRegIcon fontSize="small" />
                    </ListItemIcon>
                    Register
                </MenuItem>}
                {!letter && <MenuItem onClick={toLogin}>
                    <ListItemIcon>
                        <Login fontSize="small" />
                    </ListItemIcon>
                    Login
                </MenuItem>}
                {letter && <MenuItem onClick={logOut}>
                    <ListItemIcon>
                        <PowerSettingsNewIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>}
            </Menu>
        </React.Fragment>
    );
}
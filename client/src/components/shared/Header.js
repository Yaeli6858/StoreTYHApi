import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import AvatarButton from './AvatarButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
export default function CenteredTabs() {

  const location = useLocation()
  const [open, setOpen] = useState(false)
  const checkLink = (pathname) => {
    if (pathname.startsWith("/Products")) return "/Products";
    return pathname
  }


  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", margin: "2vh" }}><Link to="/"><img src='/favicon.avif' ></img></Link></div>

      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={checkLink(location.pathname)} centered
          sx={{
            '& .MuiTab-root': {
              color: 'gray',
              '&.Mui-selected': {
                color: '#06213f',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#ece82d',
            },
          }}>
          <Tab label="Home Page" component={NavLink} to="/" value={"/"} />
          <Tab label="Prodocts" component={NavLink} to="/Products" value={"/Products"} />
          <Tab icon={
            <Badge badgeContent={0} color="error" sx={{ mr: 1 }}>
              <ShoppingCartIcon />
            </Badge>
          } component={NavLink} to="/Cart" value={"/Cart"} />
          <AvatarButton />
        </Tabs>
      </Box>
    </>

  );
}

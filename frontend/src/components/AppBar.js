import React, { Component, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import WaterIcon from '@mui/icons-material/Water';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { PlayLessonOutlined } from '@mui/icons-material';

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        enableColorOnDark
        >
        <Toolbar>
          <WaterIcon
            id="left-menu-button"
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          />
          <Menu
            id="left-menu"
            aria-labelledby="left-menu-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            >  
            <MenuItem onClick={handleClose}>
              <Link href="/" underline="none" color="inherit">Home</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="/tasks" underline="none" color="inherit">My Tasks</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="/contact" underline="none" color="inherit">Contact</Link>
            </MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tranquil Todo
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FaGlobeAmericas } from "react-icons/fa";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import { GiNotebook } from 'react-icons/gi';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import { GiSkills } from "react-icons/gi";
import { SiFormstack } from "react-icons/si";
import { RiLogoutCircleFill } from "react-icons/ri";

export default function NavBar2() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const isRecruiter = localStorage.getItem('userType') === 'Recruiter';

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  console.log(localStorage.getItem('userType'))

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, position: 'sticky' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CareerGrow <FaGlobeAmericas color='purple'/>
          </Typography>
          {auth && (
            <div>
              {!isRecruiter && (
                <IconButton>
                  <GiSkills color='white' onClick={() => navigate('/skilltest')}/>
                </IconButton>
              )}
              <IconButton>
                <SiFormstack color='white'/>
              </IconButton>
              <IconButton>
              <IconButton>
                  < RiLogoutCircleFill color='white' onClick={() => navigate('/logout')}/>
                </IconButton>
              </IconButton>
              {!isRecruiter && (
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <GiNotebook size={24} onClick={() => navigate('/interest')} />
                </IconButton>
              )}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle size={23}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><u onClick={() => navigate('/profile')}>Profile</u></MenuItem>
                {!isRecruiter && <MenuItem onClick={handleClose}><u onClick={() => navigate('/main')}>Home</u></MenuItem>}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

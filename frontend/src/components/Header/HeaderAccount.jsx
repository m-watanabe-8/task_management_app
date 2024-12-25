import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Logout } from "components/Logout";
import { useState } from 'react';
import { useCookies } from 'react-cookie';

export function HeaderAccount() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const token = cookies.accessToken
    const [anchorEl, setAnchorEl] = useState(null); // メニューの表示位置を決定する基準点を設定

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircleIcon />
            </IconButton>
            {token === void 0 ? (
                <Menu
                id="menu-appbar"
                sx={{ mt: '45px' }}
                anchorEl={anchorEl}     // メニューの位置を設定
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}    // anchorElがnullでない場合にメニューが表示される
                onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                        <Button color="inherit" href="/login">ログイン</Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Button color="inherit" href="/signup">新規登録</Button>
                    </MenuItem>
                </Menu>
            ) : (
                <Menu
                id="menu-appbar"
                sx={{ mt: '45px' }}
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
                    <MenuItem onClick={handleClose}>
                        <Logout />
                    </MenuItem>
                </Menu>
            )}
        </div>
    );
}
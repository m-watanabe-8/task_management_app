import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { HeaderAccount } from "components/Header/HeaderAccount";
import { HeaderMenu } from "components/Header/HeaderMenu";

export function Header() {

    return (
        <Box>
            <AppBar position="static" sx={{ backgroundColor: '#087EA2', maxHeight:"64px" }}>
                <Toolbar>
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                        <Box display={'flex'} flexDirection={'row'}>
                            <HeaderMenu />
                            <img src="./images/logo.png" className="App-logo" alt="logo"  style={{ maxHeight: 40 }}/>
                        </Box>
                        <HeaderAccount />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
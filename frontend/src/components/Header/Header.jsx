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
                    <Box sx={{ 
                            display: 'flex', 
                            flexGrow: 1,  // 左側のコンテンツが可能な限り広がる
                            alignItems: 'center'  // 垂直方向の中央揃え
                        }}>
                            <HeaderMenu />
                            <img 
                                src="./images/logo.png" 
                                className="App-logo" 
                                alt="logo"  
                                style={{ maxHeight: 40 }}
                            />
                        </Box>
                        <Box sx={{ 
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <HeaderAccount />
                        </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
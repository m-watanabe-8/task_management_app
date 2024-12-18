import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { HeaderAccount } from "components/Header/HeaderAccount";
import { HeaderMenu } from "components/Header/HeaderMenu";

export function Header() {

    return (
        <Box>
            <AppBar position="static" sx={{ backgroundColor: '#087EA2' }}>
                <Toolbar>
                    <HeaderMenu />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Task Management
                    </Typography>
                    <HeaderAccount />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
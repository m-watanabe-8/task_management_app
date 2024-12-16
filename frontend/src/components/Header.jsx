import FaceIcon from '@mui/icons-material/Face';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export function Header() {
    return (
        <Box>
            <AppBar position="static" sx={{ backgroundColor: '#087EA2' }}>
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Task Management
                </Typography>
                <Button color="inherit"><FaceIcon /></Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
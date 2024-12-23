import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate('/'); // ホームページにリダイレクト
    };
    return (
        <Box 
        sx={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh', 
            textAlign: 'center'
        }}
        >
        <Typography variant="h1" color="error" sx={{ fontSize: '8rem', fontWeight: 'bold' }}>
            404
        </Typography>
        <Typography variant="h5" gutterBottom>
            お探しのページは見つかりませんでした。
        </Typography>
        <Typography variant="body1" paragraph>
            入力した URL が正しいか、もう一度確認してください。<br />
            または、ホームページに戻ることができます。
        </Typography>
        <Button 
            variant="contained" 
            color="primary" 
            onClick={handleGoHome}
        >
            ホームに戻る
        </Button>
        </Box>
    );
};
export default ErrorPage;
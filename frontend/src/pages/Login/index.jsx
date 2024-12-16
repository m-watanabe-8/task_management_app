import { useForm } from "react-hook-form";
import { Header } from "../../components/Header";

import {
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Typography
} from '@mui/material';

const Login = () => {
    const { register, handleSubmit, watch, errors } = useForm();


return (
    <>
        <Header />
        <Container 
        maxWidth="xs" 
        sx={{ p:5 }}
        >
            <Card sx={{ minWidth: 275, p:3 }}>
                <Typography variant="h5" component="div">
                    ログイン
                </Typography>
                <Typography variant="body2" sx={{ opacity: "70%" }}>
                    メールアドレスとパスワードを入力して下さい
                </Typography>
                <CardContent>
                    <form onSubmit={handleSubmit()}>
                        <TextField
                            label="メールアドレス"
                            fullWidth
                            margin="normal"
                            variant="standard"
                            {...register('email')}
                        />
                        <TextField
                            label="パスワード"
                            fullWidth
                            margin="normal"
                            type="password"
                            variant="standard"
                            sx={{ mb: 3 }}
                            {...register('password', { required: true })} 
                        />
                        <Button variant="contained" sx={{backgroundColor: "#05a7be"}} type="submit">ログイン</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    </>
);
}

export default Login;
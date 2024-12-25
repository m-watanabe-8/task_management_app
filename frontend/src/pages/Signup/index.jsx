import axios from 'axios';
import { Header } from "components/Header/Header";
import { API_USER_URL } from "configs/ApiRouteUrl";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Typography
} from '@mui/material';

const Signup = (data) => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    // サーバのURL
    const url = `${API_USER_URL}user-create/`;

    const createUser = async (data) =>{
        // 新規ユーザーを作成
        try{
            await axios.post(url,data,)
            navigate('/login/');
        }
        catch(error){
            if(error)
            alert('入力された情報はすでに登録されています。\n別のユーザー名またはメールアドレスをご入力ください。');
        };
    };

return (
    <>
    <Header />
    <Container
    maxWidth="xs" 
    sx={{ p:5 }}
    >
        <Card sx={{ minWidth: 275, p:3 }}>
            <Typography variant="h5" component="div">
                新規登録
            </Typography>
            <CardContent>
                <form onSubmit={handleSubmit(createUser)}>
                    <TextField
                        label="ユーザー名"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        {...register('username',{
                            required: '内容は必須です',
                            maxLength: {
                                value: 20,
                                message: '最大20文字です'
                            },
                        })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField
                        label="メールアドレス"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        type="email"
                        {...register('email',{
                            maxLength: {
                                value: 255,
                                message: '最大255文字です'
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        label="パスワード"
                        fullWidth
                        margin="normal"
                        type="password"
                        variant="standard"
                        sx={{mb:3}}
                        {...register('password', {
                            required: true,
                            minLength: {
                                value: 8,
                                message: '8文字以上の入力が必要です'
                            }
                        })} 
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button variant="contained" sx={{backgroundColor: "#05a7be", mb:1}} type="submit">新規登録</Button>
                    <div>
                        <Button href="/login" endIcon={<KeyboardArrowRightIcon />}>ログインはこちら</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </Container>
    </>
);
}

export default Signup;
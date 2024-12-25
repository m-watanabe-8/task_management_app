import axios from 'axios';
import { API_USER_URL } from "configs/ApiRouteUrl";
import { useCookies } from 'react-cookie';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Header } from "../../components/Header/Header";

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Typography
} from '@mui/material';
import { useEffect } from 'react';


const Login = () => {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies();
    const { register, handleSubmit, watch, errors } = useForm();

    const apiURL = `${API_USER_URL}auth/jwt/create/`;

    const getJwt = async (data) =>{
        try{
            // JWTトークンを取得
            const response = await axios.post(apiURL,{
                email:data.email,
                password:data.password,
            });
            // useCookiesを用いて取得したトークンをCookieに保存
            setCookie('accessToken', response.data.access, { 
                path: '/',          // ドメイン全体でcookieを利用
                sameSite: 'strict'  // 同一サイトからのリクエストのみCookieを送信
                },
                { httpOnly: true }
            );
            setCookie('refreshToken', response.data.refresh, { 
                path: '/',
                sameSite: 'strict' 
                },
                { httpOnly: true }
            );
            
            // ユーザー情報を取得
            const userURL = `${API_USER_URL}user-search/?email=${data.email}`;
            console.log(userURL)
            
            const responseUser = await axios.get(userURL,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${response.data.access}`
                }
            });
            setCookie('userId', responseUser.data[0].id, { 
                path: '/',
                sameSite: 'strict' 
                },
                { httpOnly: true }
            );

            navigate('/');      // 指定したパスに遷移
        } catch(error){
            alert('メールアドレスまたはパスワードが間違っています。\n再度ご確認ください。');
            console.log(error)
        };
    };

    useEffect(() => {
        if(cookies.accessToken !== void 0){
            navigate('/')
        }
    },[])

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
                    <form onSubmit={handleSubmit(getJwt)}>
                        <TextField
                            label="メールアドレス"
                            fullWidth
                            margin="normal"
                            variant="standard"
                            {...register('email', { required: true })}
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
                        <Button variant="contained" sx={{backgroundColor: "#05a7be", mb:1}} type="submit">ログイン</Button>
                        <div>
                            <Button href="/signup" endIcon={<KeyboardArrowRightIcon />}>新規登録はこちら</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Container>
    </>
);
}

export default Login;
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();

    // ログアウト処理
    const handleLogout = async () =>{
        // トークンをCookieから削除
        removeCookie('accessToken',{path:'/'});
        removeCookie('refreshToken',{path:'/'});
        removeCookie('useId',{path:'/'});
        navigate('/login/');
    }
    
    return (
        <Button color="inherit" onClick={handleLogout}>ログアウト</Button>
    );
}
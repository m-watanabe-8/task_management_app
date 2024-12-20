import { Header } from "components/Header/Header";
import { SearchBar } from "components/SearchBar";
import { TaskAccordion } from "components/TaskAccordion";
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { Box, Stack, Typography } from '@mui/material';

const TaskSearch = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate()

    const task1List = [
        {id:"1",name: "タスク名1", content: "タスクの内容" ,category: "work",start_date: "2024/12/11",end_date: "2024/12/13"},
        {id:"2",name: "タスク名2", content: "タスクの内容",category: "",start_date: "2024/12/12",end_date: "2024/12/13"},
        {id:"3",name: "タスク名2", content: "タスクの内容",category: "go_out",start_date: "2024/12/12",end_date: "2024/12/13"},
        {id:"3",name: "タスク名2", content: "タスクの内容",category: "other",start_date: "2024/12/12",end_date: "2024/12/13"},
        {id:"3",name: "タスク名2", content: "タスクの内容",category: "meeting",start_date: "2024/12/12",end_date: "2024/12/13"},
        {id:"3",name: "タスク名2", content: "タスクの内容",category: "event",start_date: "2024/12/12",end_date: "2024/12/13"},
    ]

    useEffect(() => {
        if(cookies.accessToken === void 0){
            navigate('/login')
        }
    },[]);

    return (
        <>
        <Box sx={{ 
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: { xs: 'auto', md: 'hidden' } 
        }}>
            <Header />
            <Box sx={{ width: '100%' }}>
                <Box sx={{m:3}}>
                    <SearchBar />
                </Box>
                <Box 
                sx={{ 
                    m:3,
                    '--Grid-borderWidth': '2px',
                    border: 'var(--Grid-borderWidth) solid',
                    borderColor: '#c2d8e1',
                    borderRadius: '10px',
                    backgroundColor: "#FAFAFA"
                }}>
                    <Stack 
                    sx={{ 
                        // 画面サイズに応じて動作変更
                        flexGrow: { xs: 'unset', md: 1 },
                        // 縦並び時の高さ調整
                        minHeight: { xs: 'fit-content', md: 'calc(100vh - 250px)' },
                        flexDirection: { xs: 'column', md: 'row' },
                        maxWidth: '100vw',  
                        overflowX: 'auto', 
                    }}
                    >
                        {/* タスク */}
                        { [1,2,3,4,5,6].map((value) => 
                            <Box
                            key={value}
                            sx={{ 
                                height: { xs: 'auto', md: 'calc(100vh - 300px)' },
                                minWidth: { xs: 'auto', md: '20vw' },
                                flexShrink: 0,
                                mb: { xs: 2, md: 0 },
                                p: 3,
                            }}>
                                <Typography variant="h6" component="div">
                                    メンバー {value}
                                </Typography>
                                {/* メンバーのタスク(完了以外) */}
                                <Box size={12}
                                spacing={1}
                                sx={{
                                    maxHeight: 'calc(100vh - 330px)',  
                                    overflowY: 'auto',  
                                }}>
                                    <TaskAccordion 
                                        taskList={task1List}
                                        statusName={"進行中"}
                                        colorCode={"#1ed7cd"}
                                    />
                                    <TaskAccordion 
                                        taskList={task1List}
                                        statusName={"進行中"}
                                        colorCode={"#18c4b8"}
                                    />
                                </Box>
                            </Box>
                        )}
                    </Stack>
                </Box>
            </Box>
        </Box>
        </>
    );
}
export default TaskSearch;


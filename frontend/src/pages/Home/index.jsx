import { CreatingTaskButton } from "components/Button/CreatingTaskButton";
import { Header } from "components/Header/Header";
import { TaskAccordion } from "components/TaskAccordion";
import { useTaskList } from 'hooks/useTaskList';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';


const Home = () => {
    const {
        todayStatusTasks,
        doneTasks,
        specifiedTasks,
        isLoading,
        error,
        getTaskList,
        refreshTaskList
    } = useTaskList();

    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate()

    useEffect(() => {
        if(cookies.accessToken === void 0){
            navigate('/login')
        }
        getTaskList()
    },[getTaskList]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <Box 
        sx={{ 
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: { xs: 'auto', md: 'hidden' }  // 画面が小さくなった時のみスクロール可能
        }}
        >
            <Header />
            <Grid 
                container 
                spacing={3} 
                sx={{ 
                    m: 4,
                    // 画面サイズに応じて動作変更
                    flexGrow: { xs: 'unset', md: 1 },
                    overflow: { xs: 'visible', md: 'hidden' },
                    // 縦並び時の高さ調整
                    minHeight: { xs: 'fit-content', md: '100%' },
                    flexDirection: { xs: 'column', md: 'row' },
                }}
            >
                {/* 今日のタスク */}
                <Grid item 
                size={{ xs: 12, md: 6 }}
                sx={{ 
                    height: { xs: 'auto', md: 'calc(100vh - 100px)' },
                    overflow: 'hidden',
                    mb: { xs: 2, md: 0 }
                }}>
                    <Box display={"flex"} flexDirection={"row"} sx={{ mb:1 }} >
                        <Typography variant="h5" component="div" sx={{ mr:10 }}>
                            今日のタスク
                        </Typography>
                        <CreatingTaskButton 
                            onTaskUpdate={refreshTaskList}
                        />
                    </Box>
                    <Grid container 
                        spacing={2}
                        sx={{
                            '--Grid-borderWidth': '2px',
                            border: 'var(--Grid-borderWidth) solid',
                            borderColor: '#c2d8e1',
                            borderRadius: '10px',
                            p: 3,
                            backgroundColor: "#FAFAFA"
                        }}
                    >
                        {/* ステータスごと */}
                            <Grid item 
                            size={7} 
                            sx={{
                                maxHeight: 'calc(100vh - 240px)',  
                                overflowY: 'auto',  
                            }}>
                                {todayStatusTasks.map((statusTasks, index) => {
                                    return(
                                        <TaskAccordion
                                            key={index} 
                                            taskList={statusTasks.tasks}
                                            statusName={statusTasks.statusName}
                                            onTaskUpdate={refreshTaskList}
                                        />
                                        )
                                })}
                            </Grid>
                            {/* 完了 */}
                            <Grid item 
                            size={5}
                            sx={{
                                maxHeight: 'calc(100vh - 240px)',  
                                overflowY: 'auto',  
                            }}>
                                <TaskAccordion 
                                    taskList={doneTasks}
                                    statusName={"完了"}
                                    onTaskUpdate={refreshTaskList}
                                />
                            </Grid>
                            
                    </Grid>
                </Grid>
                {/* 明日以降のタスク */}
                <Grid item 
                    size={{ xs: 12, md: 6 }}
                    sx={{ 
                        height: { xs: 'auto', md: 'calc(100vh - 100px)' },
                        overflow: 'hidden'
                    }}>
                    <Typography variant="h5" component="div" sx={{ mb:1.5 }}>
                        明日以降のタスク
                    </Typography>
                    <Stack
                        sx={{
                        // 画面サイズに応じて動作変更
                        flexGrow: { xs: 'unset', md: 1 },
                        // 縦並び時の高さ調整
                        minHeight: { xs: 'fit-content', md: 'calc(100vh - 280px)' },
                        flexDirection: { xs: 'column', md: 'row' },
                        maxWidth: '100vw',  
                        overflowX: 'auto', 
                        
                        '--Grid-borderWidth': '2px',
                        border: 'var(--Grid-borderWidth) solid',                           
                        borderColor: '#c2d8e1',
                        borderRadius: '10px',
                        backgroundColor: "#FAFAFA"
                        }}
                    >
                        {/* 日付ごと */}
                        { specifiedTasks.map((dayTaskList, index) => {
                            return(
                                <Box
                                key={index}
                                spacing={2}
                                sx={{ 
                                    height: { xs: 'auto', md: 'calc(100vh - 235px)' },
                                    minWidth: { xs: 'auto', md: '20vw' },
                                    flexShrink: 0,
                                    mb: { xs: 2, md: 0 },
                                    p: 2
                                }}>
                                    <Typography variant="h7" component="div">
                                        {dayTaskList.taskDate}
                                    </Typography>
                                    <Box 
                                    size={12}
                                    sx={{
                                        maxHeight: 'calc(100vh - 250px)',  
                                        overflowY: 'auto',  
                                    }}>
                                        {dayTaskList.taskList.map((statusTasks, index) => {
                                        return(
                                            <TaskAccordion
                                                key={index} 
                                                taskList={statusTasks.tasks}
                                                statusName={statusTasks.statusName}
                                                onTaskUpdate={refreshTaskList}
                                            />
                                            )
                                        })}
                                    </Box>
                                </Box>
                            )
                        })}
                    </Stack>
                </Grid>
            </Grid>
        </Box>
        </>
    );
};

export default Home;
import axios from 'axios';
import { CreatingTaskButton } from "components/Button/CreatingTaskButton";
import { Header } from "components/Header/Header";
import { TaskAccordion } from "components/TaskAccordion";
import { API_AUTH_URL } from "configs/ApiRouteUrl";
import { useEffect, useState } from 'react';
import { getDayTaskList } from "utils/getDayTaskList";
import { getStatusTaskList } from "utils/getStatusTaskList";

import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';


const Home = () => {
    // サーバのURL
    const apiUrl = API_AUTH_URL;

    const today = new Date();
    const formatTodayYM = today.getFullYear() + '/' + (today.getMonth()+1);
    const formatTodayDate = today.getDate();

    const [todayTaskList, setTodayTaskList] = useState([]);
    const [specifiedTaskList, setSpecifiedTaskList] = useState([]);

    // ステータスごとのタスクリスト（今日）
    const [todayStatusTasks, setTodayStatusTasks] = useState([]); //完了以外のステータスごとで分けているタスク
    const [doneTasks, setDoneTasks] = useState([]);

    // 日付別ステータスで分割したタスクリスト（明日以降）
    const [specifiedTasks, setSpecifiedTasks] = useState([]);

    // 指定日検索用の日付取得
    const getFormatDay = (num) => {
        return today.getFullYear() + '-' + (today.getMonth()+1) + '-' + (today.getDate()+num);
    };
    
    // サーバとの連携処理
    // タスク一覧の取得（今日）
    const getTodayTaskList = async () => {
        const url = `${apiUrl}task-search/?search_type=today`;

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('本日日付のタスクが取得できませんでした。', error);
        }
    };

    // タスク一覧の取得（明日以降開始）
    const getSpecifiedTaskList = async () => {
        const formatDayStart = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + (today.getDate()+1);
        const formatDayEnd = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + (today.getDate()+5);
        const url = `${apiUrl}task-search/?search_type=specific_date&specific_date_start=${formatDayStart}&specific_date_end=${formatDayEnd}`;

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('明日以降のタスクが取得できませんでした。', error);
        }
    };


    // 一覧の値を取得
    const getTaskList = async() => {
        try {
            // 今日のタスクを取得
            const todayTasks = await getTodayTaskList();

            if (todayTasks && Array.isArray(todayTasks)) {
                setTodayTaskList(todayTasks);

                // ステータスで分割
                const statusTasks = getStatusTaskList(todayTasks);
                setTodayStatusTasks(statusTasks[0])
                setDoneTasks(statusTasks[1])
            }

            // 明日以降のタスクを取得
            const specifiedTasks = await getSpecifiedTaskList()

            if (specifiedTasks && Array.isArray(specifiedTasks)) {
                setSpecifiedTaskList(specifiedTasks);

                // 日付ごと
                const dayTasks = getDayTaskList(specifiedTasks)

                // 日付別でステータスで分割
                const statusTasks1 = getStatusTaskList(dayTasks[0]);
                const statusTasks2 = getStatusTaskList(dayTasks[1]);
                const statusTasks3 = getStatusTaskList(dayTasks[2]);
                const statusTasks4 = getStatusTaskList(dayTasks[3]);
                const statusTasks5 = getStatusTaskList(dayTasks[4]);

                const specifiedTaskList = [statusTasks1[0], statusTasks2[0], statusTasks3[0], statusTasks4[0], statusTasks5[0]]
                setSpecifiedTasks(specifiedTaskList)
            }

        } catch (error) {
            console.error('タスクの取得と振り分けに失敗しました。', error);
        }
    }

    useEffect(() => {
        getTaskList()
    },[]);

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
                    m: 5,
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
                        <CreatingTaskButton />
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
                        spacing={2}
                        sx={{
                            // 画面サイズに応じて動作変更
                        flexGrow: { xs: 'unset', md: 1 },
                        // 縦並び時の高さ調整
                        minHeight: { xs: 'fit-content', md: 'calc(100vh - 300px)' },
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
                                    height: { xs: 'auto', md: 'calc(100vh - 250px)' },
                                    minWidth: { xs: 'auto', md: '20vw' },
                                    flexShrink: 0,
                                    mb: { xs: 2, md: 0 },
                                    p: 2
                                }}>
                                    <Typography variant="h7" component="div">
                                        {formatTodayYM}/{formatTodayDate+index}
                                    </Typography>
                                    <Box 
                                    size={12}
                                    sx={{
                                        maxHeight: 'calc(100vh - 270px)',  
                                        overflowY: 'auto',  
                                    }}>
                                        {dayTaskList.map((statusTasks, index) => {
                                        return(
                                            <TaskAccordion
                                                key={index} 
                                                taskList={statusTasks.tasks}
                                                statusName={statusTasks.statusName}
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
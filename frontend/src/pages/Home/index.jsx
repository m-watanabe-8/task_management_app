import { Header } from "components/Header";
import { RegisterDialog } from "components/RegisterDialog";
import { TaskAccordion } from "components/TaskAccordion";
import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';


const Home = () => {
    const task1List = [
        {id:"1",name: "タスク名1", content: "タスクの内容" ,category: "カテゴリ1",start_date: "2024/12/11",end_date: "2024/12/13"},
        {id:"2",name: "タスク名2", content: "タスクの内容",category: "カテゴリ2",start_date: "2024/12/12",end_date: "2024/12/13"},
        {id:"3",name: "タスク名2", content: "タスクの内容",category: "カテゴリ2",start_date: "2024/12/12",end_date: "2024/12/13"},
    ]
    const task2List = [
        {id:"5",name: "タスク名3", content: "タスクの内容",category: "カテゴリ3",start_date: "2024/12/11",end_date: "2024/12/13"},
        {id:"6",name: "タスク名4", content: "タスクの内容",category: "カテゴリ4",start_date: "2024/12/11",end_date: "2024/12/13"},
    ]
    const endList = [
        {id:"7",name: "タスク名5", content: "タスクの内容",category: "カテゴリ5",start_date: "2024/12/11",end_date: "2024/12/12"},
        {id:"8",name: "タスク名6", content: "タスクの内容",category: "カテゴリ6",start_date: "2024/12/11",end_date: "2024/12/12"},
        {id:"9",name: "タスク名6", content: "タスクの内容",category: "カテゴリ6",start_date: "2024/12/11",end_date: "2024/12/12"},
        {id:"10",name: "タスク名6", content: "タスクの内容",category: "カテゴリ6",start_date: "2024/12/11",end_date: "2024/12/12"},
        {id:"11",name: "タスク名6", content: "タスクの内容",category: "カテゴリ6",start_date: "2024/12/11",end_date: "2024/12/12"},
    ]

    const [open, setOpen] = useState(false);
    const [targetTask, setTargetTask] = useState({});

    const handleOpen = (task) => {
        setTargetTask(task)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                xs={12} 
                md={6} 
                sx={{ 
                    height: { xs: 'auto', md: '100%' },
                    overflow: 'hidden',
                    mb: { xs: 2, md: 0 }
                }}>
                    <Grid container 
                        spacing={2}
                        sx={{
                            '--Grid-borderWidth': '2px',
                            border: 'var(--Grid-borderWidth) solid',
                            borderColor: '#c2d8e1',
                            borderRadius: '10px',
                            p: 3,
                        }}
                    >
                        <Grid item size={10} sx={{ mb: 2 }}>
                            <Typography variant="h5" component="div">
                                今日のタスク
                            </Typography>
                        </Grid>
                        <Grid item size={2} sx={{ mb: 2 }}>
                            <Button variant="contained" sx={{backgroundColor: "#05a7be"}} onClick={() => handleOpen({})}>
                                <AddIcon fontSize='medium'/>
                                新規作成
                            </Button>
                            <RegisterDialog 
                                open={open} 
                                handleClose={handleClose} 
                                task={targetTask}
                            />
                        </Grid>
                        {/* ステータスごと */}
                        <Grid item 
                        size={7} 
                        sx={{
                            maxHeight: '80vh',  
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
                            <TaskAccordion 
                                taskList={task1List}
                                statusName={"進行中"}
                                colorCode={"#05a7be"}
                            />
                            <TaskAccordion 
                                taskList={task2List}
                                statusName={"未着手"}
                                colorCode={"#087ea2"}
                            />
                            <TaskAccordion 
                                taskList={task1List}
                                statusName={"進行中"}
                                colorCode={"#005873"}
                            />
                        </Grid>
                        {/* 完了 */}
                        <Grid item 
                        size={5}
                        sx={{
                            maxHeight: '80vh',  
                            overflowY: 'auto',  
                        }}>
                            <TaskAccordion 
                                taskList={endList}
                                statusName={"完了"}
                                colorCode={"#8c9cb2"}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                {/* 明日以降のタスク */}
                <Grid item 
                    xs={12}
                    md={6} 
                    sx={{ 
                        height: { xs: 'auto', md: '100%' },
                        overflow: 'hidden'
                    }}>
                    <Grid container 
                        spacing={2}
                        sx={{
                            '--Grid-borderWidth': '2px',
                            border: 'var(--Grid-borderWidth) solid',                           
                            borderColor: '#c2d8e1',
                            borderRadius: '10px',
                            p: 3,
                        }}
                    >
                        <Grid item size={12} sx={{ mb: 2 }}>
                            <Typography variant="h5" component="div">
                                明日以降のタスク
                            </Typography>
                        </Grid>
                        {/* ステータスごと */}
                        <Grid item 
                        size={6} 
                        sx={{
                            maxHeight: '80vh',  
                            overflowY: 'auto',  
                        }}>
                            <Typography variant="h7" component="div">
                                2024/12/15開始
                            </Typography>
                            <TaskAccordion 
                                taskList={task1List}
                                statusName={"進行中"}
                                colorCode={"#1ed7cd"}
                            />
                            <TaskAccordion 
                                taskList={task2List}
                                statusName={"未着手"}
                                colorCode={"#18c4b8"}
                            />
                        </Grid>
                        <Grid item 
                        size={6}
                        sx={{
                            maxHeight: '80vh',  
                            overflowY: 'auto',  
                        }}>
                            <Typography variant="h7" component="div">
                                2024/12/16開始
                            </Typography>
                            <TaskAccordion 
                                taskList={task1List}
                                statusName={"進行中"}
                                colorCode={"#1ed7cd"}
                            />
                            <TaskAccordion 
                                taskList={task2List}
                                statusName={"未着手"}
                                colorCode={"#18c4b8"}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}

export default Home;
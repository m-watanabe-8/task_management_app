import { Header } from "components/Header";
import { RegisterDialog } from "components/RegisterDialog";
import { TaskAccordion } from "components/TaskAccordion";
import { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';


const Home = () => {
    const allTaskList = [
        {id:"1",name: "進行中1", content: "タスクの内容" ,category: "カテゴリ1",start_date: "2024/12/11",end_date: "2024/12/13",status:"doing", isDone:0},
        {id:"2",name: "進行中2", content: "タスクの内容",category: "カテゴリ2",start_date: "2024/12/12",end_date: "2024/12/13",status:"doing", isDone:0},
        {id:"3",name: "未着手3", content: "タスクの内容",category: "カテゴリ2",start_date: "2024/12/12",end_date: "2024/12/13",status:"todo", isDone:0},
        {id:"4",name: "未着手4", content: "タスクの内容",category: "カテゴリ3",start_date: "2024/12/11",end_date: "2024/12/13",status:"todo", isDone:0},
        {id:"5",name: "未定1", content: "タスクの内容",category: "カテゴリ4",start_date: "2024/12/11",end_date: "2024/12/13",status:"undecided", isDone:0},
        {id:"6",name: "完了1", content: "タスクの内容",category: "カテゴリ4",start_date: "2024/12/11",end_date: "2024/12/13",status:"undecided", isDone:1},
    ]

    const doneTaskList = []
    const doingTaskList = []
    const todoTaskList = []
    const undecidedTaskList = []
    let isLoding = false

    const [open, setOpen] = useState(false);
    const [targetTask, setTargetTask] = useState({});

    const handleOpen = (task) => {
        setTargetTask(task)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if(isLoding === true){
            return
        }
        allTaskList.forEach((task) => {
            if(task.isDone === 1){
                doneTaskList.push(task)
            }
            else if(task.status === "doing"){
                doingTaskList.push(task)
            }
            else if(task.status === "todo"){
                todoTaskList.push(task)
            }
            else{
                undecidedTaskList.push(task)
            }
        })
        isLoding = true
    },[])

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
                    height: { xs: 'auto', md: 'calc(100% - 64px)' },
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
                            <Grid item size={5} sx={{ mb: 2 }}>
                                <Typography variant="h5" component="div">
                                    今日のタスク
                                </Typography>
                            </Grid>
                            <Grid item
                            size={7} 
                            sx={{ mb: 2 }}
                            >
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
                                taskList={doingTaskList}
                                statusName={"進行中"}
                                colorCode={"#1ed7cd"}
                            />
                            <TaskAccordion 
                                taskList={todoTaskList}
                                statusName={"未着手"}
                                colorCode={"#05a7be"}
                            />
                            <TaskAccordion 
                                taskList={undecidedTaskList}
                                statusName={"未定"}
                                colorCode={"#087ea2"}
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
                                taskList={doneTaskList}
                                statusName={"完了"}
                                colorCode={"#8c9cb2"}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                {/* 明日以降のタスク */}
                <Grid item 
                    size={{ xs: 12, md: 6 }}
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
                            {/* <TaskAccordion 
                                taskList={allTaskList}
                                statusName={"進行中"}
                                colorCode={"#1ed7cd"}
                            />
                            <TaskAccordion 
                                taskList={allTaskList}
                                statusName={"未着手"}
                                colorCode={"#18c4b8"}
                            /> */}
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
                            {/* <TaskAccordion 
                                taskList={allTaskList}
                                statusName={"進行中"}
                                colorCode={"#1ed7cd"}
                            />
                            <TaskAccordion 
                                taskList={allTaskList}
                                statusName={"未着手"}
                                colorCode={"#18c4b8"}
                            /> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}

export default Home;
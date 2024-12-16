import { Header } from "components/Header";
import { SearchBar } from "components/SearchBar";
import { TaskAccordion } from "components/TaskAccordion";

import { Box, Stack, Typography } from '@mui/material';

const TaskSearch = () => {
    const task1List = [
        {id:"1",name: "タスク名1", content: "タスクの内容" ,category: "カテゴリ1",start_date: "2024/12/11",end_date: "2024/12/13"},
        {id:"2",name: "タスク名2", content: "タスクの内容",category: "カテゴリ2",start_date: "2024/12/12",end_date: "2024/12/13"},
        {id:"3",name: "タスク名2", content: "タスクの内容",category: "カテゴリ2",start_date: "2024/12/12",end_date: "2024/12/13"},
        {id:"3",name: "タスク名2", content: "タスクの内容",category: "カテゴリ2",start_date: "2024/12/12",end_date: "2024/12/13"},
        {id:"3",name: "タスク名2", content: "タスクの内容",category: "カテゴリ2",start_date: "2024/12/12",end_date: "2024/12/13"},
        {id:"3",name: "タスク名2", content: "タスクの内容",category: "カテゴリ2",start_date: "2024/12/12",end_date: "2024/12/13"},
    ]


    return (
        <>
        <Box sx={{ 
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: { xs: 'auto', lg: 'hidden' } 
        }}>
            <Header />
            <Box sx={{ width: '100%' }}>
                <Box sx={{m:5}}>
                    <SearchBar />
                </Box>
                <Box 
                sx={{ 
                    m:5,
                    '--Grid-borderWidth': '2px',
                    border: 'var(--Grid-borderWidth) solid',
                    borderColor: '#c2d8e1',
                    borderRadius: '10px',
                }}>
                    <Typography variant="h5" component="div">
                        20XX/XX/XX
                    </Typography>
                    <Stack 
                    sx={{ 
                        // 画面サイズに応じて動作変更
                        flexGrow: { xs: 'unset', lg: 1 },
                        // 縦並び時の高さ調整
                        minHeight: { xs: 'fit-content', lg: '100%' },
                        flexDirection: { xs: 'column', lg: 'row' },
                        maxWidth: '100vw',  
                        overflowX: 'auto', 
                        gap: 2
                    }}
                    >
                        {/* タスク */}
                        { [1,2,3,4,5,6].map((value) => 
                            <Box
                            key={value}
                            spacing={2}
                            sx={{ 
                                height: { xs: 'auto', lg: '100%' },
                                minWidth: { xs: 'auto', lg: '20vw' },
                                flexShrink: 0,
                                mb: { xs: 2, lg: 0 },
                                p: 3,
                            }}>
                                <Typography variant="h5" component="div">
                                    メンバー {value}
                                </Typography>
                                {/* メンバーのタスク(完了以外) */}
                                <Box size={12}
                                spacing={1}
                                sx={{
                                    maxHeight: '70vh',  
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


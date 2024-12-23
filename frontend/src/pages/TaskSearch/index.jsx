import { Header } from "components/Header/Header";
import { SearchBar } from "components/SearchBar";
import { TaskAccordion } from "components/TaskAccordion";
import { useMemberTaskList } from 'hooks/useMemberTaskList';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


import { Box, Stack, Typography } from '@mui/material';

const TaskSearch = () => {
    const {
        memberTaskList,
        memberList,
        isLoading,
        error,
        getMemberTaskList,
        refreshTaskList
    } = useMemberTaskList();
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate()

    const [filteredData, setFilteredData] = useState(memberTaskList);

    // 検索用のフィルタリング関数
    const onSearch = (searchTerm, checkedList) => {
        if (!searchTerm && !checkedList) {
            setFilteredData(memberTaskList); // 検索がない場合はすべてのデータを表示
        } else {
            // 検索
            const filteredSearch = memberTaskList.map(userData => ({
                ...userData,
                taskList: userData.taskList.map(taskData => ({
                    ...taskData,
                    tasks: taskData.tasks.filter(task =>
                        task.title.includes(searchTerm) // タスク名で検索
                    )
                }))
            }))
            // 絞り込み
            const filtered = filteredSearch.filter(userData => (
                checkedList.some(member => member.isChecked && userData.user === member.name)
            ))
            setFilteredData(filtered);
        }
    };

    useEffect(() => {
        if(cookies.accessToken === void 0){
            navigate('/login')
        }
        getMemberTaskList();
    },[getMemberTaskList]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

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
                    <SearchBar 
                    onSearch={onSearch}
                    memberList={memberList}
                    />
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
                        {filteredData.map((userTask,index) => (
                            <Box
                            key={index}
                            sx={{ 
                                height: { xs: 'auto', md: 'calc(100vh - 300px)' },
                                minWidth: { xs: 'auto', md: '20vw' },
                                flexShrink: 0,
                                mb: { xs: 2, md: 0 },
                                p: 3,
                            }}>
                                <Typography variant="h6" component="div">{userTask.user}</Typography>
                                <Box size={12}
                                spacing={1}
                                sx={{
                                    maxHeight: 'calc(100vh - 330px)',  
                                    overflowY: 'auto',  
                                }}>
                                    {userTask.taskList.map((tasks, index) => (
                                        <TaskAccordion 
                                            key={index}
                                            taskList={tasks.tasks}
                                            statusName={tasks.statusName}
                                            onTaskUpdate={refreshTaskList}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Box>
        </>
    );
}
export default TaskSearch;

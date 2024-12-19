import { RegisterDialog } from "components/RegisterDialog";
import { useState } from 'react';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Typography
} from '@mui/material';


export function TaskCard({taskList, onTaskUpdate}) {
    // categoryの値で背景色を変える
    const getCategoryColor = (category) => {
        switch (category) {
            case 'work':
                return '#ffd803';
            case 'meeting':
                return '#b8c1ec';
            case 'go_out':
                return '#abd1c6';
            case 'event':
                return '#faae2b';
            case 'other':
                return '#e3f6f5';
            default:
                return '#ffffff'; // デフォルトの背景色
        }
    };

    const getCategoryName = (category) => {
        switch (category) {
            case 'work':
                return '作業';
            case 'meeting':
                return '会議・打ち合わせ';
            case 'go_out':
                return '外出';
            case 'event':
                return 'イベント';
            case 'other':
                return 'その他';
            default:
                return ''; // デフォルトの背景色
        }
    };

    const [open, setOpen] = useState(false);
    const [targetTask, setTargetTask] = useState({});

    const handleOpen = (task) => {
        setTargetTask(task);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            {taskList && taskList.map((task,index) => {
                return(
                    <Card variant="outlined" key={task.id} sx={{ mb: 1 }}>
                        <CardHeader
                            action={
                                <IconButton aria-label="settings" onClick={() => handleOpen(task)}>
                                    <MoreHorizIcon fontSize='medium'/>
                                </IconButton>
                            }
                            title={task.title}
                            subheader={getCategoryName(task.category)}
                            titleTypographyProps={{ variant: "h6" }}
                            subheaderTypographyProps={{ fontSize: "15px" }}
                            sx={{
                                backgroundColor: getCategoryColor(task.category)
                            }}
                        />
                        <CardContent>
                            <Typography variant="body2">
                                {task.start_date} ～ {task.end_date}
                            </Typography>
                        </CardContent>
                    </Card>
                )})
            }
            <RegisterDialog 
                open={open} 
                handleClose={handleClose} 
                task={targetTask}
                onTaskUpdate={onTaskUpdate}
            />
        </> 
    )
}
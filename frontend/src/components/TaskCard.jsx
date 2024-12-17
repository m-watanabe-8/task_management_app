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


export function TaskCard({taskList}) {
    
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
            {taskList.length > 0 && taskList.map((task,index) => {
                return(
                    <Card variant="outlined" key={task.id} sx={{ mb: 1 }}>
                        <CardHeader
                            action={
                                <IconButton aria-label="settings" onClick={() => handleOpen(task)}>
                                    <MoreHorizIcon fontSize='medium'/>
                                </IconButton>
                            }
                            title={task.name}
                            subheader={task.category}
                            sx={{fontSize:"12px"}}
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
            />
        </> 
    )
}
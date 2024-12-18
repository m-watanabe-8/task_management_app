import { RegisterDialog } from "components/RegisterDialog";
import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';


export function CreatingTaskButton() {
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
        <Button 
        variant="contained" 
        sx={{backgroundColor: "#05a7be"}} 
        onClick={() => handleOpen({})}
        >
            <AddIcon fontSize='medium'/>
            新規作成
        </Button>
        <RegisterDialog 
            open={open} 
            handleClose={handleClose} 
            task={targetTask}
        />
    </>
    )
}
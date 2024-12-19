import { TaskCard } from "components/TaskCard";

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';


export function TaskAccordion({taskList, statusName, onTaskUpdate}) {
    // statusの値で背景色を変える
    const getStatusColor = (status) => {
        switch (status) {
            case '進行中':
                return '#1ed7cd';
            case '未着手':
                return '#05a7be';
            case '未定':
                return '#087ea2';
            case '完了':
                return '#8c9cb2';
            default:
                return '#ffffff'; // デフォルトの背景色
        }
    };
    
    return (
        <Accordion 
        defaultExpanded 
        square 
        sx={{
            '--Grid-borderWidth': '1px',
            border: 'var(--Grid-borderWidth) solid',
            borderColor: getStatusColor(statusName),
        }}>
            <AccordionSummary
            expandIcon={<ExpandMoreRoundedIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{backgroundColor:getStatusColor(statusName)}}
            >
                <Typography sx={{ flexShrink: 0, color: "#ffffff", fontWeight: "bold"}}>{`${statusName}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TaskCard 
                    taskList={taskList}
                    onTaskUpdate={onTaskUpdate}
                />
            </AccordionDetails>
        </Accordion>
    )
}
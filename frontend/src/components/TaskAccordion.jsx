import { TaskCard } from "components/TaskCard";

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';


export function TaskAccordion({taskList, statusName, colorCode}) {
    
    return (
        <Accordion 
        defaultExpanded 
        square 
        sx={{
            '--Grid-borderWidth': '1px',
            border: 'var(--Grid-borderWidth) solid',
            borderColor: colorCode,
        }}>
            <AccordionSummary
            expandIcon={<ExpandMoreRoundedIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{backgroundColor:colorCode}}
            >
                <Typography sx={{ flexShrink: 0, color: "#ffffff", fontWeight: "bold"}}>{`${statusName}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TaskCard 
                    taskList={taskList}
                />
            </AccordionDetails>
        </Accordion>
    )
}
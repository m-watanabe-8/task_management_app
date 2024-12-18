import { useState } from "react";

import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Controller, useForm } from "react-hook-form";

export function RegisterDialog({open, handleClose, task}) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const categories = ["work", "meeting", "go_out", "event", "other"]

    const onSubmit = (data) => {
        console.log({id:task.id, ...data});
        handleClose();
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>タスクの編集</DialogTitle>
                <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="タイトル"
                        defaultValue={task.title}
                        variant="outlined"
                        margin="normal"
                        {...register('title', { required: 'タイトルは必須です' })}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <TextField
                        fullWidth
                        label="内容"
                        defaultValue={task.content}
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={4}
                        {...register('content')}
                        error={!!errors.content}
                        helperText={errors.content?.message}
                    />
                    <Controller
                        name="start_date"
                        control={control}
                        defaultValue={dayjs(task.start_date)}
                        rules={{ required: '開始日は必須です' }}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                fullWidth
                                label="開始日"
                                onChange={(newValue) => {
                                    field.onChange(newValue);
                                    console.log(task);
                                    setStartDate(newValue);
                                }}
                                variant="outlined"
                                margin="normal"
                                error={!!errors.start_date}
                                helperText={errors.start_date?.message}
                            />
                        )}
                    />
                    <Controller
                        name="end_date"
                        control={control}
                        defaultValue={dayjs(task.end_date)}
                        rules={{ required: '終了日は必須です' }}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                fullWidth
                                label="終了日"
                                onChange={(newValue) => {
                                    field.onChange(newValue);
                                    console.log(task);
                                    setEndDate(newValue);
                                }}
                                variant="outlined"
                                margin="normal"
                                error={!!errors.end_date}
                                helperText={errors.end_date?.message}
                            />
                        )}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>カテゴリ</InputLabel>
                        <Select
                        defaultValue={task.category}
                        label="カテゴリ"
                        {...register('category')}
                        >
                            {categories.map((category, index) => (
                                <MenuItem key={index} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.category && <p style={{ color: 'red' }}>{errors.category.message}</p>}
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>ステータス</InputLabel>
                        <Select
                        defaultValue={task.status}
                        label="ステータス"
                        {...register('status', { required: 'ステータスは必須です' })}
                        >
                            <MenuItem value='todo'>未着手</MenuItem>
                            <MenuItem value='doing'>進行中</MenuItem>
                            <MenuItem value='undecided'>未定</MenuItem>
                        </Select>
                        {errors.status && <p style={{ color: 'red' }}>{errors.status.message}</p>}
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <FormControlLabel 
                        control={<Checkbox />} 
                        checked= {task.is_done} 
                        label="完了" 
                        {...register('isDone')}/>
                        {errors.status && <p style={{ color: 'red' }}>{errors.status.message}</p>}
                    </FormControl>
                    
                </form>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" sx={{backgroundColor: "#8c9cb2"}} onClick={handleClose} >キャンセル</Button>
                    <Button variant="contained" sx={{backgroundColor: "#05a7be"}} onClick={handleSubmit(onSubmit)}>登録</Button>
                </DialogActions>
            </Dialog>
        </DemoContainer>
        </LocalizationProvider>
    )
}
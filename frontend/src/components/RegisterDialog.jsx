import axios from 'axios';
import { DeleteDialog } from "components/DeleteDialog";
import { API_AUTH_URL } from "configs/ApiRouteUrl";
import dayjs from 'dayjs';
import { useState } from "react";
import { useCookies } from 'react-cookie';
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


export function RegisterDialog({open, handleClose, task, onTaskUpdate}) {
    // サーバのURL
    const url = `${API_AUTH_URL}task/`;

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()
    const [cookies] = useCookies(['accessToken']);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [openDel, setOpenDel] = useState(false);


    const onSubmit = async (data) => {
        // 日付を成形
        const formatStartDate = data.start_date.year() + '-' + (data.start_date.month()+1) + '-' + (data.start_date.date());
        const formatEndDate = data.end_date.year() + '-' + (data.end_date.month()+1) + '-' + (data.end_date.date());
        data.start_date = formatStartDate;
        data.end_date = formatEndDate;

        try {
            if(Object.keys(task).length === 0){
                // 新規作成
                await axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${cookies.accessToken}`
                    }
                });
            } else {
                // 更新
                await axios.patch(`${url}${task.id}/`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${cookies.accessToken}`
                    }
                });
            }
            await onTaskUpdate();  // タスクの作成/更新後にリストを更新
            handleClose();
        } catch (error) {
            alert('操作に失敗しました。');
            console.log(error)
        }
    };

    const deleteTask = async() => {
        try {
            await axios.delete(`${url}${task.id}/`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${cookies.accessToken}`
                }
            });
            await onTaskUpdate();
            handleCloseDel();
            handleClose();
        } catch (error) {
            alert('削除に失敗しました。');
            console.log(error)

        }
    }

    // 削除ダイアログ
    const handleOpenDel = () => {
        setOpenDel(true)
    }
    const handleCloseDel = () => {
        setOpenDel(false)
    }


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{Object.keys(task).length === 0 ? "タスクの作成" : "タスクの編集"}</DialogTitle>
                <DialogContent>
                
                {task.user === cookies.userId ? (
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
                            aria-invalid={errors.title ? "true" : "false"}
                        />
                        <TextField
                            fullWidth
                            label="内容"
                            defaultValue={task.content}
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={4}
                            {...register('content', { required: false })}
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
                                    format="YYYY/MM/DD"
                                    onChange={(newValue) => {
                                        field.onChange(newValue);
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
                                    format="YYYY/MM/DD"
                                    onChange={(newValue) => {
                                        field.onChange(newValue);
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
                                <MenuItem value='work'>作業</MenuItem>
                                <MenuItem value='meeting'>会議・打ち合わせ</MenuItem>
                                <MenuItem value='go_out'>外出</MenuItem>
                                <MenuItem value='event'>イベント</MenuItem>
                                <MenuItem value='other'>その他</MenuItem>
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
                            <Controller
                                name="is_done" 
                                control={control} 
                                defaultValue={task.is_done}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Checkbox {...field} checked={field.value} />}
                                        label="完了"
                                    />
                                )}
                            />
                            {errors.status && <p style={{ color: 'red' }}>{errors.status.message}</p>}
                        </FormControl>
                    </form>
                ) : (
                    <>
                        
                        <FormGroup>
                            <FormControlLabel 
                            disabled 
                            control={<Checkbox />} 
                            label="完了" 
                            checked={task.is_done}
                            />
                        </FormGroup>
                    </>
                )}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" sx={{backgroundColor: "#05a7be"}} onClick={handleSubmit(onSubmit)}>登録</Button>
                    <Button variant="contained" sx={{backgroundColor: "#8c9cb2"}} onClick={handleClose} >キャンセル</Button>
                    <Button variant="contained" sx={{backgroundColor: "#1f7a6a"}} onClick={handleOpenDel}>削除</Button>
                </DialogActions>
            </Dialog>
            <DeleteDialog
                openDel={openDel}
                handleCloseDel={handleCloseDel}
                deleteTask={deleteTask}
            />
        </DemoContainer>
        </LocalizationProvider>
    )
}
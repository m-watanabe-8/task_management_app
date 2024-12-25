import axios from 'axios';
import { DeleteDialog } from "components/DeleteDialog";
import { API_AUTH_URL } from "configs/ApiRouteUrl";
import dayjs from 'dayjs';
import { useState } from "react";
import { useCookies } from 'react-cookie';
import { Controller, useForm } from "react-hook-form";

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
    TextField,
    Typography
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


export function RegisterDialog({open, handleClose, task, onTaskUpdate, isNew}) {
    // サーバのURL
    const url = `${API_AUTH_URL}task/`;

    const { register,handleSubmit,getValues,control,formState: { errors }, reset } = useForm()

    const [cookies, setCookie, removeCookie] = useCookies();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [openDel, setOpenDel] = useState(false);
    const userId = cookies.userId


    // タスク登録
    const onSubmit = async (data) => {
        // 日付を成形
        const formatStartDate = data.start_date.year() + '-' + (data.start_date.month()+1) + '-' + (data.start_date.date());
        const formatEndDate = data.end_date.year() + '-' + (data.end_date.month()+1) + '-' + (data.end_date.date());
        data.start_date = formatStartDate;
        data.end_date = formatEndDate;

        data.user = userId

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

    // タスク削除
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

    // キャンセルボタンかダイアログ外をクリックした時の処理
    const clickClose = () => {
        handleClose();
        // 編集内容をリセット
        reset();
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
                onClose={clickClose}
            >
                <DialogTitle>{Object.keys(task).length === 0 ? "タスクの作成" : "タスクの編集"}</DialogTitle>
                <DialogContent>
                    {/* 自分以外のタスクは編集できない */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            fullWidth
                            label="タイトル"
                            defaultValue={task.title}
                            variant="outlined"
                            margin="normal"
                            {...register('title', { 
                                required: 'タイトルは必須です',
                                maxLength: {
                                    value: 100,
                                    message: '最大100文字です'
                                },
                            })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                            aria-invalid={errors.title ? "true" : "false"}
                            slotProps={{
                                input: {
                                    readOnly: !(task.user === userId || isNew)
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="内容"
                            defaultValue={task.content}
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={4}
                            {...register('content', { 
                                required: '内容は必須です',
                                maxLength: {
                                    value: 500,
                                    message: '最大500文字です'
                                },
                            })}
                            error={!!errors.content}
                            helperText={errors.content?.message}
                            slotProps={{
                                input: {
                                    readOnly: !(task.user === userId || isNew)
                                },
                            }}
                        />
                        <section style={{marginTop:"16px", marginBottom:"8px"}}>
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
                                        disabled={!(task.user === userId || isNew)}
                                    />
                                )}
                            />
                            <Typography  color="error" sx={{ fontSize: '12px' }}>
                                　{errors.start_date?.message}
                            </Typography>
                        </section>
                        <section style={{marginBottom:"8px"}}>
                            <Controller
                                name="end_date"
                                control={control}
                                defaultValue={dayjs(task.end_date)}
                                rules={{ 
                                    required: '終了日は必須です',
                                    validate: (v) => {
                                        return v >= getValues("start_date") ? null : '終了日は開始日より後の日付を指定してください'
                                    }
                                }}
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
                                        disabled={!(task.user === userId || isNew)}
                                    />
                                )}
                            />
                            <Typography  color="error" sx={{ fontSize: '12px' }}>
                                    　{errors.end_date?.message}
                            </Typography>
                        </section>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>カテゴリ</InputLabel>
                            <Select
                            defaultValue={task.category || 'work'}
                            label="カテゴリ"
                            {...register('category', { required: 'カテゴリは必須です' })}
                            disabled={!(task.user === userId || isNew)}
                            error={!!errors.category}
                            >
                                <MenuItem value='work'>作業</MenuItem>
                                <MenuItem value='meeting'>会議・打ち合わせ</MenuItem>
                                <MenuItem value='go_out'>外出</MenuItem>
                                <MenuItem value='event'>イベント</MenuItem>
                                <MenuItem value='other'>その他</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>ステータス</InputLabel>
                            <Select
                            defaultValue={task.status || 'todo'}
                            label="ステータス"
                            {...register('status', { required: 'ステータスは必須です' })}
                            disabled={!(task.user === userId || isNew)}
                            error={!!errors.status}
                            >
                                <MenuItem value='todo'>未着手</MenuItem>
                                <MenuItem value='doing'>進行中</MenuItem>
                                <MenuItem value='undecided'>未定</MenuItem>
                            </Select>
                        </FormControl>
                        { !isNew ? (
                            <FormControl fullWidth margin="normal">
                                <Controller
                                    name="is_done" 
                                    control={control} 
                                    defaultValue={task.is_done}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            control={<Checkbox {...field} checked={field.value} />}
                                            label="完了"
                                            disabled={!(task.user === userId || isNew)}
                                        />
                                    )}
                                />
                            </FormControl>
                        ) : null}
                    </form>
                </DialogContent>
                <DialogActions>
                    {task.user === userId ? (
                        <>
                            <Button variant="contained" sx={{backgroundColor: "#05a7be"}} onClick={handleSubmit(onSubmit)}>登録</Button>
                            <Button variant="contained" sx={{backgroundColor: "#e45f2b"}} onClick={handleOpenDel}>削除</Button>
                        </>
                    ) : isNew ? (
                            <Button variant="contained" sx={{backgroundColor: "#05a7be"}} onClick={handleSubmit(onSubmit)}>登録</Button>
                        ) : null
                    }
                    <Button variant="contained" sx={{backgroundColor: "#8c9cb2"}} onClick={clickClose} >キャンセル</Button>
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
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material';
import { useForm } from "react-hook-form";

export function RegisterDialog({open, handleClose, task}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const convertDateFormat = (date) => {
        if(date){
            // yyyy/MM/dd形式の日付を変換
            const [year, month, day] = date.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
    }

    const categories = ["カテゴリ1", "カテゴリ2", "カテゴリ3"]
    const start_date = convertDateFormat(task.start_date)
    const end_date = convertDateFormat(task.end_date)

    const onSubmit = (data) => {
        console.log({id:task.id, ...data});
        handleClose();
    };

    return (
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
                    defaultValue={task.name}
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
                <TextField
                    fullWidth
                    label="開始日"
                    defaultValue={start_date}
                    variant="outlined"
                    margin="normal"
                    type="date"
                    {...register('start_date', { required: '開始日は必須です' })}
                    error={!!errors.start_date}
                    helperText={errors.start_date?.message}
                />
                <TextField
                    fullWidth
                    label="終了日"
                    defaultValue={end_date}
                    variant="outlined"
                    margin="normal"
                    type="date"
                    {...register('end_date', { required: '終了日は必須です' })}
                    error={!!errors.end_date}
                    helperText={errors.end_date?.message}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>カテゴリ</InputLabel>
                    <Select
                    defaultValue={task.category}
                    label="カテゴリ"
                    {...register('category', { required: 'カテゴリは必須です' })}
                    >
                        {categories.map((category, index) => (
                            <MenuItem key={index} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.category && <p style={{ color: 'red' }}>{errors.category.message}</p>}
                </FormControl>
            </form>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" sx={{backgroundColor: "#8c9cb2"}} onClick={handleClose} >キャンセル</Button>
                <Button variant="contained" sx={{backgroundColor: "#05a7be"}} onClick={handleSubmit(onSubmit)}>登録</Button>
            </DialogActions>
        </Dialog>
    )
}
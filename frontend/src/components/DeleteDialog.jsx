import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function DeleteDialog(props) {
    return(
        <Dialog
            open={props.openDel}
            keepMounted
            onClose={props.handleCloseDel}
            aria-describedby="alert-dialog-slide-description"
            sx={{
                zIndex: (theme) => theme.zIndex.modal + 1, // 削除ダイアログのz-indexを編集ダイアログより上に設定
            }}
            >
            <DialogTitle>{"削除しますか？"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    削除した場合、元には戻せません。
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleCloseDel}>キャンセル</Button>
                <Button onClick={props.deleteTask}>OK</Button>
            </DialogActions>
        </Dialog>
    )
}
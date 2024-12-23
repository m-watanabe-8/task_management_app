import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import SearchIcon from '@mui/icons-material/Search';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    TextField,
    Typography
} from '@mui/material';

import { useEffect, useState } from 'react';

export function SearchBar({ onSearch, memberList }) {

    const [searchTerm, setSearchTerm] = useState('');
    const [checkedList, setCheckedList] = useState([]);
    
    // 検索値の変更
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // 入力テキストで検索、チェックで絞り込み
    const handleSubmit = () => {
        onSearch(searchTerm, checkedList);
    };

    useEffect(() => {
        onSearch(searchTerm);

        // チェックリスト
        setCheckedList(
            memberList.map((member, index) => ({
                id: index,
                name: member,
                isChecked: true
            }))
        );
    },[]);


    // 親チェックボックスの状態管理
    const [parentChecked, setParentChecked] = useState(false);
    const [isIndeterminate, setIsIndeterminate] = useState(false);

    const handleChangeParent = (e) => {
        setParentChecked(e.target.checked);
        setCheckedList(prevList => 
            prevList.map(item => ({
                ...item,
                isChecked: e.target.checked
            }))
        );
    };

    // 子チェックボックスの状態変更
    const handleChangeChildren = (e, index) => {
        setCheckedList(prevList =>
            prevList.map((check) => 
                check.id === index ? {...check, isChecked: e.target.checked} : check
            )
        );
    };

    // 子チェックボックスの状態が変更されたときに親の状態を更新
    useEffect(() => {
        const checkedCount = checkedList.filter(item => item.isChecked).length;
        const totalCount = checkedList.length;

        if (checkedCount === 0) {
            // チェックなし
            setParentChecked(false);
            setIsIndeterminate(false);
        } else if (checkedCount === totalCount) {
            // 全てチェック
            setParentChecked(true);
            setIsIndeterminate(false);
        } else {
            // 一部チェック
            setParentChecked(false);
            setIsIndeterminate(true);
        }
    }, [checkedList]);

    // 絞り込み条件の子要素
    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            {checkedList.map((member,index) => {
                return(
                    <FormControlLabel
                        key={member.id}
                        label={member.name}
                        control={
                            <Checkbox 
                                checked={checkedList[index].isChecked} 
                                onChange={(e) => handleChangeChildren(e, index)} 
                            />
                        }
                    />
                )
            })}
        </Box>
    );

    return(
        <Box sx={{ mb:1, ml:1, }}>
            <Box display={'flex'} alignItems={"center"} sx={{ mb:1 }}>
                <TextField
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder="検索..."
                    variant="outlined"
                    sx={{ mr:1 }}
                    // 入力言語の設定を追加
                    slotProps={{
                        style: { 
                            ime: 'auto',  // IMEの自動制御
                        },
                    }}
                />
                <Button 
                        variant="contained" 
                        sx={{
                            backgroundColor: "#05a7be",
                            height: 50,
                        }} 
                        onClick={handleSubmit}
                    >
                        <SearchIcon />
                </Button>
            </Box>
            <Accordion square sx={{ width: "40%" }}>
                <AccordionSummary
                expandIcon={<ExpandMoreRoundedIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                    <Typography sx={{ flexShrink: 0 }}>フィルター</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                <FormControlLabel
                    label="全メンバー"
                    control={
                        <Checkbox
                            checked={parentChecked}
                            indeterminate={isIndeterminate}
                            onChange={handleChangeParent}
                        />
                    }
                />
                {children}
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}
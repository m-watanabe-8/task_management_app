import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import SearchIcon from '@mui/icons-material/Search';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useEffect, useRef, useState } from 'react';

export function SearchBar({ onSearch }) {

    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // 現在 IME ON（変換中）かどうかのフラグ
    const isImeOn = useRef(false)
    
    // 入力テキストを処理する
    const handleChange = (value) => {
        // 変換中（IMEオン）の場合は何もしない
        if (isImeOn.current) return;

        // 値が変わったときに更新
        if (searchInput !== value) {
            setSearchInput(value);
        }
    };

    useEffect(() => {
        if (searchTerm !== searchInput) {
            setSearchTerm(searchInput); // 検索確定値を更新
            onSearch(searchTerm); // 検索実行
            console.log("検索実行", searchTerm);
        }
    }, [searchTerm, searchInput, onSearch]);
    

    // 検索バーのスタイル
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        '--Grid-borderWidth': '2px',
        border: 'var(--Grid-borderWidth) solid',
        borderColor: '#c2d8e1',
        borderRadius: '10px',
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '30vw',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));


    // 絞り込み
    const memberlist = [
        {id:"1",name:"aaa"},
        {id:"2",name:"bbb"},
        {id:"3",name:"ccc"},
        {id:"4",name:"ddd"},
        {id:"5",name:"eee"}
    ]
    const [checkedList, setCheckedList] = useState([
        {id:0,isChecked:false},
        {id:1,isChecked:false},
        {id:2,isChecked:false},
        {id:3,isChecked:false},
        {id:4,isChecked:false}
        // memberlist.map((member, index) => ({
        //     id: index,
        //     isChecked: false
        // }))
    ]);

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
            {memberlist.map((member,index) => {
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
        <>
        <Search sx={{ mb:1 }}>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                defaultValue={searchInput}
                onChange={(e)=>handleChange(e.target.value)}
                onCompositionStart={() => {
                    isImeOn.current = true // IME 入力中フラグを ON
                }}
                onCompositionEnd={(e) => {
                    isImeOn.current = false // IME 入力中フラグを OFF
                    setSearchInput(e.target.value) // 入力確定したとき値に設定
                }}
            />
        </Search>
        <Accordion square sx={{ ml:1, width: "40%" }}>
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
        </>
    )
}
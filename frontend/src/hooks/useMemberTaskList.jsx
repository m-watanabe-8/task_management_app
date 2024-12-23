import axios from 'axios';
import { API_AUTH_URL } from "configs/ApiRouteUrl";
import { useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getStatusTaskList } from "utils/getStatusTaskList";


export const useMemberTaskList = () => {
    const today = new Date();

    const [cookies, setCookie, removeCookie] = useCookies();

    const [memberTaskList, SetMemberTaskList] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // メンバー全員のタスク一覧の取得（明日以降開始）
    const getMemberSpecifiedTaskList = async () => {
        const formatDayStart = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + (today.getDate()+1);
        const formatDayEnd = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + (today.getDate()+5);
        const url = `${API_AUTH_URL}task-search/?search_type=member&specific_date_start=${formatDayStart}&specific_date_end=${formatDayEnd}`;

        try {
            const response = await axios.get(url,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${cookies.accessToken}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('メンバーのタスクが取得できませんでした。', error);
            setError(error);
            return [];
        }
    };


    // 一覧の値を取得
    const getMemberTaskList = useCallback(async() => {
        if (!cookies.accessToken) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // メンバーごとに分割されたタスクを取得
            const memberTasks = await getMemberSpecifiedTaskList();
            
            if (memberTasks) {
                let newTaskList = []
        
                // ステータスでタスクを分割
                Object.keys(memberTasks).map((user) => {
                    let statusTasks =  getStatusTaskList(memberTasks[user])
                    newTaskList.push({user: user, taskList: statusTasks[0]})
                })
                SetMemberTaskList(newTaskList)
            }

        } catch (error) {
            console.error('タスクの取得と振り分けに失敗しました。', error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [cookies.accessToken]);

    // タスクの更新処理
    const refreshTaskList = useCallback(async () => {
        await getMemberTaskList();
    }, [getMemberTaskList]);

    return {
        memberTaskList,
        isLoading,
        error,
        getMemberTaskList,
        refreshTaskList
    };
};
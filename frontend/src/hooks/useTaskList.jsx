import axios from 'axios';
import { API_AUTH_URL } from "configs/ApiRouteUrl";
import { useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getDayTaskList } from "utils/getDayTaskList";
import { getStatusTaskList } from "utils/getStatusTaskList";


export const useTaskList = () => {
    const [cookies, setCookie, removeCookie] = useCookies();

    const [todayStatusTasks, setTodayStatusTasks] = useState([]);   //完了以外のステータスの今日のタスク
    const [doneTasks, setDoneTasks] = useState([]);                 //完了ステータスの今日のタスク
    const [specifiedTasks, setSpecifiedTasks] = useState([]);       // 日付別ステータスで分割したタスクリスト（明日以降）
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // タスク一覧の取得（今日）
    const getTodayTaskList = async () => {
        const url = `${API_AUTH_URL}task-search/?search_type=today&login_user=${cookies.userId}`;

        try {
            const response = await axios.get(url,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${cookies.accessToken}`
                }
            });
            return response.data;
        } catch (error) {
            alert('本日日付のタスクが取得できませんでした。');
            console.error('本日日付のタスクが取得できませんでした。', error);
            setError(error);
            return [];
        }
    };

    // タスク一覧の取得（明日以降開始）
    const getSpecifiedTaskList = async () => {
        const today = new Date();
        const formatDayStart = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + (today.getDate()+1);
        const url = `${API_AUTH_URL}task-search/?search_type=specific_date&specific_date_start=${formatDayStart}&login_user=${cookies.userId}`;

        try {
            const response = await axios.get(url,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${cookies.accessToken}`
                }
            });
            return response.data;
        } catch (error) {
            alert('明日以降のタスクが取得できませんでした。');
            console.error('明日以降のタスクが取得できませんでした。', error);
            setError(error);
            return [];
        }
    };


    // 一覧の値を取得
    const getTaskList = useCallback(async() => {
        if (!cookies.accessToken) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // 今日のタスクを取得
            const todayTasks = await getTodayTaskList();

            if (todayTasks && Array.isArray(todayTasks)) {
                // ステータスで分割
                const statusTasks = getStatusTaskList(todayTasks);
                setTodayStatusTasks(statusTasks[0])
                setDoneTasks(statusTasks[1])
            }

            // 明日以降のタスクを取得
            const specifiedTasks = await getSpecifiedTaskList()

            if (specifiedTasks && Array.isArray(specifiedTasks)) {
                // 日付ごと
                const dayTasks = getDayTaskList(specifiedTasks)

                // 日付別でステータスで分割
                // タスクを日付ごとにグループ化するためのオブジェクト
                const taskGroups = [];

                // ステータスで分割
                dayTasks.forEach((task)=> {
                    const statusTasks = getStatusTaskList(task.taskList);
                    taskGroups.push({taskDate:task.taskDate, taskList:statusTasks[0]});
                });

                setSpecifiedTasks(taskGroups)
            }

        } catch (error) {
            alert('タスクの取得と振り分けに失敗しました。');
            console.error('タスクの取得と振り分けに失敗しました。', error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [cookies.accessToken]);

    // タスクの更新処理
    const refreshTaskList = useCallback(async () => {
        await getTaskList();
    }, [getTaskList]);

    return {
        todayStatusTasks,
        doneTasks,
        specifiedTasks,
        isLoading,
        error,
        getTaskList,
        refreshTaskList
    };
};
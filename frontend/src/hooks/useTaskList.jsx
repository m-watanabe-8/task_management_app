import axios from 'axios';
import { API_AUTH_URL } from "configs/ApiRouteUrl";
import { useCallback, useState } from 'react';
import { getDayTaskList } from "utils/getDayTaskList";
import { getStatusTaskList } from "utils/getStatusTaskList";

export const useTaskList = () => {
    const today = new Date();

    const [todayTaskList, setTodayTaskList] = useState([]);
    const [specifiedTaskList, setSpecifiedTaskList] = useState([]);
    const [todayStatusTasks, setTodayStatusTasks] = useState([]);   //完了以外のステータスの今日のタスク
    const [doneTasks, setDoneTasks] = useState([]);                 //完了ステータスの今日のタスク
    const [specifiedTasks, setSpecifiedTasks] = useState([]);       // 日付別ステータスで分割したタスクリスト（明日以降）
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // タスク一覧の取得（今日）
    const getTodayTaskList = async () => {
        const url = `${API_AUTH_URL}task-search/?search_type=today`;

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('本日日付のタスクが取得できませんでした。', error);
            setError(error);
            return [];
        }
    };

    // タスク一覧の取得（明日以降開始）
    const getSpecifiedTaskList = async () => {
        const formatDayStart = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + (today.getDate()+1);
        const formatDayEnd = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + (today.getDate()+5);
        const url = `${API_AUTH_URL}task-search/?search_type=specific_date&specific_date_start=${formatDayStart}&specific_date_end=${formatDayEnd}`;

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('明日以降のタスクが取得できませんでした。', error);
            setError(error);
            return [];
        }
    };


    // 一覧の値を取得
    const getTaskList = useCallback(async() => {
        setIsLoading(true);
        setError(null);

        try {
            // 今日のタスクを取得
            const todayTasks = await getTodayTaskList();

            if (todayTasks && Array.isArray(todayTasks)) {
                setTodayTaskList(todayTasks);

                // ステータスで分割
                const statusTasks = getStatusTaskList(todayTasks);
                setTodayStatusTasks(statusTasks[0])
                setDoneTasks(statusTasks[1])
            }

            // 明日以降のタスクを取得
            const specifiedTasks = await getSpecifiedTaskList()

            if (specifiedTasks && Array.isArray(specifiedTasks)) {
                setSpecifiedTaskList(specifiedTasks);

                // 日付ごと
                const dayTasks = getDayTaskList(specifiedTasks)

                // 日付別でステータスで分割
                const statusTasks1 = getStatusTaskList(dayTasks[0]);
                const statusTasks2 = getStatusTaskList(dayTasks[1]);
                const statusTasks3 = getStatusTaskList(dayTasks[2]);
                const statusTasks4 = getStatusTaskList(dayTasks[3]);
                const statusTasks5 = getStatusTaskList(dayTasks[4]);

                const specifiedTaskList = [statusTasks1[0], statusTasks2[0], statusTasks3[0], statusTasks4[0], statusTasks5[0]]
                setSpecifiedTasks(specifiedTaskList)
            }

        } catch (error) {
            console.error('タスクの取得と振り分けに失敗しました。', error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

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
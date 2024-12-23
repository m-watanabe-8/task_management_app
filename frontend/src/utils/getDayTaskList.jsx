
export const getDayTaskList = (allTaskList) => {
    // 引数チェック
    if (!Array.isArray(allTaskList)) {
        return [];  // allTaskListが配列でない場合は空の配列を返す
    }

    // 指定日検索用の日付取得
    const today = new Date();
    const getFormatDay = (date) => {
        return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${(date).toString().padStart(2, '0')}`;
    };

    // タスクを日付ごとにグループ化するためのオブジェクト
    const taskGroups = {};
    const dateTaskList = []

    // 日付でタスクを分ける
    allTaskList.forEach((task)=> {
        const taskDate = task.start_date;
        
        if (!taskGroups[taskDate]) {
            taskGroups[taskDate] = [];
        }
        taskGroups[taskDate].push(task);
    });

    // 日付ごとにオブジェクトにして配列に格納
    Object.keys(taskGroups).forEach((date) => {
        dateTaskList.push({taskDate: date, taskList: taskGroups[date]})
    })

    // 日付で昇順に並び替え
    const sortedTaskList = dateTaskList.sort(function(a, b) {
        return (a.taskDate < b.taskDate) ? -1 : 1;  //オブジェクトの昇順ソート
    });

    // グループ化した結果を配列に変換して返す
    return sortedTaskList;
};

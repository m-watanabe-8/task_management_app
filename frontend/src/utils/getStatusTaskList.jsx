export const getStatusTaskList = (allTaskList) => {
    // 引数チェック
    if (!Array.isArray(allTaskList)) {
        return [[], [], [], []];  // allTaskListが配列でない場合は空の配列を返す
    }

    // 一時的な配列
    const done = [];
    const doing = [];
    const todo = [];
    const undecided = [];

    // ステータスごとにリストを作成
    allTaskList.forEach((task) => {
        if(task.is_done === true){
            done.push(task);
        }
        else if(task.status === "doing"){
            doing.push(task);
        }
        else if(task.status === "todo"){
            todo.push(task);
        }
        else{
            undecided.push(task);
        }
    })

    // 完了以外
    const taskList = [
        { tasks: doing, statusName: '進行中' },
        { tasks: todo, statusName: '未着手' },
        { tasks: undecided, statusName: '未定' }
    ];

    return [taskList, done];
};

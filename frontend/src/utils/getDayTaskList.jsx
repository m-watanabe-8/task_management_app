export const getDayTaskList = (allTaskList) => {
    // 引数チェック
    if (!Array.isArray(allTaskList)) {
        return [[], [], [], [], []];  // allTaskListが配列でない場合は空の配列を返す
    }

    // 指定日検索用の日付取得
    const today = new Date();
    const getFormatDay = (num) => {
        return today.getFullYear() + '-' + (today.getMonth()+1) + '-' + (today.getDate()+num);
    };

    // 一時的な配列
    const day1 = [];
    const day2 = [];
    const day3 = [];
    const day4 = [];
    const day5 = [];

    // 日付でタスクを分ける
    allTaskList.forEach((task)=> {
        if(task.start_date === getFormatDay(1)){
            day1.push(task);
        }
        else if(task.start_date === getFormatDay(2)){
            day2.push(task);
        }
        else if(task.start_date === getFormatDay(3)){
            day3.push(task);
        }
        else if(task.start_date === getFormatDay(4)){
            day4.push(task);
        }
        else{
            day5.push(task);
        }
    }
    )

    return [day1, day2, day3, day4, day5];
};

import { arrTheme } from "../../JSS_Styled/Themes/MainTheme"
import { ToDoListDarkTheme } from "../../JSS_Styled/Themes/ToDoListDarkTheme"
// import { ToDoListLightTheme } from "../../JSS_Styled/Themes/ToDoListLightTheme"
import { add_task, change_theme, delete_task, done_task, update_task } from "../types/ToDoListTypes"

const initialState = {
    themeToDoList: ToDoListDarkTheme,
    taskList: [
        {id:'task-1', taskName:'task 1', done: true},
        {id:'task-2', taskName:'task 2', done: false},
        {id:'task-3', taskName:'task 3', done: true},
        {id:'task-4', taskName:'task 4', done: false},
    ],
    taskEdit: {id:'-1', taskName:'', done: false},

}

 const TodoListReducer = (state = initialState, action) => {
    switch (action.type) {
    case add_task:{
        // console.log('task', action.newTask)
        if(action.newTask.taskName.trim() === ''){
            alert('Task name is required')
            return {...state}
        }
        //kiểm tra tồn tại
        let taskListUpdate = [...state.taskList];
        let index = taskListUpdate.findIndex(task => task.taskName === action.newTask.taskName)
        if(index !== -1){
            alert('Task name already exists')
            return {...state}
        }
        taskListUpdate.push(action.newTask)
        // xử lý xong thì gắn taskList mới vào taskList 
        state.taskList = taskListUpdate;
        return {...state}
    }

        case change_theme:{
            //tìm theme dựa vào action.themeId được chọn
            let theme = arrTheme.find(theme => theme.id == action.themeId);
            if(theme) {
                console.log(theme)
                //set lại theme cho state.themeToDoList
                state.themeToDoList = {...theme.theme};
            }
            return {...state}
            // console.log(action)
        }

        case done_task:{
            console.log('done', action)
            //click vào button check => dispatch lên action có taskID
            let taskListUpdate = [...state.taskList]
            //từ task id tìm ra task đó ở vị trí nào trong mảng tiến hành cặp nhật lai thuộc tính done = true và cập nhật lại state của redux
            let index = taskListUpdate.findIndex(task => task.id === action.taskId)
            if(index !== -1){
                taskListUpdate[index].done = true;
            }
            console.log('done', taskListUpdate)
            //state.taskList = taskListUpdate;
            return {...state, taskList:taskListUpdate};
        }

        case delete_task:{
            // let taskListUpdate = [...state.taskList]
            // //gán lại giá trị cho mảng taskListUpdate = chính nó nhưng filter k có taskId đó
            // taskListUpdate = taskListUpdate.filter(task => task.id !== action.taskId)
            
            // return {...state, taskList: taskListUpdate};
            return {...state, taskList: state.taskList.filter(task => task.id !== action.taskId)}
        }

        case 'edit_task':
            return {...state, taskEdit:action.task}

        case update_task:
            //chỉnh sửa lại taskName của taskEdit
            state.taskEdit = {...state.taskEdit, taskName:action.taskName}

            //tìm trong taskList cập nhật lại taskEdit người dùng update
            let taskListUpdate = [...state.taskList]
            let index = taskListUpdate.findIndex(task => task.id === state.taskEdit.id)

            if(index !== -1) {
                taskListUpdate[index] =state.taskEdit
            }
            state.taskList = taskListUpdate;
            state.taskEdit = {id:'-1', taskName:'', done:false}
            // state.taskEdit.taskName = '';
            return {...state}

    default:
        return {...state}
    }
}

export default TodoListReducer
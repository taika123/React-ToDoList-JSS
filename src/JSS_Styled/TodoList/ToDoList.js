import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { Button } from '../Components/Button'
import { Container } from '../Components/Container'
import { Dropdown } from '../Components/Dropdown'
import { Heading1, Heading2, Heading3, Heading4, Heading5 } from '../Components/Heading'
import { Table, Th, Thead, Tr } from '../Components/Table'
import { Input, Label, TextField } from '../Components/TextField'
import { ToDoListDarkTheme } from '../Themes/ToDoListDarkTheme'
import { ToDoListLightTheme } from '../Themes/ToDoListLightTheme'
import { ToDoListPrimaryTheme } from '../Themes/ToDoListPrimaryTheme'
import { connect } from 'react-redux';
import { addTaskAction, changeThemeAction, deleteTaskAction, doneTaskAction, editTaskAction, updateTaskAction } from '../../redux/actions/ToDoListActions'
import { arrTheme } from '../Themes/MainTheme'
import { change_theme, edit_task } from '../../redux/types/ToDoListTypes'



class ToDoList extends Component {

    state = {
        taskName: '',
        disabled: true,
    }

    renderTaskToDo = () => {
        return this.props.taskList.filter(task => !task.done).map((task, index) => {
            return <Tr key={index}>
                <Th style={{ verticalAlign: 'middle' }}>{task.taskName}</Th>
                <Th className="text-right">
                    <Button onClick={() => {
                        this.setState({
                            disabled: false
                        }, () => {
                            this.props.dispatch(editTaskAction(task))
                        })
                    }} className="ml-1"><i className="fas fa-edit"></i></Button>

                    <Button onClick={() => {
                        this.props.dispatch(doneTaskAction(task.id));
                    }} className="ml-1"><i className="fas fa-check"></i></Button>

                    <Button onClick={() => {
                        this.props.dispatch(deleteTaskAction(task.id));
                    }} className="ml-1"><i className="fas fa-trash"></i></Button>
                </Th>
            </Tr>
        })
    }

    renderTaskComplete = () => {
        return this.props.taskList.filter(task => task.done).map((task, index) => {
            return <Tr key={index}>
                <Th style={{ verticalAlign: 'middle' }}>{task.taskName}</Th>
                <Th className="text-right">
                    <Button onClick={() => {
                        this.props.dispatch(deleteTaskAction(task.id));
                    }} className="ml-1"><i className="fas fa-trash"></i></Button>
                </Th>
            </Tr>
        })
    }

    // handleChange = (e) => {
    //     let {name, value} = e.target.value;
    //     this.setState({
    //         [name] : value
    //     });
    // }

    //viết hàm render theme import MainTheme
    renderTheme = () => {
        return arrTheme.map((theme, i) => {
            return <option key={i} value={theme.id}>{theme.name}</option>
        })
    }

    //lifycle nhận vào props mới được thực thi trước khi render
    // componentWillReceiveProps(newProps) {
    //     console.log('componentWillReceiveProps', this.props)
    //     console.log('componentWillReceiveProps', newProps)
    //     this.setState({
    //         taskName: newProps.taskEdit.taskName
    //     })
    // }

    // static getDrivedStateFromProps(newProps, currentState) {
    //     //newProps: là props mới, props cữ là this.props(k thể truy xuất được)
    //     //currentState: ứng với state hiện tại

    //     //hoặc trả về state mới (this.state)

    //     let newState = {...currentState, taskName: newProps.taskEdit.taskName}
    //     return newState

    //     //trả về null state giữ nguyên
    //     // return null;
    // }


    render() {
        return (
            <ThemeProvider theme={this.props.themeToDoList}>
                <Container className="w-50">
                    <Dropdown onChange={(e) => {
                        let { value } = e.target;
                        //dispatch value lên reducer

                        this.props.dispatch(changeThemeAction(value))
                    }}>
                        {this.renderTheme()}

                    </Dropdown>
                    <Heading3> To Do List</Heading3>
                    <TextField value={this.state.taskName} onChange={(e) => {
                        //handle change
                        this.setState({
                            taskName: e.target.value,
                        }, () => {
                            console.log(this.state)
                        })

                    }} label="Task Name" className="w-50"></TextField>
                    <Button onClick={() => {
                        //lấy thông tin người dùng nhập vào từ input
                        let { taskName } = this.state;
                        //tạo ra 1 task object
                        let newTask = {
                            id: Date.now(),
                            taskName: taskName,
                            done: false
                        }
                        console.log(newTask)
                        //Đưa task object lên redux thông qua phương thức dispatch
                        this.props.dispatch(addTaskAction(newTask))

                    }} className="ml-2"> <i className="fas fa-plus-circle"></i> Add task</Button>
                    {this.state.disabled ? <Button disabled onClick={() => { this.props.dispatch(updateTaskAction(this.state.taskName)) }} className="ml-2"> <i className="fas fa-upload"></i> Update task</Button>
                        : 
                    <Button onClick={()=> {
                        let {taskName} = this.state;
                        this.setState({
                            disabled: true,
                            taskName: ''
                        },() => { this.props.dispatch(updateTaskAction(taskName)) 
                        })
                    }} className="ml-2"> <i className="fas fa-upload"></i> Update task</Button>
                    }
                    <hr />
                    <Heading3>Task To Do</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskToDo()}
                        </Thead>
                    </Table>
                    <Heading3>Task Completed</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskComplete()}
                        </Thead>
                    </Table>
                </Container>
            </ThemeProvider>
        )
    }

    //đây là lifycle trả về props cũ và state cũ của component trước khi render
    // lifecycle này chạy sau render
    componentDidUpdate(prevProps, nextState) {
        // console.log('prev', prevProps)
        // console.log('state', nextState)
        //so sánh nếu như props trước đó (taskEdit trước mà khác task Edit hiện tại thì mình mới setState)
        if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
            this.setState({
                taskName: this.props.taskEdit.taskName,

            })
        }

    }
}


const mapStateToProps = (state) => {
    return {
        //gán state themeToDoList từ redux về component
        themeToDoList: state.ToDoListReducer.themeToDoList,
        taskList: state.ToDoListReducer.taskList,
        taskEdit: state.ToDoListReducer.taskEdit,
    }
}


export default connect(mapStateToProps)(ToDoList)
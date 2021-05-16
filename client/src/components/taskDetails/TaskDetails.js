import React, { useEffect, useState } from 'react';
import './styles.css';
import styled from 'styled-components';
import { request } from '../../utils/api-utils';
import { getToken } from '../../utils/user-utils';
import Modal from '../modal/Modal';
import _ from 'lodash';
const AppCard = styled.div`
    background: #fff;
    padding: 20px 20px;
    transition: 0.5s all ease-out;
    filter: drop-shadow(0 0 1px #ccc);
    border-radius: 10px;
    height: auto;
`;
const TaskList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;
const ListItem = styled.li`
    padding: 15px 0;
    border-top: 1px solid #eee;
    :first-of-type {
        border-top: none;
    }
`;
const TaskDetails = (props) => {
    const {title} = props
    const [tasks, setTasks] = useState([])
    const [show, setShowModal] = useState(false)
    const [taskName, setTaskName] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState('')
    const [searchText, setSearchText] = useState('')
    const [searchData, setSearchData] = useState([])

    useEffect(() => {
        getTaskLists();
    },[])

    const showModal = () => {
        setShowModal(true);
    }
    
    const hideModal = () => {
        setTaskName('');
        setIsEdit(false);
        setEditId('');
        setShowModal(false);
    }

    const getTaskLists = () => {
        request.get('/tasks', {headers: { 'x-auth-token': getToken() }})
        .then((response) => {
            if(response) {
                if(response.data.status === false) {
                    console.log(response.data.message);
                    return;
                }
                setTasks(response.data);
            }
        })
        .catch(error => {
            if(error) {
                console.log(error);
            }
        })
    }

    const saveTask = (e) => {
        const header = {
            headers: { 'x-auth-token': getToken() }
        }
        if(isEdit) {
            updateTask(editId, taskName, false);
            hideModal()
        } else {
            request.post(`/tasks`, {
                name: taskName,
                completed: false
            }, header)
            .then((response) => {
                if(response.data.status === false) {
                    alert(response.data.message);
                    return;
                }
                hideModal()
                getTaskLists()
                props.getDashboardData();
            })
            .catch(error => {
                 if(error) {
                     console.log(error);
                 }
            })
        }
        
        e.preventDefault();
    }

    const updateTask = (id, name, completed) => {
        //console.log(id, name);return;
        const header = {
            headers: { 'x-auth-token': getToken() }
        }
        request.put(`/tasks/${id}`, {
            name: name,
            completed: completed
        }, header)
        .then((response) => {
            if(response.data.status === false) {
                alert(response.data.message);
                return;
            }
            getTaskLists()
            props.getDashboardData();
        })
        .catch(error => {
            if(error) {
                console.log(error);
            }
        })
    }

    const deleteTask = (id) => {
        const header = {
            headers: { 'x-auth-token': getToken() }
        }
        request.delete(`/tasks/${id}`, header)
        .then((response) => {
            if(response.data.status === false) {
                alert(response.data.message);
                return;
            }
            getTaskLists()
            props.getDashboardData();
        })
        .catch(error => {
            if(error) {
                console.log(error);
            }
        })
    }

    const editTask = (id, name, completed) => {
        setTaskName(name);
        setIsEdit(true);
        setEditId(id);
        showModal();
    }

    const handleSearch = (e) => {
        const value = e.target.value
        _.debounce(() => {
            setSearchText(value)
        }, 500)()
    }

    const getFilteredData = () => {
        if (searchText.length <= 0) {
          return tasks
        }
        return _.filter(tasks, (task) => {
            return task.name.toLowerCase().includes(searchText.toLowerCase())
        })
    }
    useEffect(() => {
        setSearchData(getFilteredData())
    }, [tasks, searchText])
    
    const renderHeader = () => {
        return <div className="clear center-mob">
            <div className="left"><h3 className="title">{title}</h3></div>
            <button type="button" className="btn btn-primary right" onClick={showModal}>
                + New Task
            </button>
            <input 
                className="input-style search-input right" 
                placeholder="Search by task name" 
                onChange={(e) => handleSearch(e)}
                allowClear
            />
        </div>
    }

    const renderTaskList = () => {
        return <div>
            <AppCard>
                <TaskList>
                    {
                        searchData.map((task, index) => (
                        (task.completed ? <ListItem className="clear" key={index}>
                                    <label className="left">
                                        <input type="checkbox" checked readOnly/>
                                        <del>{task.name}</del>
                                    </label>
                                    <div className="right">
                                        <button className="flat-btn" type="button">
                                            <span className="material-icons  text-light-gray">edit</span>    
                                        </button>
                                        <button className="flat-btn" type="button" onClick={() => deleteTask(task._id)}>
                                            <span className="material-icons  text-light-gray">delete</span>
                                        </button>
                                    </div>
                            </ListItem> : <ListItem className="clear" key={index}>
                                <label className="left">
                                    <input type="checkbox" value={task._id} onChange={(e) => {updateTask(e.target.value, task.name, true)}} />
                                    <span>{task.name}</span>
                                </label>
                                <div className="right">
                                    <button className="flat-btn" type="button" onClick={() => editTask(task._id, task.name, false)}>
                                        <span className="material-icons text-gray">edit</span>    
                                    </button>
                                    <button className="flat-btn" type="button" onClick={() => deleteTask(task._id)}>
                                        <span className="material-icons text-gray">delete</span>
                                    </button>
                                </div>
                            </ListItem>)
                        ))
                    }
                </TaskList>
            </AppCard>
        </div>
    }

    const renderDashboardContent = () => {
        return <>
            {renderHeader()}
            {renderTaskList()}
        </>
    }

    return <>
        {
            props.totalTasks > 0 ? <>
                {renderDashboardContent()}
            </> : <>
                <div className="card-centered">
                    <h3 className="title" style={{flexDirection:'column'}}>You have no task</h3>
                    <div className="form-group" style={{flexDirection:'column'}}>
                        <button type="button" className="btn btn-primary" onClick={showModal}>
                            + New Task
                        </button>
                    </div>
                </div>
            </>
        }
        <Modal show={show} handleClose={hideModal}>
            <h3 className="title">
                { isEdit ? 'Update Task' : ' New Task' }
            </h3>
            <form onSubmit={e => {saveTask(e)}}>
                <div className="form-group">
                    <input 
                        onChange={(e) => setTaskName(e.target.value)} 
                        value={taskName} 
                        type="text" 
                        className="input-style" 
                        placeholder="Task Name" 
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-expand no-pad"> { isEdit ? 'Update Task' : '+ New Task' }</button>
                </div>
            </form>
        </Modal>
    </>
}

export default TaskDetails;
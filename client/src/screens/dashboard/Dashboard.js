import React, { useEffect, useState } from 'react';
import TaskCard from '../../components/card/TaskCard';
import Header from '../../components/header/Header';
import TaskDetails from '../../components/taskDetails/TaskDetails';
import { request } from "../../utils/api-utils";
import { getToken } from "../../utils/user-utils";
const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({})
    useEffect(() => {
        getDashboardData();
    },[])

    const getDashboardData = () => {
        request.get(`/dashboard`, {headers: { 'x-auth-token': getToken() }})
        .then((response) => {
            if(response) {
                if(response.data.status === false) {
                    console.log(response.data.message);
                    return;
                }
                setDashboardData(response.data);
            }
        })
        .catch(error => {
            if(error) {
                console.log(error);
            }
        })
    }

    return <div>
        <Header />
        <div className="section">
            <div className="container">
                {
                    dashboardData.totalTasks > 0 ? <>
                        <div className="row clear">
                            <div className="col-3">
                                <TaskCard title="Task Completed" type="TASK_COUNTER" dashboardData={dashboardData} />
                            </div>
                            <div className="col-3">
                                <TaskCard title="Latest Created Tasks" type="TASK_LIST" dashboardData={dashboardData} />  
                            </div>
                            <div className="col-3">
                                <TaskCard type="TASK_CHART" dashboardData={dashboardData} />
                            </div>
                        </div>
                    </> : <></>
                }
                <div className="row" style={{paddingTop:'20px'}}>
                    <TaskDetails title="Tasks" getDashboardData={getDashboardData} totalTasks={dashboardData.totalTasks} />
                </div>
            </div>
        </div>        
    </div>
}

export default Dashboard;
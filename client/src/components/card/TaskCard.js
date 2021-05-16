import React, { useEffect, useState } from "react";
import './styles.css';
import styled from 'styled-components';
import {PieChart, Pie, Tooltip, ResponsiveContainer, Cell} from 'recharts';

const AppCard = styled.div`
    background: #fff;
    padding: 20px 20px;
    transition: 0.5s all ease-out;
    filter: drop-shadow(0 0 1px #ccc);
    border-radius: 10px;
    height: 120px;
`;
const CompletedTask = styled.label`
    color: #1976d2;
    font-size: 50px;
`;

const TaskCard = (props) => {
    const {title, type, dashboardData} = props;
    const [data, setData] = useState([]);
    useEffect(()=> {
        const totalTasks = props.dashboardData.totalTasks;
        let completed = props.dashboardData.tasksCompleted/totalTasks*100;
        let pending = (totalTasks-props.dashboardData.tasksCompleted)/totalTasks*100;
        setData([
            {name: "Complated Tasks", value: completed},
            {name: "Pending Tasks", value: pending}
        ])
    },[props.dashboardData  ])

    const renderCounter = () => {
        return <div style={{marginTop: '20px'}}>
            <CompletedTask>{dashboardData.tasksCompleted}</CompletedTask>/
            <label>{dashboardData.totalTasks}</label>
        </div>
    }

    const renderList = () => {
        if(dashboardData.latestTasks) {
            return <ul className="card-list">
                { 
                    dashboardData.latestTasks.map((data, index) => (
                        (!data.completed ? <li key={index}>{data.name}</li> : <li key={index}><del>{data.name}</del></li>)
                    ))
                }
            </ul>
        }
        return ""
    }

    const renderChart = () => {
        return <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%" minHeight={100}>
                <PieChart>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={data}
                        fill="#8884d8"
                        cx="50%"
                        cy="50%"
                        label={renderLabel}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                dataKey="name"
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    {/* <Tooltip/> */}
                </PieChart>
            </ResponsiveContainer>
        </div>
    }

    const renderCardContent = () => {
        if(type === 'TASK_COUNTER') {
            return renderCounter()
        }

        else if(type === 'TASK_LIST') {
           return renderList()
        }

        else if(type === 'TASK_CHART') {
            return renderChart()
        }
    }

    
    return <AppCard>
        <h3 className="card-title"> {title??""}</h3>
        {renderCardContent()}
    </AppCard>
}

const COLORS = ['#1890ff', '#ddd'];
const RADIAN = Math.PI / 180;
const renderLabel = ({
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    index,
    name
}) => {
    const radius =  10+innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text fontSize="12" x={x} y={y} fill="#1890ff" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
           {name}
        </text>
    );
}

export default TaskCard;
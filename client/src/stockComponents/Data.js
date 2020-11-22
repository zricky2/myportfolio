import React, { props, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import '../styles/Data.css'

export default function Data({ ticker }) {
    const [dataSet, setDataSet] = useState()
    const [closeData, setCloseData] = useState([])
    const [openData, setOpenData] = useState([])
    const [volumeData, setVolumeData] = useState([])
    const [time, setTime] = useState([])
    const [type, setType] = useState([])

    async function getStock(interval, type) {
        try {
            const response = await fetch('/stock', {
                method: 'POST', 
                body: JSON.stringify({ stock: ticker, interval: interval}),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await response.json()
            setType(type);
            console.log(type)
            setDataSet(data);
        } catch (err) {
            console.log(err)
            alert("Error: " + err)
        }
    }

    useEffect(() => {
        getStock('5min', 'd');
    }, [])

    
    useEffect(() => {
        let close = []
        let open = []
        let volume = []
        let times = []
        let time;
        let count;
        
        if (type === 'd'){
            count = 1;
        } else if (type ==='w'){
            console.log('weeek')
            count = 5;
        } else if(type === 'm') {
            count = 20;   
        }else {
            count = 1;
        }
        let i = 0;
        let index = 0;
        let prevTime;
        let curTime;
        
        for (time in dataSet) {
            if(index++ === 0) {
                prevTime = time;
            } else {
                curTime = time;
                if(curTime.slice(0,10) !== prevTime.slice(0,10)) {
                    i++;
                }
                prevTime = curTime;
            }

            if(i === count) {
                break;
            }

            open.push(dataSet[time]["1. open"])
            close.push(dataSet[time]["4. close"])
            volume.push(dataSet[time]["5. volume"])
            times.push(time)
        }

        
        setOpenData(open.reverse())
        setCloseData(close.reverse())
        setVolumeData(volume.reverse())
        setTime(times.reverse())
    },[dataSet])

    const chartData = {
        labels: time,
        datasets: [
            {
                label: ticker.toUpperCase(),
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#00cc00',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#00cc00',
                pointBackgroundColor: '#00cc00',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: closeData
            }
        ]
    };

    return (
        <div>
            <Line
                data={chartData}
                width={100}
                height={40}
                options={{}}
            />
            <div className="btn-group">
                <button onClick={() => {getStock('5min', 'd')}}>Daily</button>
                <button onClick={() => {getStock('15min', 'w')}}>Weekly</button>
                <button onClick={() => {getStock('30min', 'm')}}>Monthly</button>
            </div>

        </div>
    )
}

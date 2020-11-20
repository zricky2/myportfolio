import React, { props, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import '../styles/Data.css'

export default function Data({ ticker }) {
    const [dataSet, setDataSet] = useState()
    const [closeData, setCloseData] = useState([])
    const [openData, setOpenData] = useState([])
    const [volumeData, setVolumeData] = useState([])
    const [time, setTime] = useState([])

    async function getStock(functionType, interval) {
        try {
            const response = await fetch('/stock', {
                method: 'POST', 
                body: JSON.stringify({ stock: ticker, functionType: functionType, interval: interval}),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await response.json()
            console.log(data);
            setDataSet(data)
        } catch (err) {
            console.log(err)
            alert("Error: " + err)
        }
    }

    useEffect(() => {
        getStock('TIME_SERIES_INTRADAY', '30min')
    }, [])

    
    useEffect(() => {
        let close = []
        let open = []
        let volume = []
        let times = []
        let time;
        for (time in dataSet) {
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
            <div class="btn-group">
                <button onClick={() => {getStock("TIME_SERIES_DAILY", '30min')}}>Daily</button>
                <button onClick={() => {getStock("TIME_SERIES_WEEKLY")}}>Weekly</button>
                <button onClick={() => {getStock("TIME_SERIES_Monthly")}}>Monthly</button>
            </div>

        </div>
    )
}

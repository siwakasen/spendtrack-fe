import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import dayjs from 'dayjs';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Chart({ data, listOfDates }) {

    const [listOfExpenses, setListOfExpenses] = useState([]);

    useEffect(() => {
        const generatedExpenses = new Array(listOfDates.length).fill(0);
        data.forEach(expense => {
            const dateIndex = listOfDates.findIndex(date => dayjs(expense.date_of_expenses).format('MMM DD') === date);
            if (dateIndex !== -1) {
                generatedExpenses[dateIndex] += expense.total_expense;
            }
        });
        setListOfExpenses(generatedExpenses);
    }, [data, listOfDates]); // Update expenses only when data or listOfDates change

    const chartData = {
        labels: listOfDates,
        datasets: [
            {
                data: listOfExpenses,
                borderRadius: 100,
                backgroundColor: (ctx, options) => {
                    return ctx.raw === 0 ? "rgb(191,219,254)" : "rgb(248,113,113)";
                },
                minBarLength: 5,
            },
        ],
    };

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                border: { display: false },
                grid: {
                    display: false,
                    drawTicks: false,
                },
                beginAtZero: true,
                ticks: {
                    maxTicksLimit: 6,
                    minRotation: 360,
                },
            },
            y: {
                border: { display: false, dash: [5] },
                grid: {
                    display: true,
                    color: (context) => {
                        if (context.tick.value === 50 || context.tick.value === 110) {
                            return "rgb(0,0,0)";
                        }
                    },
                    drawTicks: false,
                },
                ticks: {
                    stepSize: 1000, // Set the step size to 1000
                    color: (ctx, options) => {
                        return ctx.tick.value === 1000 ? "rgb(0,0,0)" : "rgb(107,114,128)";
                    },
                    callback: function (value, index, values) {
                        return value === 0 ? '' : value.toLocaleString(); // Format ticks with comma separator
                    },
                },
                position: "right",
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <>
            <div className="w-full h-64">
                <Bar options={chartOptions} data={chartData} />
            </div>
        </>
    );
}

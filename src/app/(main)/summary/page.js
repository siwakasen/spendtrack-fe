"use client"
import { Add } from "@mui/icons-material";
import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react";
import Chart from "@/components/Chart";
import dayjs from 'dayjs';
import CategorizedTable from "@/components/CategorizedTable";
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";
export default function Page() {
    const [loadPage, setLoadPage] = useState(true);
    const { data: session, status } = useSession();
    const [data, setData] = useState([]);
    const [unCategorizeData, setUnCategorizeData] = useState([]);
    const [resultCategorized, setResultCategorized] = useState([]);
    const [listOfDates, setListOfDates] = useState([]);
    const router = useRouter();
    const pathname = usePathname();
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [highestSpent, setHighestSpent] = useState([]);
    const [mostEntry, setMostEntry] = useState([]);

    function categorizeData(data) {
        const categorizedData = data.reduce((acc, current) => {
            const categoryId = current.category_id._id;
            const categoryName = current.category_id.category_name;
            const categoryIcon = current.category_id.icon;
            const totalExpense = current.amount;
            const existingCategory = acc.find((category) => category._id === categoryId);
            if (existingCategory) {
                existingCategory.total += 1;
                existingCategory.total_expense += totalExpense;
            } else {
                acc.push({
                    _id: categoryId,
                    category_name: categoryName,
                    icon: categoryIcon,
                    total: 1,
                    total_expense: totalExpense,
                });
            }
            return acc;
        }, []);
        setResultCategorized(categorizedData);
    }


    useEffect(() => {
        async function fetchExpenses() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${session?.loggedUser}`
                    },
                    credentials: 'include',
                });
                const { data } = await res.json();
                setData(data);
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        }
        async function unCategorizeData() {
            const currentMonth = dayjs().month() + 1;

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/month/${currentMonth}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${session?.loggedUser}`
                    },
                    credentials: 'include',
                });
                const { data } = await res.json();
                setUnCategorizeData(data);

            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        }
        if (session && session.user) {
            fetchExpenses();
            unCategorizeData();

            const year = dayjs().year();
            const month = dayjs().month();
            const dates = [];
            for (let i = 1; i <= dayjs(`${year}-${month + 1}-01`).daysInMonth(); i++) {
                dates.push(dayjs(`${year}-${month + 1}-${i}`).format('MMM DD'));
            }
            setListOfDates(dates);
        }
    }, [session]);

    useEffect(() => {
        categorizeData(unCategorizeData);
        let total = 0;
        let highest = 0;
        let highestExpense = [];
        data.forEach((expense) => {
            total += expense.total_expense;
            if (expense.total_expense > highest) {
                highest = expense.total_expense;
                highestExpense = expense;
            }
        });

        setTotalExpenses(total);
        setHighestSpent(highestExpense);

    }, [data]);

    useEffect(() => {
        let entry = 0;
        let mostEntry = [];

        resultCategorized.forEach((expense) => {
            if (expense.total > entry) {
                entry = expense.total;
                mostEntry = expense;
            }
        });
        setMostEntry(mostEntry);
        setTimeout(() => {
            setLoadPage(false);
        }, 300);
    }, [resultCategorized]);


    const handleLogout = async () => {
        signOut({ callbackUrl: '/' });
    };
    function handleDashboard() {
        router.push('/dashboard');
    }

    return (
        <>
            <div className="flex flex-col items-center  w-full h-full min-h-screen bg-black p-6 max-w-[512px]">
                <div>
                    <h1 className="text-2xl font-bold text-white mt-10">Summary</h1>
                </div>
                <div className="flex max-w-[512px] w-full justify-start pt-10">
                    <h1 className="text-xl font-bold text-red-500 mr-2">Rp.</h1>
                    <h2 className="text-xl font-bold text-red-500 mr-1">-</h2>
                    <h1 className="text-4xl font-bold text-center text-red-500">{Intl.NumberFormat("id-ID").format(totalExpenses)}</h1>
                    <h1 className="text-xl font-bold text-center text-red-500">.00</h1>
                </div>
                <h1 className="flex justify-start items-start w-full text-slate-400">Total spent this month</h1>
                <div className="flex flex-col w-full items-center justify-center  pb-28">
                    <Chart data={data} listOfDates={listOfDates} />
                    <div className="w-full mt-10 rounded bg-slate-800 py-3 px-2 flex justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-9 w-9 bg-yellow-200 rounded-full grid place-content-center">
                                <svg stroke="currentColor"
                                    fill="none"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="w-6 h-6 text-gray-500 dark:text-gray-400"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941">
                                    </path>
                                </svg>
                            </div>
                            <div className=" flex flex-col items-start justify-center">
                                <h1 className="text-bold text-md">
                                    Highest spent
                                </h1>
                                <h1 className="text-sm text-slate-400">
                                    {!highestSpent.date_of_expenses ? '' : dayjs(highestSpent.date_of_expenses).format('dddd MMM DD YYYY')}
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <h1 className="text-sm font-bold text-red-500 mr-1 pb-2">Rp.</h1>
                            <h2 className="text-sm font-bold text-red-500 mr-1 pb-1">-</h2>
                            <h1 className="text-md font-bold text-center text-red-500">
                                {Intl.NumberFormat("id-ID").format(isNaN(highestSpent.total_expense) ? 0 : highestSpent.total_expense)}
                            </h1>

                        </div>
                    </div>
                    <div className="w-full mt-5 rounded bg-slate-800 py-3 px-2 flex justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-9 w-9 bg-yellow-200 rounded-full grid place-content-center">
                                <svg stroke="currentColor"
                                    fill="none"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="w-6 h-6 text-gray-500 dark:text-gray-400"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941">
                                    </path>
                                </svg>
                            </div>
                            <div className=" flex flex-col items-start justify-center">
                                <h1 className="text-bold text-md">
                                    Most Entry
                                </h1>
                                <h1 className="text-sm text-slate-400">
                                    {!mostEntry.total ? '' : `${mostEntry.total} on ${mostEntry.icon} ${mostEntry.category_name}`}
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <h1 className="text-sm font-bold text-red-500 mr-1 pb-2">Rp.</h1>
                            <h2 className="text-sm font-bold text-red-500 mr-1 pb-1">-</h2>
                            <h1 className="text-md font-bold text-center text-red-500">
                                {Intl.NumberFormat("id-ID").format(isNaN(mostEntry.total_expense) ? 0 : mostEntry.total_expense)}
                            </h1>
                        </div>
                    </div>
                    <div className="w-full pt-10">
                        <CategorizedTable rows={resultCategorized} />
                    </div>
                </div>
            </div >
            <div className="w-full max-w-[512px] h-24 fixed bottom-0 grid grid-cols-3 bg-black border-t border-zinc-600">
                <div className="flex justify-center items-center ">
                    <button className={`flex justify-center items-center flex-col  group ${pathname === '/summary' ? 'text-white' : 'text-gray-4000'}`}>
                        <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="h-7 w-7 group-hover:scale-125 transition-all"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z">
                            </path>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z">
                            </path>
                        </svg>
                        Summary
                    </button>
                </div>
                <div className="flex justify-center items-center">
                    <button onClick={handleDashboard} type="button" className="flex justify-center items-center rounded-full group">
                        <div className="btn rounded-full p-2 bg-yellow-400">
                            <Add sx={{ width: '35px', height: '35px', color: "black" }} className="group-hover:scale-125 transition-all" />
                        </div>
                    </button>
                </div>
                <div className="flex justify-center items-center">
                    <button onClick={() => handleLogout()} className="flex justify-center items-center flex-col text-gray-400 group">
                        <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="h-7 w-7 group-hover:scale-125 transition-all"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9">
                            </path>
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );


}

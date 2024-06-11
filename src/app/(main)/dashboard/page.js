"use client"
import TableExpenses from "@/components/TableExpenses";
import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import FullScreenModal from "@/components/FullScreenModal";
import { useSession, signOut } from 'next-auth/react';
import { toast, Toaster } from "react-hot-toast";
const Page = () => {
    const { data: session, status } = useSession();
    const [expenses, setExpenses] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${session?.loggedUser}`
                    },
                    credentials: 'include',
                });
                const { data } = await res.json();
                setExpenses(data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        if (session && session.user) {
            fetchData();
        }
    }, [loading, status]);

    useEffect(() => {
        let total = 0;
        let highest = 0;
        let date = "";
        expenses.forEach((expense) => {
            total += expense.total_expense;
            if (expense.total_expense > highest) {
                highest = expense.total_expense;
                date = expense.date_of_expenses;
            }
        });
        setTotalExpenses(total);
    }, [expenses]);
    const handleLogout = async () => {
        await signOut({ callbackUrl: '/auth' });
    };

    function handleSummary() {
        router.push('/summary');
    }

    function handleOpen() {
        setOpen(!open);
    }

    function handleAddPage() {
        router.push('/expense/add');
    }

    return (
        <>
            <div className="flex flex-col items-center  w-full h-full min-h-screen bg-black p-6 max-w-[512px]">
                <h1 className="text-2xl font-bold text-white mt-5">Expenses</h1>
                <div className="flex flex-col w-full items-center justify-center pt-48 pb-28">
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-md text-slate-400 mb-5">
                            Spent this month
                        </p>
                        <div className="flex max-w-[512px] w-full justify-center ">
                            <h1 className="text-2xl font-bold text-red-500 mr-2">Rp.</h1>
                            <h2 className="text-3xl font-bold text-red-500 mr-1">-</h2>
                            <h1 className="text-4xl font-bold text-center text-red-500">{Intl.NumberFormat("id-ID").format(totalExpenses)}</h1>
                            <h1 className="text-xl font-bold text-center text-red-500"></h1>
                        </div>
                    </div>
                    <div className="w-full mt-40">
                        <TableExpenses rows={expenses} />
                    </div>
                    <div className="w-full">

                    </div>
                </div>
            </div >
            {/* Navigation bar */}
            <div className="w-full max-w-[512px] h-20 fixed bottom-0 grid grid-cols-3 bg-black border-t border-zinc-600">
                <div className="flex justify-center items-center ">
                    <button onClick={handleSummary} className="flex justify-center items-center flex-col text-gray-400 group">
                        <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="h-5 w-5 group-hover:scale-125 transition-all"
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
                    <button onClick={handleOpen} type="button" className="flex justify-center items-center rounded-full group">
                        <div className="btn rounded-full p-2 bg-yellow-400">
                            <Add sx={{ width: '25px', height: '25px', color: "black" }} className="group-hover:scale-125 transition-all" />
                        </div>
                    </button>
                    <FullScreenModal open={open} onClose={handleOpen} loading={loading} setLoading={setLoading} />
                </div>
                <div className="flex justify-center items-center">
                    <button onClick={handleLogout} className="flex justify-center items-center flex-col text-gray-400 group">
                        <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="h-5 w-5 group-hover:scale-125 transition-all"
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
                <Toaster position="top-center" />
            </div>
        </>
    )
}

export default Page;

import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { toast, Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import Picker from 'emoji-picker-react';
function FullScreenModal({ open, onClose, loading, setLoading }) {
    const { data: session, status } = useSession();
    const [expenseName, setExpenseName] = useState("");
    const [amount, setAmount] = useState(0);
    const [dateOfExpense, setDateOfExpense] = useState(dayjs().format('YYYY-MM-DD'));
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [chosenEmoji, setChosenEmoji] = useState(null);


    useEffect(() => {

        async function fetchCategories() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.loggedUser}`,
                },
                credentials: 'include',
            });
            const { data } = await res.json();
            setCategories(data);
            setCategory(data[0]?._id);
        }
        if (session) {
            fetchCategories();
            setExpenseName("");
            setAmount(0);
            setDateOfExpense(dayjs().format('YYYY-MM-DD'));
        }
    }, [open]);

    function handleInput(event) {
        const { name, value } = event.target;
        if (name === "expense_name") {
            setExpenseName(value);
        } else if (name === "amount") {
            setAmount(value);
        } else if (name === "date_of_expense") {
            setDateOfExpense(value);
        } else if (name === "category") {
            setCategory(value);
        }
    }
    const handleEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const expenseDate = dayjs(dateOfExpense);
        const currentTime = dayjs();
        const formattedDateTime = `${expenseDate.format('YYYY-MM-DD')}T${currentTime.format('HH:mm:ss')}Z`;
        const data = {
            expense_name: expenseName,
            amount: amount,
            date_of_expense: formattedDateTime,
            category_id: category,
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': `${process.env.NEXT_PUBLIC_API_URL}`,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.loggedUser}`,
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        const result = await res.json();
        console.log(result);
        if (res.status === 201) {
            //toast success here
            toast.success('Expense added successfully');
            onClose();
        } else {
            toast.error('Error adding expense');
        }
        setLoading(!loading);

    }
    const modalStyle = {
        transition: "transform 0.3s ease-in-out",
        transform: `translateY(${open ? 0 : "100%"})`,
    };

    return (
        <div className={`fixed top-0 w-full h-full flex items-center justify-center`} style={modalStyle}>
            <div className="fixed top-0 w-full max-w-[512px] h-full bg-black opacity-50 flex items-center justify-center" onClick={onClose}></div>
            <div className="max-w-[512px] w-full h-full bg-black transform transition-all p-14 rounded-lg z-10 flex flex-col justify-center items-center" >
                <h1 className="text-2xl p-4 font-extrabold">Input your expense here</h1>
                <form onSubmit={handleSubmit} className="max-w-full w-full">
                    <div className="mb-6">
                        <label htmlFor="text" className="block mb-2 text-sm font-medium  text-white">Name</label>
                        <input type="text" name="expense_name" value={expenseName} onChange={(e) => handleInput(e)} id="expense_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type your expense name" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="amount" className="block mb-2 text-sm font-medium  text-white">Amount</label>
                        <input type="number" name="amount" id="amount" min={1} value={amount} onChange={(e) => handleInput(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Expense amount" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="date_of_expense" className="block mb-2 text-sm font-medium  text-white">Expense Date</label>
                        <input type="date" name="date_of_expense" id="date_of_expense" value={dateOfExpense} onChange={(e) => handleInput(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="category" className="block mb-2 text-sm font-medium  text-white">Category</label>
                        <select name="category" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => handleInput(e)}
                        >
                            {
                                categories.map((category, index) => (
                                    <option key={index} value={category._id} >{category.category_name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="gap-6 grid grid-cols-2">
                        <button type="button" className="text-white bg-red-500 delay-100 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-lg w-full  px-2.5 py-2.5 text-center " onClick={onClose}>Cancel</button>
                        <button type="submit" className="text-slate-900 bg-white  delay-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-lg w-full  px-2.5 py-2.5 text-center ">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FullScreenModal;

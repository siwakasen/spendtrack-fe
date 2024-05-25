
const TableExpenses = ({ rows }) => (
    <>
        <div className="w-full">
            {

                rows.map((row, index) => (
                    <div className={`flex flex-col px-1 py-4 ${index !== rows.length - 1 ? 'border-b border-zinc-700' : ''}`}
                        key={index}>
                        <div className="flex items-center justify-between pb-2">
                            <h1 className="text-lg text-gray-400">
                                {row.date_of_expenses}
                            </h1>
                            <h1 className="text-lg text-gray-400">
                                Rp. -
                                {Intl.NumberFormat("id-ID").format(row.total_expense)}
                            </h1>
                        </div>
                        {
                            row.data_expenses.map((expense, index) => (
                                <button className="w-full" key={index}>
                                    <div className="flex items-center justify-between py-4">
                                        <div className="flex flex-row items-center ">
                                            <div className="icon text-4xl pr-4 font-bold text-slate-200">
                                                {expense.category_id.icon}
                                            </div>
                                            <div className="flex flex-col items-start">
                                                <h1 className="font-bold text-slate-200">
                                                    {expense.expense_name}
                                                    <span className="ml-2 text-gray-500 font-normal">
                                                        {/* {expense.date_of_expense} */}
                                                    </span>
                                                </h1>

                                                <h1 className="text-gray-500">{expense.category_id.category_name}</h1>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <h1 className="text-lg font-semibold text-red-500">Rp. -{Intl.NumberFormat("id-ID").format(expense.amount)}</h1>
                                        </div>
                                    </div>
                                </button>

                            ))
                        }
                    </div>
                ))
            }

        </div>
    </>
);

export default TableExpenses;


const CategorizedTable = ({ rows }) => (
    <>
        {
            rows.map((row, index) => (
                <div className={`w-full ${index !== rows.length - 1 ? 'border-b border-zinc-700' : ''}`} key={index}>
                    <div className="flex items-center justify-between py-4">
                        <div className="flex flex-row items-center ">
                            <div className="icon text-4xl pr-4 font-bold text-slate-200">
                                {row.icon}
                            </div>
                            <div className="flex flex-col items-start">
                                <h1 className="font-bold text-slate-200">
                                    {row.category_name}
                                </h1>

                                <h1 className="text-gray-500">{`${row.total > 1 ? row.total + " entries" : row.total + " entry"}`}</h1>

                            </div>
                        </div>
                        <div className="flex">
                            <h1 className="text-lg font-semibold text-red-500">Rp. -{Intl.NumberFormat("id-ID").format(row.total_expense)}</h1>
                        </div>
                    </div>
                </div>
            ))
        }
    </>
);

export default CategorizedTable;

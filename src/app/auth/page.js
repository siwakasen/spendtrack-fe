"use client"
import { signIn } from 'next-auth/react';
export default function AuthPage() {
    const text = "Feeling lost when it comes to keeping track of your expenses? Look no further! With just a few taps, you can effortlessly monitor your expenses, gaining clarity on where your money is it's going. Say goodbye to confusion and hello to financial empowerment!"
    const handleLogin = () => {
        signIn("google");
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-900">
            <div className=" w-full h-full bg-black p-5 max-w-[512px]">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold bg-gradient-to-r text-transparent from-sky-300 via-indigo-400 to-teal-500 bg-clip-text pt-5">Cashtrack</h1>
                    <div className="py-10">
                        <h1 className="text-3xl font-semibold bg-gradient-to-r from-slate-500 to-indigo-300  bg-clip-text text-transparent">
                            Track your cashflow and analyze expenses at all time
                        </h1>
                        <p className="py-6 text- text-slate-400">
                            {`${text}`}
                        </p>
                    </div>
                    <div>
                        <button onClick={() => handleLogin()} className="mx-auto w-full hover:ring-2 ring-1 py-2 rounded-sm ring-zinc-600 flex items-center  gap-3 px-4 group" >
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" className="h-8 w-8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                                    c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                                    c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z">
                                </path>
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                                    C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z">
                                </path>
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                                    c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z">
                                </path>
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                                    c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z">
                                </path>
                            </svg>
                            <span className="flex-1 group-hover:tracking-wider transition-all text-white text-center justify-center">Login to continue</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

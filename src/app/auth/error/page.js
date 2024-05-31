"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthErrorPage() {
    const router = useRouter();

    useEffect(() => {
        //redirect after 2 secs
        const timer = setTimeout(() => {
            router.push('/auth');
        }, 1000);
    });

    return (
        <div className='w-full h-screen flex justify-center items-center flex-col'>
            <h1>Authentication Error</h1>

            <p>Please wait, we gonna redirect u to auth page.</p>
        </div>
    );
}

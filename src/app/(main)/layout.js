
export default function DashboardLayout({ children }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen max-h-full w-full bg-gray-900" >
            {children}
        </div >
    );
}

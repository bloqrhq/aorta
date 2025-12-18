import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Logo from '../assets/logo.png';

export default function NotFound() {
    return (
        <Layout>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-clinical dark:bg-slate-950 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
                <div className="w-full max-w-md space-y-8 bg-white dark:bg-slate-900 p-10 rounded-2xl shadow-xl border border-divider/50 dark:border-slate-800 transition-colors duration-200 text-center">
                    <div className="flex flex-col items-center">

                        <img className="h-16 w-auto mb-6" src={Logo} alt="Aorta Logo" />
                        <h1 className="text-6xl font-extrabold text-primary dark:text-white tracking-tight mb-2">
                            404
                        </h1>
                        <h2 className="text-2xl font-bold text-slate-dark dark:text-slate-200 tracking-tight">
                            Page Not Found
                        </h2>
                        <p className="mt-4 text-sm text-slate-medium dark:text-slate-400">
                            The page you are looking for does not exist or has been moved.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
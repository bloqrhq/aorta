export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-clinical dark:bg-slate-dark font-sans text-slate-dark dark:text-clinical transition-colors duration-300">
            {children}
        </div>
    );
}

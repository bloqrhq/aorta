import React from 'react';
import Navbar from '../Navbar';

interface PracticeLayoutProps {
    children: React.ReactNode;
    sidebar: React.ReactNode;
    utilityPanel: React.ReactNode;
    mobileBottom?: React.ReactNode;
    streak?: number;
}

export default function PracticeLayout({ children, sidebar, utilityPanel, mobileBottom }: PracticeLayoutProps) {
    return (
        <div className="min-h-screen bg-clinical dark:bg-slate-900 flex flex-col font-sans">
            <Navbar />

            <main className="flex-1 max-w-[1920px] w-full mx-auto p-4 sm:p-6 lg:p-6 overflow-hidden">
                <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Sidebar (Filters) - 3 cols on massive screens, 3 on lg */}
                    <div className="lg:col-span-3 xl:col-span-2 overflow-y-auto pr-2 custom-scrollbar">
                        {sidebar}
                    </div>

                    {/* Main Content - 6 cols on massive, 9 on lg (utility hides), or 7 if utility shows */}
                    {/* We'll stick to a standard 3-column layout: 2 (side) - 8 (main) - 2 (util) or similar */}
                    <div className="lg:col-span-9 xl:col-span-8 flex flex-col h-full overflow-hidden rounded-2xl bg-white dark:bg-slate-dark shadow-sm border border-divider dark:border-slate-medium/10">
                        {children}
                    </div>

                    {/* Right Utility Panel - 2 cols, hidden on lg, visible on xl? 
                        User requested 3-column desktop layout. 
                        Let's do Sidebar (2/12) - Main (8/12) - Utility (2/12) on XL
                        On LG: Sidebar (3/12) - Main (9/12) (Utility collapses or moves?)
                        Let's try to keep utility visible on LG if possible, or stack it.
                        User logic: "Responsive to 1-column on mobile".
                        Tablet: "sidebar collapses".
                    */}
                    <div className="hidden xl:block xl:col-span-2 overflow-y-auto pl-2 custom-scrollbar">
                        {utilityPanel}
                    </div>

                    {/* Mobile Bottom Content */}
                    <div className="col-span-1 lg:hidden mt-4 pb-4">
                        {mobileBottom}
                    </div>

                </div>
            </main>
        </div>
    );
}

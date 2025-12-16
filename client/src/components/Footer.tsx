export default function Footer() {
    return (
        <footer className="bg-slate-dark dark:bg-slate-950 text-white py-12 border-t border-slate-medium/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="font-bold text-2xl text-white tracking-tight">aorta</span>
                        </div>
                        <p className="text-slate-medium text-sm">
                            Empowering the next generation of medical professionals with adaptive AI learning.
                        </p>
                    </div>

                    <div>
                        <h5 className="font-bold text-lg mb-4 text-white">Platform</h5>
                        <ul className="space-y-2 text-slate-medium text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold text-lg mb-4 text-white">Resources</h5>
                        <ul className="space-y-2 text-slate-medium text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Study Guides</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold text-lg mb-4 text-white">Legal</h5>
                        <ul className="space-y-2 text-slate-medium text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-medium/20 text-center text-slate-medium text-sm">
                    &copy; {new Date().getFullYear()} Aorta. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

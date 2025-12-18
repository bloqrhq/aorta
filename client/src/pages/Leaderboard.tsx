import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
export default function Leaderboard() {
    return (
        <Layout>
            <Navbar />
            <h1 className="text-3xl font-bold text-primary mb-4">Leaderboard</h1>
            <p className="text-slate-dark">Welcome to the leaderboard. This is a protected route.</p>
        </Layout>
    );
}
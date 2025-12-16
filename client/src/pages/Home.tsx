import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProblemSolution from "../components/ProblemSolution";
import Features from "../components/Features";
import Roadmap from "../components/Roadmap";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <Layout>
            <Navbar />
            <main>
                <Hero />
                <ProblemSolution />
                <Features />
                <Roadmap />
                <FinalCTA />
            </main>
            <Footer />
        </Layout>
    );
}
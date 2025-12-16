import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

function Home() {
    return (
        <Layout>
            <Navbar />
            <Hero />
            <Features />
            <Footer />
        </Layout>
    );
}

export default Home;
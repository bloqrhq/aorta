import HeroSection from "../components/HeroSection";
import NavBar from "../components/NavBar";
function Home() {
    return (
        <>
            <section className="HomePage">
                <NavBar />
                <HeroSection />
            </section>
        </>
    );
}

export default Home;
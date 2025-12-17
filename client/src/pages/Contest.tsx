import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
export default function Contest() {
  return (
    
      <Layout>
        <Navbar />
      <h1 className="text-3xl font-bold text-primary mb-4">Contest Arena</h1>
      <p className="text-slate-dark">Welcome to the contest arena. This is a protected route.</p>
      </Layout>
    
  );
}

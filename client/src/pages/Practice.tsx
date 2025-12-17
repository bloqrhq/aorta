import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
export default function Practice() {
  return (
    
      <Layout>
      <Navbar />
      <h1 className="text-3xl font-bold text-primary mb-4">Practice Area</h1>
      <p className="text-slate-dark">Welcome to the practice area. This is a protected route.</p>
      </Layout>
    
  );
}

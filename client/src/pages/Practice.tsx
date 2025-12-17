import Layout from "../components/Layout";
import Navbar from "../components/Navbar"

export default function Practice() {
  return (
    <Layout>
      <Navbar />
      <div className="min-h-screen bg-clinical p-8">
        <h1 className="text-3xl font-bold text-primary mb-4">Practice Area</h1>
        <p className="text-slate-dark">Welcome to the practice area. This is a protected route.</p>
      </div>
    </Layout>
  );
}

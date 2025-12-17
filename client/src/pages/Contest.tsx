import Layout from "../components/Layout"
import Navbar from '../components/Navbar';
export default function Contest() {
  return (
    <Layout>
      <Navbar />
      <div className="min-h-screen bg-clinical p-8">
        <h1 className="text-3xl font-bold text-primary mb-4">Contest Arena</h1>
        <p className="text-slate-dark">
          Welcome to the contest arena. This is a protected route.
        </p>
      </div>
    </Layout>
  );
}

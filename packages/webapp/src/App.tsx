import Navbar from "./components/Navbar";
import AdminDashboard from "./components/AdminDashboard";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Navbar />
        <AdminDashboard />
      </div>
    </BrowserRouter>
  )
}

export default App

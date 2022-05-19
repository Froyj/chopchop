import Navbar from "./components/Navbar";
import AdminDashboard from "./components/AdminDashboard";
import { BrowserRouter } from "react-router-dom";
import MainSection from "./components/MainSection";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-wrap flex-col md:flex-row items-stretch">
        <Navbar />
        <MainSection>
          <AdminDashboard />
        </MainSection>
      </div>
    </BrowserRouter>
  )
}

export default App

import Navbar from "./components/Navbar";
import AdminDashboard from "./components/AdminDashboard";
import { BrowserRouter } from "react-router-dom";
import MainSection from "./components/MainSection";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex flex-col md:flex-row">
        <Navbar />
        <MainSection>
          <AdminDashboard />
        </MainSection>
      </div>
    </BrowserRouter>
  )
}

export default App

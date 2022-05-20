import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter } from 'react-router-dom';
import MainSection from './components/MainSection';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        autoClose={2000}
        position="bottom-right"
        draggable={false}
      />
      <div className="flex flex-col md:flex-row">
        <Navbar />
        <MainSection>
          <AdminDashboard />
        </MainSection>
      </div>
    </BrowserRouter>
  );
}

export default App;

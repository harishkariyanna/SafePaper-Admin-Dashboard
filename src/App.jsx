import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './store/store';
import DashboardLayout from './components/layout/DashboardLayout';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PaperSetters from './pages/PaperSetters';
import Guardians from './pages/Guardians';
import ExamCenters from './pages/ExamCenters';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/paper-setters" element={<PaperSetters />} />
            <Route path="/dashboard/guardians" element={<Guardians />} />
            <Route path="/dashboard/exam-centers" element={<ExamCenters />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
      </BrowserRouter>
    </Provider>
  );
}

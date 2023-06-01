import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DasboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DasboardPage></DasboardPage>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/authContexts';
import Routers from './Routers';
import Header from './components/header/Header';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <AuthProvider>
          <Header/>
          <Routers />
      </AuthProvider>
    </div>
    </BrowserRouter>
  );
}

export default App;

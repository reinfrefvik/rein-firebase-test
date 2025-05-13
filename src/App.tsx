import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authContexts";
import Routers from "./Routers";
import { Header } from "./components/header/Header";

function App() {
  return (
    <BrowserRouter>
      <div id="modal" />
      <div className="w-full h-screen">
        <AuthProvider>
          <Header />
          <Routers />
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;

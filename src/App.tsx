import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authContexts";
import { GamesProvider } from "./contexts/gamesProvider";
import Routers from "./Routers";
import { Header } from "./components/header/Header";

function App() {
  return (
    <BrowserRouter>
      <div id="modal" />
      <div className="w-full h-screen">
        <AuthProvider>
          <GamesProvider>
            <Header />
            <Routers />
          </GamesProvider>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { Trending } from "./pages/Trending/Trending";
import { Series } from "./pages/Series/Series";
import { Movies } from "./pages/Movies/Movies";
import { MainNavigation } from "./components/BottomNavigation";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="fixed-menu">
        <h1 className="header"> Trayt React </h1>
        <MainNavigation />
      </div>

      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Trending />} exact />
            <Route path="/movies" element={<Movies />} exact />
            <Route path="/series" element={<Series />} exact />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;

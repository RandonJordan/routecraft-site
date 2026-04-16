import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Software from "./pages/Software";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-r239" element={<Admin />} />
        <Route path="/software" element={<Software />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

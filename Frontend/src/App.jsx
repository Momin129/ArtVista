import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Footer from "./components/footer";
import axios from "axios";
import { useEffect } from "react";
import { host } from "./utility/host";
import Profile from "./pages/profile";
import DisplayModels from "./pages/displayModels";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (localStorage.getItem("token")) {
        const verify = await axios.post(`${host}/api/user/verify`, {
          token: localStorage.getItem("token"),
        });
        if (verify) {
          sessionStorage.setItem("userId", verify.data.id);
          navigate("/dashboard");
        }
      } else navigate("/");
    })();
  }, []);
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/displayModels" element={<DisplayModels />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

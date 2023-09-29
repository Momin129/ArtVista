import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./pages/main/home";
import About from "./pages/main/about";
import Contact from "./pages/contact";
import Register from "./pages/main/register";
import Login from "./pages/main/login";
import Dashboard from "./pages/user/dashboard";
import Footer from "./components/footer";
import axios from "axios";
import { useEffect } from "react";
import Profile from "./pages/user/profile";
import AdminDashboard from "./pages/admin/adminDashboard";
import UploadModel from "./pages/admin/uploadModel";
import UploadUserModel from "./components/user/uploadModel";
import Feedbacks from "./pages/admin/feedbacks";
import SearchPage from "./pages/user/searchPage";
import ShowModels from "./pages/showModels";
import ShowModelList from "./pages/admin/showModelList";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (localStorage.getItem("token")) {
        const verify = await axios.post(
          `${import.meta.env.VITE_HOST}/api/user/verify`,
          {
            token: localStorage.getItem("token"),
          }
        );
        if (verify) {
          sessionStorage.setItem("userId", verify.data.id);
          sessionStorage.setItem("role", verify.data.role);
          verify.data.role == "user"
            ? navigate("/dashboard")
            : navigate("/admin");
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
        <Route path="/upload" element={<UploadUserModel />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/displayModels" element={<ShowModels />} />
        <Route path="/searchPage" element={<SearchPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/upload" element={<UploadModel />} />
        <Route path="/admin/feedbacks" element={<Feedbacks />} />
        <Route path="/admin/showModelsList" element={<ShowModelList />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

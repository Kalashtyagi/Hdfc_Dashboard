import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Form from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Saq from "./scenes/SAQ";
import Update from "./scenes/Update/Update";
import Login from "./scenes/Login/Login";
import CreateAdmin from "./scenes/createAdmin/CreateAdmin";
import ChangePass from "./scenes/ChangePassword/ChangePass";
import ResetPass from "./scenes/Reset password/ResetPass";
import Bulkupload from "./scenes/form/Bulkupload";
import MerchantList from "./scenes/MerchantList/index";
import MerchantForm from "./scenes/MerchantList/MerchantForm";
import FormInfo from "./scenes/MerchantList/FormInfo";
import { ToastContainer } from "react-toastify";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();

  // Check if the current route is the login page
  const isLoginPage = window.location.pathname === "/";
  const isForgetPassword = window.location.pathname === "/reset-password";

  // Hide the sidebar on the login page
  const sidebarVisible = isLoginPage || isForgetPassword ? false : isSidebar;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* Conditionally render the Sidebar based on the route */}
          {sidebarVisible && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/merchantList" element={<MerchantList />} />
              <Route path="/form" element={<Form />} />
              <Route path="/update" element={<Update />} />
              <Route path="/createAdmin" element={<CreateAdmin />} />
              <Route path="/saqs" element={<Saq />} />
              <Route path="/changePassword" element={<ChangePass />} />
              <Route path="/reset-password" element={<ResetPass />} />
              <Route path="bulkupload" element={<Bulkupload />} />
              <Route path="merchantForm" element={<MerchantForm />} />
              <Route path="formInformation" element={<FormInfo />} />
            </Routes>
          </main>
        </div>
        <ToastContainer position="top-center" />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

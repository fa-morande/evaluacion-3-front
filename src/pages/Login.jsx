import React from "react";
import LoginForm from "../components/organisms/LoginForm";
import NavBar from '../components/molecules/NavBar';
import Footer from '../components/organisms/Footer';
import "../styles/pages/Login.css";

function Login() {
    const handleLogin = (email, password) => {
        console.log("Login:", email, password);
        // Aquí conectarás con el backend más tarde
    };

    return (
        <div className="main-page-container">
          <NavBar />
          <div className="page-container login-page">
              <main className="main-content">
                  <LoginForm onLogin={handleLogin} />
              </main>
          </div>
          <Footer />
        </div>
    );
}

export default Login;
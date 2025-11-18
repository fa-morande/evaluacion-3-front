import React from "react";
import LoginForm from "../components/molecules/LoginForm";
import Text from "../components/atoms/Text";
import "../styles/pages/login.css";

const Login = () => {
  return (
    <main className="login-page">
      <section className="carta-presentacion">
        <div className="carta">
          <Text variant="h1">¿Te interesan los descuentos?</Text>
          <Text variant="p">Complete el login para acceder a beneficios exclusivos</Text>
        </div>
      </section>

      <section className="login-section">
        <LoginForm />
      </section>
    </main>
  );
};

export default Login;
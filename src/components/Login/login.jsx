import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(""); // Armazena o token do reCAPTCHA
  const navigate = useNavigate();

  // Animação de queda
  const springProps = useSpring({
    from: { transform: "translateY(-100%)" },
    to: { transform: "translateY(0%)" },
    config: { tension: 170, friction: 20 },
  });

  // Função de validação de email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|br)$/;
    return emailRegex.test(email);
  };

  // Função de validação da senha
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailTouched(true);
    setEmailValid(value ? validateEmail(value) : true);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordTouched(true);
    setPasswordValid(value ? validatePassword(value) : true);
  };

  // Atualiza o token do reCAPTCHA
  const onCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!captchaToken) {
        setError("Por favor, complete o reCAPTCHA.");
        setIsLoading(false);
        return;
    }

    try {
        const response = await axios.post("https://auth-coinn2-0.onrender.com/auth/login", {
            email,
            password,
            captchaToken,
        });

        console.log("Login bem-sucedido:", response.data);

        // Armazene informações no sessionStorage
        localStorage.setItem("token", response.data.token);
        sessionStorage.setItem("isLogged", "true");
        sessionStorage.setItem("userType", "user"); // Defina de acordo com o retorno da API

        // Redirecione para a rota fornecida
        navigate(response.data.redirect_url, { replace: true });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            setError(error.response.data.message);
        } else {
            setError("Erro ao se conectar com o servidor. Tente novamente mais tarde.");
        }
        console.error("Erro ao fazer login:", error);
    } finally {
        setIsLoading(false);
    }
};


  return (
    <div className="login-container">
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <h1 className="coin-title">Coin</h1>
      <animated.div style={springProps} className="login-content">
        <div className="login-box">
          <form className="formm" onSubmit={handleLogin}>
            <div>
              <input
                className={`emailinput ${emailTouched && email ? (emailValid ? "input-success" : "input-error") : ""}`}
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => setEmailTouched(true)}
              />
            </div>
            <div>
              <input
                className={`password-input ${passwordTouched && password ? (passwordValid ? "input-success" : "input-error") : ""}`}
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => setPasswordTouched(true)}
              />
              {passwordTouched && passwordError && <div className="error-message">{passwordError}</div>}
            </div>
            <ReCAPTCHA
              sitekey="6LdulYoqAAAAABq5ooeOwpdsvho9GiE34fBgUktQ" // Chave do site
              onChange={onCaptchaChange}
            />
            {error && <div className="error-message">{error}</div>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                "Entrar"
              )}
            </button>
            <div className="forgot-password">
              <a href="/forgot-password" className="forgot-password-link">
                Esqueci a senha
              </a>
              <a className="signup-link" href="/signup">Cadastre-se agora</a>
            </div>
          </form>
        </div>
      </animated.div>
    </div>
  );
}

export default Login;

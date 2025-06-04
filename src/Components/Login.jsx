import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import "../styles/Login.css";

import api from "../services/api";
import ToastService from "../assets/toastService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    ToastService.loading("login-loading", "Validando credenciais...");
    try {
      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      ToastService.dismiss("login-loading");
      ToastService.success("Login realizado com sucesso!");
      navigate("/home");
    } catch (err) {
      ToastService.dismiss("login-loading");
      ToastService.error(
        err.response?.data?.msg || "Credenciais inválidas ou erro no servidor"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <header>
          <h1>Bem-vindo ao Ajude uma Ong</h1>
          <p className="subtitle">Faça login para acessar sua conta</p>
        </header>

        <form onSubmit={onSubmit} noValidate>
          <div className="input-group">
            <FiMail />
            <input
              type="email"
              name="email"
              placeholder="exemplo@ajudaong.com"
              value={formData.email}
              onChange={onChange}
              required
            />
          </div>

          <div className="input-group">
            <FiLock />
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={onChange}
              required
              minLength={6}
            />
          </div>

          <button type="submit" disabled={isLoading} className="login-btn">
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <FiLogIn />
                Entrar
              </>
            )}
          </button>
        </form>

        <div className="links-container">
          <Link to="/register" className="link-register">
            Não tem uma conta? Criar conta grátis!
          </Link>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;

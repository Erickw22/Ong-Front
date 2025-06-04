import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiAlertCircle, FiEdit } from "react-icons/fi";

import ToastService from "../assets/toastService";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
});

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { firstName, lastName, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    ToastService.dismiss();
    setIsLoading(true);
    ToastService.loading("register-loading", "Criando sua conta...");

    try {
      await api.post("/auth/register", formData);
      ToastService.dismiss("register-loading");
      ToastService.success("Conta criada com sucesso! Faça login.");
      navigate("/login");
    } catch (err) {
      ToastService.dismiss("register-loading");
      ToastService.error(
        err.response?.data?.msg || "Erro ao criar conta. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper" role="main" aria-label="Registro de nova conta">
      <div className="login-card">
        <h1 tabIndex={0}>
          Junte-se ao <span style={{ color: "#2e9e8f" }}>Ajuda Ong</span>
        </h1>
        <p className="subtitle">Crie sua conta grátis!</p>

        <form onSubmit={onSubmit} noValidate>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
            <div className="input-group" style={{ flex: 1 }}>
              <FiUser aria-hidden="true" />
              <input
                type="text"
                name="firstName"
                placeholder="Nome"
                value={firstName}
                onChange={onChange}
                required
                aria-label="Nome"
                disabled={isLoading}
              />
            </div>

            <div className="input-group" style={{ flex: 1 }}>
              <FiUser aria-hidden="true" />
              <input
                type="text"
                name="lastName"
                placeholder="Sobrenome"
                value={lastName}
                onChange={onChange}
                required
                aria-label="Sobrenome"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="input-group">
            <FiMail aria-hidden="true" />
            <input
              type="email"
              name="email"
              placeholder="exemplo@ajudaong.com"
              value={email}
              onChange={onChange}
              required
              aria-label="Email"
              autoComplete="email"
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <FiLock aria-hidden="true" />
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={onChange}
              minLength={6}
              required
              aria-label="Senha"
              autoComplete="new-password"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="login-btn"
            aria-busy={isLoading}
            aria-label="Criar conta"
          >
            {isLoading ? (
              <div
                className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"
                aria-hidden="true"
              ></div>
            ) : (
              <>
                <FiEdit aria-hidden="true" /> Criar Conta
              </>
            )}
          </button>
        </form>

        <div
          className="links-container"
          style={{ marginTop: "1.5rem", textAlign: "center" }}
        >
          Já tem uma conta?{" "}
          <a href="/login" className="link-register">
            Faça login aqui
          </a>
        </div>

        <ToastService.ToastContainer />
      </div>
    </div>
  );
};

export default Register;

import { ChangeEvent, useContext, useEffect, useState } from 'react';
import './Login.css';
import UsuarioLogin from '../../models/UsuarioLogin';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { RotatingLines } from 'react-loader-spinner';

function Login() {
  const navigate = useNavigate();
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );
  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  // alterando a rota depois de logar
  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home");
    }
  }, [usuario, navigate]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
      <form
        onSubmit={login}
        className="flex justify-center items-center flex-col w-1/2 gap-4"
      >
        <h2 className="text-slate-900 text-5xl">Entrar</h2>
        <div className="flex flex-col w-full">
          <label htmlFor="usuario">Usuário</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            placeholder="Usuario"
            className="border-2 border-slate-700 rounded p-2"
            onChange={atualizarEstado} // Associando o estado ao input
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            className="border-2 border-slate-700 rounded p-2"
            onChange={atualizarEstado} // Associando o estado ao input
          />
        </div>
        <button
          type="submit"
          className="rounded bg-indigo-400 flex justify-center hover:bg-indigo-900 text-white w-1/2 py-2"
          aria-busy={isLoading ? "true" : "false"}
          aria-label="Entrar"
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span>Entrar</span>
          )}
        </button>

        <hr className="border-slate-800 w-full" />

        <p>
          Ainda não tem uma conta?{" "}
          <button onClick={() => navigate("/cadastro")}>Cadastre-se</button>
        </p>
      </form>
      <div className="fundoLogin hidden lg:block"></div>
    </div>
  );
}

export default Login;

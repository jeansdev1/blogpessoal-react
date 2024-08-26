import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Usuario from '../../models/Usuario';
import './Cadastro.css'
import { useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../../services/Service';
import { RotatingLines } from 'react-loader-spinner';

function Cadastro() {


  // hook useNavigate para redirecionar
  const navigate = useNavigate();


  // estado que vai guardar os dados do meu usuario
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: ""
  })
  // estado que vai guarda a confirmacao da senha
  const [confirmarSenha, setConfirmaSenha] = useState<string>("");

  //estado que vai indicar quando a animacao (loader) sera carregada
  const [isLoading, setIsLoading] = useState<boolean>(false);


  // useEffect para monitorar o estado usuario

  useEffect(() => {
    if (usuario.id !== 0){
      retornar()

    }

  }, [usuario])


  // redireciona para o componente loign (rota/login)

  function retornar() {
    navigate('/login')
  }


  // funcao que atualiza as propriedades do estado usuario
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      // ... tres pontos, mantem tudo que ja esta, e modifica so o que eu mandar
      ...usuario,
      [e.target.name]: e.target.value

    })
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value)
  }


  async function cadastraNovoUsuario(e: FormEvent<HTMLFormElement>) {
    // impedir o comportamento padrao, que e atualizar a pagina
    e.preventDefault()

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true)

      try {

        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
        alert('Usuario cadastrado com sucesso')


      } catch (error) {
        alert('Erro ao cadastrar o usuario!')

      }
    } else {
      alert('Dados inconsistentes! Verifique as informacoes do cadastro')
      setUsuario({ ...usuario, senha: "" })
      setConfirmaSenha("")
    }

    setIsLoading(false)

  }

  console.log(usuario)
  console.log(confirmarSenha)


  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        <div className="fundoCadastro hidden lg:block"></div>
        <form onSubmit={cadastraNovoUsuario} className='flex justify-center items-center flex-col w-2/3 gap-3' >
          <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
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
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2 flex justify-center' onClick={retornar} >
              Cancelar
            </button>
            <button className='rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2' type='submit'>
              {isLoading ? <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true} /> :
                <span>Cadastrar</span>
              }
            </button>
          </div>
        </form>
      </div>

    </>
  )
}


export default Cadastro;
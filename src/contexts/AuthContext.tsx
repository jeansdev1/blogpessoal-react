import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'
import UsuarioLogin from '../models/UsuarioLogin'


interface AuthContextProps{
    usuario: UsuarioLogin
    handleLogin(usuario: UsuarioLogin): Promise<void>
    handleLogout(): void
    isLoading: boolean
}


interface AuthProviderProps{
    children: ReactNode
}

// cria uma nova instancia da API context
export const AuthContext = createContext({} as AuthContextProps)


// cria o provedor

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(usuarioLogin: UsuarioLogin){
        
        setIsLoading(true);
        
        try{

            await login(`/usuarios/logar`, usuarioLogin, setUsuario)
            alert("Usuario Autenticado com sucesso!")

        }catch(error){
            alert("Os dados do usuario estao incorretos")

        }
        
        setIsLoading(false);
    }

    function handleLogout(){
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }


  return (
    // renderizando a context na aplicacao react
    <AuthContext.Provider value={{usuario, handleLogin, handleLogout, isLoading}}>
    {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
function login(arg0: string, usuarioLogin: UsuarioLogin, setUsuario: Dispatch<SetStateAction<UsuarioLogin>>) {
    throw new Error('Function not implemented.')
}


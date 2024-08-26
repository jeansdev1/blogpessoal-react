import axios from "axios";

const api = axios.create({
    baseURL: "https://blogpessoal-pmcs.onrender.com"
})

export const cadastrarUsuario = async (url: string, dados: Object,
    setDados: Function) => {
        const resposta = await api.post(url, dados)
    setDados(resposta.data)
}
export const Login = async (url: string, dados: Object,
    setDados: Function) => {
        const resposta = await api.post(url, dados)
    setDados(resposta.data)
}


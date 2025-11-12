import logoDog from '../assets/dog-hand.webp'
import {Link, useParams} from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'


export const Confirm = () => {

    const fetchDataBackend = useFetch()
    const { token } = useParams
    const verifyToken = async() => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/confirmar/ABC123}`
        fetchDataBackend(url)
    }

    useEffect(()=> {
        verifyToken()
    },[])

    return (
        
        <div className="flex flex-col items-center justify-center h-screen">
            <ToastContainer></ToastContainer>

            <img className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600" src={logoDog} alt="image description"/>

            <div className="flex flex-col items-center justify-center">
                <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">Muchas Gracias</p>
                <p className="md:text-lg lg:text-xl text-gray-600 mt-8">Ya puedes iniciar sesión</p>
                <Link to="/login" className="p-3 m-5 w-full text-center bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Login</Link>
            </div>

        </div>
    )
}
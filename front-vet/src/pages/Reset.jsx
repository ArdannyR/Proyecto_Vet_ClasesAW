import logoDog from '../assets/dog-hand.webp'
import { useState } from 'react'
import { useEffect } from 'react'
import {useFetch} from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify'
import { useNavigate, useParams } from 'react-router'
import { useForm } from 'react-hook-form'


const Reset = () => {

    const navigate = useNavigate()
    const { token } = useParams()
    const  fetchDataBackend  = useFetch()
    const [tokenback, setTokenBack] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const changePassword = async (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/nuevopassword/${token}`
        await fetchDataBackend(url, dataForm,'POST')
        setTimeout(() => {
            if (dataForm.password === dataForm.confirmpassword) {
                navigate('/login')
            }
        }, 2000)
    }


    useEffect(() => {
        const verifyToken = async()=>{
            const url = `${import.meta.env.VITE_BACKEND_URL}/recuperarpassword/${token}`
            await fetchDataBackend(url,'GET')
            setTokenBack(true)
        }
        verifyToken()
    }, [])
    

    return (
        <div className="flex flex-col items-center justify-center h-screen">

            <ToastContainer />
            
            <h1 className="text-3xl font-semibold mb-2 text-center text-gray-500">
                Bienvenido nuevamente
            </h1>
            <small className="text-gray-400 block my-4 text-sm">
                Pro favor, ingrese los siguientes datos
            </small>
            <img
                className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600"
                src={logoDog}
                alt="image description"
            />

            {tokenback && (

                <form className="w-80" onSubmit={handleSubmit(changePassword )}>

                    <div className="mb-1">

                        {/* Campo nueva contraseña */}
                        <label className="mb-2 block text-sm font-semibold">Nueva contraseña</label>
                        <input type="password" placeholder="Ingresa tu nueva contraseña"
                            className="block w-full rounded-md border border-gray-300 py-1 px-1.5 text-gray-500"
                            {...register("password", { required: "La contraseña es obligatoria" })}
                        />
                            {errors.password && <p className="text-red-800">{errors.password.message}</p>}
                        
                        
                        {/* Campo repetir contraseña */}
                        <label className="mb-2 block text-sm font-semibold">Confirmar contraseña</label>
                        <input type="password" placeholder="Repite tu contraseña"
                            className="block w-full rounded-md border border-gray-300 py-1 px-1.5 text-gray-500"
                            {...register("confirmpassword", { required: "La contraseña es obligatoria" })}
                        />
                            {errors.confirmpassword && <p className="text-red-800">{errors.confirmpassword.message}</p>}

                    </div>

                    <div className="mb-3">
                        <button className="bg-gray-600 text-slate-300 border py-2 
                        w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 
                        hover:text-white">
                            Enviar
                        </button>

                    </div>
                    
                </form>
            )}
        </div>
    )
}

export default Reset

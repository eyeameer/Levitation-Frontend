import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loginUser, setLoading, signupUser } from "./loginSlice";
import { setIsRegisteredUser } from "./loginSlice";
import { Loader } from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { loginInfo } from "../../interfaces/login";
export default function LoginPage() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<loginInfo>({ mode: "all" });
    const { isLoggedIn, loading, isRegisteredUser } = useAppSelector((state) => state.account)
    const dispatch = useAppDispatch()

    const onSubmitLogin: SubmitHandler<loginInfo> = (data) => {


        dispatch(loginUser(data))

    }
    const onSubmitRegister: SubmitHandler<loginInfo> = (data) => {

        dispatch(signupUser(data))

    }
    React.useEffect(() => {
        if (isLoggedIn) {
            dispatch(setLoading(true))
            setTimeout(() => {
                dispatch(setLoading(false))
                navigate('/home')
            }, 2000)

        }
    }, [isLoggedIn, navigate]);
    const login = <div className="text-white flex flex-col font-metroRegular justify-center items-center bg-slate-700 h-screen w-full">
        <form onSubmit={handleSubmit(onSubmitLogin)} className="flex flex-col justify-between" >

            <label className="font-metroSemiBold" htmlFor="#numberIn">Email:</label>
            <input
                className="text-black p-1 rounded-full" type="text" id='numberIn'
                {...register('email', {
                    required: {
                        value: true,
                        message: `please provide email`
                    }
                })}
            />
            {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
            <label className="font-metroSemiBold" htmlFor="#passwordIn">Password:</label>
            <input
                className="text-black p-1 rounded-full" type="password" id='passwordIn'
                {...register('password', {
                    required: {
                        value: true,
                        message: `please provide password`
                    }
                })}
            />
            {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
            <button disabled={!isValid} className="bg-sky-600 disabled:bg-gray-400 mt-3 rounded-3xl py-2">Login</button>
            <div>Haven't registered? Register <a onClick={() => dispatch(setIsRegisteredUser(false))} className="text-blue-300 underline cursor-pointer">here</a></div>
        </form>
    </div>
    return (
        <div>
            {loading && <Loader />}
            {!isRegisteredUser ?
                <div className="min-h-screen">
                    <div className="text-white flex flex-col font-metroRegular justify-center items-center bg-slate-700 h-screen w-full">

                        <form onSubmit={handleSubmit(onSubmitRegister)} className="flex flex-col justify-between" >
                            <label className="font-metroSemiBold" htmlFor="#NameIn">Name:</label>
                            <input className="text-black p-1 rounded-full" type="text" id='NameIn'
                                {...register('name', {
                                    required: {
                                        value: true,
                                        message: `please provide name`
                                    }
                                })}
                            />
                            {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                            <label className="font-metroSemiBold" htmlFor="#numberIn">Email:</label>
                            <input className="text-black p-1 rounded-full" type="text" id='numberIn'
                                {...register('email', {
                                    required: {
                                        value: true,
                                        message: `please provide email`
                                    }
                                })}
                            />
                            {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                            <label className="font-metroSemiBold" htmlFor="#passwordIn">Password:</label>
                            <input
                                className="text-black p-1 rounded-full" type="password" id='passwordIn'
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: `please provide password`
                                    }
                                })}
                            />
                            {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                            <button disabled={!isValid} className="bg-sky-600 mt-3 disabled:bg-gray-400 rounded-3xl py-2">register</button>
                            <div>Already registered? Login <a onClick={() => dispatch(setIsRegisteredUser(true))} className="text-blue-300 underline cursor-pointer">here</a></div>

                        </form>
                    </div>
                </div>
                :
                login
            }
            <ToastContainer />
        </div>
    )
}


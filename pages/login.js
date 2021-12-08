import React, { useContext, useState } from 'react'
import Layout from '../components/Layout'
import { EyeIcon, EyeOffIcon, LockClosedIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { AUTENTICAR_USUARIO } from '../config/mutations';
import Loading from '../components/Loading';
import { AlertaContext } from '../context/alertas/AlertaState';
import {useRouter} from 'next/router'

const Login = () => {
    const [visible, setVisible] = useState(true);
    const [loading, setloading] = useState(false);
    const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);
    const router = useRouter();

    const {mensajeError, mostrarMensajeError, ocultarMensajeError} = useContext(AlertaContext);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                    .trim()
                    .required('El email es obligatorio 😡'),
            password: Yup.string()
                    .trim()
                    .required('El password es obligatorio 😡'),
        }),
        onSubmit: async values => {
            // console.log(values);
            setloading(true);
            try {
                const {data} = await autenticarUsuario({
                    variables: {
                        input: values
                    }
                });
                // console.log(data.autenticarUsuario);
                // setMensaje('Su cuenta se registro exitosamente');
                //TODO: guardar token en local storage  
                const {token} = data.autenticarUsuario;
                localStorage.setItem('token', token);
                formik.resetForm();
                //TODO: redireccionar hacia clientes
                router.push('/');
            } catch (e) {
                // console.log(e);
                mensajeError(e.message);
                mostrarMensajeError();
            }
            setloading(false);
        }
    })

    // if(loading) return <Loading />;

    return (
        <>
            <Layout>
                {loading&&<Loading />}
                <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-transparent max-w-md w-full rounded-xl backdrop-filter backdrop-blur-lg border-gray-300 border-default border-opacity-50 shadow-2xl">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                        <img
                            className="mx-auto h-14 w-auto"
                            src="./img/logo.png"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
                        <p className="mt-2 text-center text-sm text-gray-900">
                            O{' '}
                            <Link href="/registro">
                                <a className="font-semibold text-gray-800 hover:text-gray-900">
                                    Registrate <strong className='text-yellow-500 ml-1'>!Aquí¡</strong>
                                </a>
                            </Link>
                        </p>
                        </div>
                        
                        <form className="mt-8 space-y-6 bg-transparent" onSubmit={formik.handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-800 text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent font-bold placeholder-opacity-70"
                                    placeholder="correo@correo.com"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email&&formik.errors.email&&<p className='pt-1 text-yellow-400 font-semibold mb-1'>
                                ⚠️ {formik.errors.email}
                                </p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <div className='relative'>
                                    <input
                                        id="password"
                                        name="password"
                                        type={visible?"password":"text"}
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-opacity-70 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent font-bold placeholder-gray-800"
                                        placeholder="Password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {visible
                                    ?
                                        <EyeIcon 
                                            className="z-10 h-5 w-5 text-gray-900 group-hover:text-indigo-400 absolute right-5 top-2 cursor-pointer" 
                                            aria-hidden="true"
                                            onClick={_ => setVisible(false)} 
                                        />
                                    :
                                        <EyeOffIcon 
                                            className="h-5 w-5 text-gray-900 group-hover:text-indigo-400 absolute right-5 top-2 cursor-pointer" 
                                            aria-hidden="true" 
                                            onClick={_ => setVisible(true)} 
                                        />
                                    }
                                </div>
                                {formik.touched.password&&formik.errors.password&&<p className='pt-1 text-yellow-400 font-semibold'>
                                ⚠️ {formik.errors.password}
                                </p>}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-opacity-70 focus:ring-indigo-500 border-gray-300 rounded bg-transparent"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 font-semibold">
                                Recordarme
                            </label>
                            </div>

                            <div className="text-sm">
                            <a href="#" className="font-bold text-gray-900 hover:text-black">
                                ¿Olvidaste tu password?
                            </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
                                onClick={_ => {
                                    ocultarMensajeError();
                                }}
                            >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-white-500 group-hover:text-white" aria-hidden="true" />
                            </span>
                                Ingresar
                            </button>
                        </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Login

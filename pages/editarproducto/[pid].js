import React, {useContext, useState} from 'react'
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import SuccessModal from '../../components/SuccessModal';
import { useMutation, useQuery } from '@apollo/client';
import { OBTENER_PRODUCTO } from '../../config/querys';
import { AlertaContext } from '../../context/alertas/AlertaState';
import { ACTUALIZAR_PRODUCTO } from '../../config/mutations';

const EditarProducto = () => {
    const router = useRouter();
    // console.log(router.query.pid);

    const [loading, setloading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const {mensajeError, mostrarMensajeError, ocultarMensajeError} = useContext(AlertaContext);
    const {data, loading: loadingObtenerProducto, error: errorObtenerProducto} = useQuery(OBTENER_PRODUCTO, {
        skip: router.query.pid === undefined,
        variables: {
            id: router.query.pid
        }
    });

    const {actualizarProducto} = useMutation(ACTUALIZAR_PRODUCTO, {
        update(cache, {data: {actualizarProducto}}) {
            const {obtenerProducto} = cache.readQuery({
                query: OBTENER_PRODUCTO,
                variables: {
                    id: router.query.pid
                }
            });
            cache.writeQuery({
                query: OBTENER_PRODUCTO,
                variables: {
                    id: router.query.pid
                },
                data: {
                    obtenerProducto: actualizarProducto
                }
            })
        }
    });

    const formik = useFormik({
        initialValues: {
            nombre: '',
            precio: 1,
            stock: 1,
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                    .trim()
                    .required('El Nombre es obligatorio')
                    .test('len', 'Su nombre puede ser más descriptivo 😅', val => val?.length >= 2),
            precio: Yup.number()
                    .required('El precio de la empresa es obligatorio')
                    .positive('El precio no puede ser negativo ni cero'),
            stock: Yup.number()
                    .required('El nombre de la empresa es obligatorio')
                    .positive('El Stock no puede ser negativo').
                    integer('Solo puede agregar numero enteros'),
        }),
        onSubmit: async values => {
            setloading(true);
            const {nombre, precio, stock} = values;
            if(formik.initialValues.nombre === nombre && formik.initialValues.precio === precio && formik.initialValues.stock === stock) {
                console.log('No se enviaron datos :D');
                // setLoading(false);
                return;
            }
            try {
                const {data} = await actualizarProducto({
                    variables: {
                        input: {
                            nombre: values.nombre,
                            existencia: values.stock,
                            precio: values.precio
                        }
                    }
                });
                if (data) {
                    formik.resetForm();
                    setMensaje(`${nombre} fue actualizado correctamente`);
                    setSuccess(true);
                } 
            } catch (e) {
                console.log(e);
                mensajeError(e.message);
                mostrarMensajeError();
            }
            setloading(false);
        }
    });

    if(loadingObtenerProducto) return <Loading />;
    if(errorObtenerProducto) return <ErrorPage />;
    // console.log(data);
    if(data.obtenerProducto) {
        formik.initialValues.nombre = data.obtenerProducto.nombre;
        formik.initialValues.precio = data.obtenerProducto.precio;
        formik.initialValues.stock = data.obtenerProducto.existencia;
    }

    return (
        <Layout>
        {loading&&<Loading />}
        {success&&<SuccessModal mensaje={mensaje} setSuccess={setSuccess} />}
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={formik.handleSubmit}>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Actualizar Producto</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
                    </div>

                    <div className="space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Nombre
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2 relative">
                                <input
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    autoComplete="given-name"
                                    className="max-w-lg block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:max-w-xs sm:text-base border-gray-300 rounded-md"
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.nombre&&formik.errors.nombre&&<div 
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none top-0"
                                >
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                </div>}
                            </div>
                            {formik.touched.nombre&&formik.errors.nombre&&<p className="mt-2 text-sm text-red-600" id="nombre">
                                {formik.errors.nombre}
                            </p>}
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="precio" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Precio
                            </label>
                            <div className="relative mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="number"
                                    name="precio"
                                    id="precio"
                                    autoComplete="family-name"
                                    className="max-w-lg block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:max-w-xs sm:text-base border-gray-300 rounded-md"
                                    value={formik.values.precio.toFixed(2)}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.precio&&formik.errors.precio&&<div 
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none top-0"
                                    >
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                </div>}
                            </div>
                            {formik.touched.precio&&formik.errors.precio&&<p className="mt-2 text-sm text-red-600" id="precio">
                                {formik.errors.precio}
                            </p>}
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Stock
                            </label>
                            <div className="relative mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    id="stock"
                                    name="stock"
                                    type="number"
                                    min="1"
                                    autoComplete="email"
                                    className="max-w-lg block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-base border-gray-300 rounded-md sm:max-w-xs"
                                    value={formik.values.stock}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.stock&&formik.errors.stock&&<div 
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none top-0"
                                        >
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                </div>}
                            </div>
                            {formik.touched.stock&&formik.errors.stock&&<p className="mt-2 text-sm text-red-600" id="stock-error">
                                {formik.errors.stock}
                            </p>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <div className="flex justify-end">
                <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    onClick={_ => router.back()}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none"
                    onClick={_ => {
                        ocultarMensajeError();
                    }}
                >
                    Actualizar Producto
                </button>
                </div>
            </div>
        </form>
    </Layout>
    )
}

export default EditarProducto

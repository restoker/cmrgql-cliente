import React, { useContext } from 'react'
import { PedidoContext } from '../../context/pedido/PedidoState';
import Pedido from './Pedido';



const ResumenPedido = () => {
    const {productos} = useContext(PedidoContext);
    
    // const [productoselect, setProductoselect] = useState({});
    // console.log(productos);
   

    if(!productos || productos?.length === 0) return (
        <div className="sm:col-span-4 sm:col-start-2">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 bg-white">
                3. Ajusta las cantidades de los Productos
            </label>
            <div className="mt-1">
                <h2 id="summary-heading" className="text-lg font-medium text-gray-900 text-center my-10">
                    No tienen ningun producto agregado 🥺
                </h2>
            </div>
        </div>
    );

    

    return (
        <div className="sm:col-span-4 sm:col-start-2">
            <label className="block text-sm font-medium text-gray-700 bg-white">
                3. Ajusta las cantidades de los Productos
            </label>
            <div className="mt-1">
                <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                    Resumen Orden
                </h2>

                <ul className="text-sm font-medium text-gray-900 divide-y divide-gray-200">
                {productos.map((product) => (
                    <Pedido
                        key={product.id}  
                        product={product} 
                    />
                ))}
                </ul>
            </div>
        </div>
    )
}

export default ResumenPedido

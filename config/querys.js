import {gql} from '@apollo/client';

export const OBTENER_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
            id
            nombre
            precio
            existencia
        }
    }
`;

export const OBTENER_CLIENTES_USUARIO = gql`
    query obtenerClientesUsuario($id: ID!) {
        obtenerClientesUsuario(id: $id) {
            id
            nombre
            apellido
            empresa
            email
            telefono
        }
    }
`;

export const OBTENER_USUARIO = gql`
    query obtenerUsuario {
        obtenerUsuario {
            id
            nombre
            email
        }
    }
`;

export const OBTENER_CLIENTE = gql`
    query obtenerCliente($id: ID!) {
        obtenerCliente(id: $id) {
            id
            nombre
            apellido
            empresa
            email
            telefono
            vendedor
        }
    }
`;

export const OBTENER_PRODUCTO = gql`
    query obtenerProducto($id: ID!) {
        obtenerProducto(id: $id) {
            id
            nombre
            existencia
            precio
            creado
        }
    }
`;

export const OBTENER_PEDIDOS = gql`
    query obtenerPedidosUsuario {
        obtenerPedidosUsuario {
            id
            cliente {
              id
              email
              nombre
              apellido
              telefono
            }
            pedido {
              id
              cantidad
              nombre
              precio
            }
            creado
            total
            estado
            vendedor
        }
    }
`;

export const OBTENER_MEJORES_VENDEDORES = gql`
    query mejoresVendedores {
        mejoresVendedores {
            vendedor {
                nombre
                apellido
                email
            },
            total
        }
    }
`;

export const OBTENER_MEJORES_CLIENTES = gql`
    query mejoresClientes {
        mejoresClientes {
            cliente {
                nombre
                vendedor
                _id
            }
            total
        }
    }
  
`;

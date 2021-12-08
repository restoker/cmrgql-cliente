import 'tailwindcss/tailwind.css'
import AlertaState from '../context/alertas/AlertaState'
import {ApolloProvider} from '@apollo/client'
import client from '../config/apollo'
import PedidoState from '../context/pedido/PedidoState'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AlertaState>
        <PedidoState>
          <Component {...pageProps} />
        </PedidoState>
      </AlertaState>
    </ApolloProvider>
  )
}

export default MyApp;

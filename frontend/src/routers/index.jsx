import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login";
import CadastroClientePage from "../pages/CadastroCliente";
import Produtos from "../pages/Produtos";
import Pedidos from "../pages/Pedidos";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />,
    },
    {
        path: '/cadastro',
        element: <CadastroClientePage />,
    },
    {
        path: '/produto',
        element: <Produtos />,
    },
    {
        path: '/pedido',
        element: <Pedidos />,
    }
]);

export default router;
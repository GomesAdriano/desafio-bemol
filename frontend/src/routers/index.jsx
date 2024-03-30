import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login";
import CadastroClientePage from "../pages/CadastroCliente";
import Produtos from "../pages/Produtos";

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
    }
]);

export default router;
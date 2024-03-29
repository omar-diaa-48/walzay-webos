import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
import MainLayout from "../components/layout/MainLayout";
import Catalogue from "../pages/Catalogue";
import OrdersHistory from "../pages/OrdersHistory";
import Checkout from "../pages/Checkout";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import CheckAuth from "../components/layout/CheckAuth";
import Main from "../pages/Main";
import Error from "../pages/Error";

const router = createBrowserRouter([
    {
        element: <CheckAuth><ProtectedRoute><MainLayout /></ProtectedRoute></CheckAuth>,
        children: [
            {
                path: "/",
                element: <Main />,
            },
            {
                path: "/catalogue",
                element: <Catalogue />,
            },
            {
                path: "/orders",
                element: <OrdersHistory />,
            },
            {
                path: "/checkout",
                element: <Checkout />,
            }
        ],
        errorElement: <Error />
    },
    {
        path: "sign-in",
        element: <SignIn />,
    },
]);

export default router;
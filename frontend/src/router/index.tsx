import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
import MainLayout from "../components/layout/MainLayout";
import Catalogue from "../pages/Catalogue";
import OrdersHistory from "../pages/OrdersHistory";
import Checkout from "../pages/Checkout";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import CheckAuth from "../components/layout/CheckAuth";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
    {
        element: <CheckAuth><ProtectedRoute><MainLayout /></ProtectedRoute></CheckAuth>,
        children: [
            {
                path: "/",
                element: (
                    <div className="flex flex-col justify-center items-center">
                        <h1>Hello World!</h1>
                    </div>
                ),
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
            },
            {
                path: "/profile",
                element: <Profile />,
            }
        ]
    },
    {
        path: "sign-in",
        element: <SignIn />,
    },
]);

export default router;
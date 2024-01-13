import { Link, createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
import MainLayout from "../components/layout/MainLayout";
import Catalogue from "../pages/Catalogue";
import OrdersHistory from "../pages/OrdersHistory";
import Checkout from "../pages/Checkout";
import ProtectedRoute from "../components/layout/ProtectedRoute";

const router = createBrowserRouter([
    {
        element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
        children: [
            {
                path: "/",
                element: (
                    <div className="flex flex-col justify-center items-center">
                        <h1>Hello World!</h1>
                        <Link to="/sign-in">Sign In</Link>
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
            }
        ]
    },
    {
        path: "sign-in",
        element: <SignIn />,
    },
]);

export default router;
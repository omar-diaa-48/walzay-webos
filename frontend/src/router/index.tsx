import { Link, createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
import MainLayout from "../components/layout/MainLayout";
import Catalogue from "../pages/Catalogue";
import OrdersHistory from "../pages/OrdersHistory";

const router = createBrowserRouter([
    {
        element: <MainLayout />,
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
            }
        ]
    },
    {
        path: "sign-in",
        element: <SignIn />,
    },
]);

export default router;
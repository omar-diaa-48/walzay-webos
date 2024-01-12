import { Link, createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div className="flex justify-center">
                <h1>Hello World</h1>
                <Link to="/sign-in">Sign In</Link>
            </div>
        ),
    },
    {
        path: "sign-in",
        element: <SignIn />,
    },
]);

export default router;
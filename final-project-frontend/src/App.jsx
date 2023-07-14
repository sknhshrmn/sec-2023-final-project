import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditMyAccount from "./pages/EditMyAccount";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/products",
      element: <Products />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/my-account/edit",
      element: <EditMyAccount />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    // {
    //   path: "/admin",
    //   element: <Admin />,
    // },
    // {
    //   path: "/users",
    //   element: <Users />,
    // },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

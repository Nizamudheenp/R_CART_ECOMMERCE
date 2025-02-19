import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./e-components/Layout"
import ProductList, { productLoader } from "./e-components/Productlist"
import Productcard from "./e-components/Productcard"
import Cart from "./e-components/Cart"
import { useState } from "react"
import Register from "./e-components/Register"
import Login from "./e-components/Login"
import ProtectedRoute from "./e-components/ProtectedRoute"
import AdminDashboard from "./e-components/adimnDashboard"
import EditProduct from "./e-components/EditProduct"
import AddProduct from "./e-components/Addproduct"



function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm} />,
      loader: productLoader,
      children: [
        {
          path: "/",
          element: <ProductList searchTerm={searchTerm} />,
          loader: productLoader
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/productItem/:productId",
              element: <Productcard />,
            },
            {
              path: "/cart",
              element: <Cart />
            },
            {
              path: "/adminDashboard",
              element: <AdminDashboard />
            },

            {
              path: "/adminDashboard/AddProduct",
              element: <AddProduct />
            },
            {
              path: "/adminDashboard/EditProduct/:id",
              element: <EditProduct />
            }

          ]
        }

      ]
    }
  ])


  return <RouterProvider router={router} />
}

export default App

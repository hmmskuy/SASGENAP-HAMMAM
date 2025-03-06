import { ProductList, ProductDetail, ProfileDetail } from "./Home";
import LoginPage from "./LoginPage";
import Help, { CreateUser, ReadUser, UpdateUser } from "./Help";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
<link href="./output.css" rel="stylesheet"></link>;

const ErrorPage = () => (
  <div className="text-center p-10">
    <h1 className="text-3xl font-bold text-red-600">404 - Page Not Found</h1>
    <p className="text-gray-500">
      Oops! Halaman yang Anda cari tidak ditemukan.
    </p>
  </div>
);

const router = createBrowserRouter([
  { path: "/", element: <ProductList />, errorElement: <ErrorPage /> },
  { path: "/login", element: <LoginPage />, errorElement: <ErrorPage /> },
  {
    path: "/product/:id",
    element: <ProductDetail />,
    errorElement: <ErrorPage />,
  }, // Pastikan ini sesuai
  { path: "/profile", element: <ProfileDetail />, errorElement: <ErrorPage /> },
  { path: "/help", element: <Help />, errorElement: <ErrorPage /> },
  {
    path: "/help/create",
    element: <CreateUser />,
    errorElement: <ErrorPage />,
  },
  { path: "/help/read", element: <ReadUser />, errorElement: <ErrorPage /> },
  {
    path: "/help/update/:id",
    element: <UpdateUser />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

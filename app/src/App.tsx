import { Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import { AdminRoute, ProtectedRoute } from "./components/routing/ProtectedRoute"
import { BasicLayout } from "./layouts/BasicLayout"
import { UserLayout } from "./layouts/UserLayout"
import { Home } from "./pages/Home"
import { RoomForm } from "./pages/room/RoomForm"
import { RoomList } from "./pages/room/RoomList"
import { UserLogin } from "./pages/user/UserLogin"
import { UserRegistration } from "./pages/user/UserRegistration"
import { AdminLayout } from "./layouts/AdminLayout"

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to="/home"
            replace
          />
        }
      />

      <Route
        path="/"
        element={<BasicLayout />}
      >
        <Route
          path="home"
          element={<Home />}
        />
        <Route
          path="rooms"
          element={<RoomList />}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="rooms/create"
            element={<RoomForm />}
          />
          <Route
            path="rooms/edit/:id"
            element={<RoomForm />}
          />
        </Route>
      </Route>

      <Route
        path="/user"
        element={<UserLayout />}
      >
        <Route
          path="register"
          element={<UserRegistration />}
        />
        <Route
          path="login"
          element={<UserLogin />}
        />
      </Route>

      <Route element={<AdminRoute />}>
        <Route
          path="/admin"
          element={<AdminLayout />}
        >
          <Route
            path="rooms"
            element={<RoomList />}
          />
        </Route>
      </Route>
    </Routes>
  )
}

export default App

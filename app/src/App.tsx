import { Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import { BasicLayout } from "./layouts/BasicLayout"
import { UserLayout } from "./layouts/UserLayout"
import { Home } from "./pages/Home"
import { RoomForm } from "./pages/RoomForm"
import { Rooms } from "./pages/Rooms"
import { UserLogin } from "./pages/user/UserLogin"
import { UserRegistration } from "./pages/user/UserRegistration"

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
          element={<Rooms />}
        />
        <Route
          path="rooms/create"
          element={<RoomForm />}
        />
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
    </Routes>
  )
}

export default App

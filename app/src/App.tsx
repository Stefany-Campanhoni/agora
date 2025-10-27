import { Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import { AdminRoute, ProtectedRoute } from "./components/routing/ProtectedRoute"
import { AdminLayout } from "./layouts/AdminLayout"
import { BasicLayout } from "./layouts/BasicLayout"
import { UserLayout } from "./layouts/UserLayout"
import { Dashboard } from "./pages/dashboard/Dashboard"
import { Home } from "./pages/Home"
import { ReserveRoomForm } from "./pages/reservation/ReservationForm"
import { UserReservations } from "./pages/reservation/UserReservations"
import { RoomForm } from "./pages/room/forms/CreateRoomForm"
import { AdminRoomList } from "./pages/room/list/AdminRoomList"
import { UserRoomList } from "./pages/room/list/UserRoomList"
import { UserEdit } from "./pages/user/UserEdit"
import { UserList } from "./pages/user/UserList"
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
          path="reservations"
          element={
            <>
              <ProtectedRoute />
              <UserReservations />
            </>
          }
        />

        <Route path="rooms">
          <Route
            index
            element={<UserRoomList />}
          />
          <Route
            path=":id/reserve"
            element={<ReserveRoomForm />}
          />
          <Route element={<AdminRoute />}>
            <Route
              path="create"
              element={<RoomForm />}
            />
          </Route>
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

        <Route
          path="edit"
          element={<UserEdit />}
        />
      </Route>

      <Route element={<AdminRoute />}>
        <Route
          path="/admin"
          element={<AdminLayout />}
        >
          <Route
            path="dashboard"
            element={<Dashboard />}
          />
          <Route path="rooms">
            <Route
              index
              element={<AdminRoomList />}
            />
            <Route
              path="edit/:id"
              element={<RoomForm />}
            />
          </Route>

          <Route
            path="users"
            element={<UserList />}
          />
        </Route>
      </Route>
    </Routes>
  )
}

export default App

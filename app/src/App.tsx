import { Route, Routes } from "react-router-dom"
import "./App.css"
import { BasicLayout } from "./layouts/BasicLayout"
import { Home } from "./pages/Home"
import { Rooms } from "./pages/Rooms"
import { RoomForm } from "./pages/RoomForm"

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<BasicLayout />}
      >
        <Route
          index
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
    </Routes>
  )
}

export default App

import Nav from "react-bootstrap/Nav"
import { useLocation, useNavigate } from "react-router-dom"
import logo from "../../assets/logo.png"
import { useModal } from "../../hooks/useModal"
import { UserModal } from "../modal/UserModal"
import "./header.css"
import { useAuth } from "../../hooks/useAuth"

export function Header() {
  const { isModalOpen, toggleModal } = useModal()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleUserIconClick = () => {
    toggleModal()
  }

  return (
    <>
      <UserModal
        show={isModalOpen}
        onHide={handleUserIconClick}
      />
      <div className="header-container">
        <div className="logo-container">
          <img
            src={logo}
            alt="Agora Logo"
            className="logo"
          />
        </div>
        <Nav
          variant="pills"
          activeKey={location.pathname}
          className="header-nav"
          onSelect={(selectedKey) => {
            navigate(selectedKey || "/home")
          }}
        >
          <Nav.Item>
            <Nav.Link
              eventKey="/home"
              className="nav-link text-light"
            >
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="/rooms"
              className="nav-link text-light"
            >
              Salas Disponíveis
            </Nav.Link>
          </Nav.Item>
          {isAuthenticated && (
            <Nav.Item>
              <Nav.Link
                eventKey="/reservations"
                className="nav-link text-light"
              >
                Minhas Reservas
              </Nav.Link>
            </Nav.Item>
          )}
        </Nav>
        <div
          className="user-icon"
          onClick={handleUserIconClick}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="user-icon-svg"
          >
            <path
              d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
              fill="currentColor"
            />
            <path
              d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </>
  )
}

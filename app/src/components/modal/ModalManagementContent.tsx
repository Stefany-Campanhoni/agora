import { useEffect, useState } from "react"
import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import { FaCog, FaEnvelope, FaShieldAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { loadUser } from "../../service/user/user.api"
import type { User } from "../../service/user/user.types"
import "./ModalManagementContent.css"
import { useModal } from "../../hooks/useModal"

export function ModalManagementContent() {
  const [user, setUser] = useState<User | null>(null)
  const { logout, isAdmin } = useAuth()
  const { toggleModal } = useModal()
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      try {
        const userData = await loadUser()
        setUser(userData)
      } catch (error) {
        navigate(-1)
      }
    })()
  }, [])

  return (
    <>
      <Modal.Body className="user-modal-body">
        {user ? (
          <Container
            fluid
            className="user-info-container"
          >
            <Row className="mb-4">
              <Col
                xs={12}
                className="text-center"
              >
                <div className="user-avatar">
                  <FaUser className="avatar-icon" />
                </div>
                <h5 className="user-name mt-3">{user.name}</h5>
              </Col>
            </Row>

            <Row className="user-details">
              <Col
                xs={12}
                className="mb-3"
              >
                <div className="info-item">
                  <div className="info-icon">
                    <FaUser />
                  </div>
                  <div className="info-content">
                    <p className="info-label">Nome</p>
                    <p className="info-value">{user.name}</p>
                  </div>
                </div>
              </Col>
              <Col xs={12}>
                <div className="info-item">
                  <div className="info-icon">
                    <FaEnvelope />
                  </div>
                  <div className="info-content">
                    <p className="info-label">Email</p>
                    <p className="info-value">{user.email}</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        ) : (
          <div className="loading-container">
            <p className="loading-text">Estou de olho ein 👀</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="user-modal-footer">
        {user && (
          <>
            {isAdmin && (
              <Button
                className="modal-btn admin-btn"
                onClick={() => {
                  toggleModal()
                  navigate("/admin/dashboard")
                }}
              >
                <FaShieldAlt className="btn-icon" />
                Área Admin
              </Button>
            )}

            <Button
              className="modal-btn edit-btn"
              onClick={() => navigate("user/edit", { state: { user } })}
            >
              <FaCog className="btn-icon" />
              Editar Perfil
            </Button>
            <Button
              className="modal-btn logout-btn"
              onClick={() => logout()}
            >
              <FaSignOutAlt className="btn-icon" />
              Sair
            </Button>
          </>
        )}
      </Modal.Footer>
    </>
  )
}

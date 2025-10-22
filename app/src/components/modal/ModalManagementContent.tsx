import { useEffect, useState } from "react"
import { Button, Modal, Container, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { loadUser } from "../../api/user/user.api"
import type { UserResponse } from "../../api/user/user.responses"
import { useAuth } from "../../hooks/useAuth"
import { FaUser, FaEnvelope, FaCog, FaSignOutAlt, FaShieldAlt } from "react-icons/fa"
import "./ModalManagementContent.css"

export function ModalManagementContent() {
  const [user, setUser] = useState<UserResponse | null>(null)
  const { logout, isAdmin } = useAuth()
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
        {isAdmin && (
          <Button
            className="modal-btn admin-btn"
            onClick={() => navigate("/admin")}
          >
            <FaShieldAlt className="btn-icon" />
            Área Admin
          </Button>
        )}

        {user && (
          <>
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

import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { loadUser } from "../../api/user/user.api"
import type { UserResponse } from "../../api/user/user.responses"
import { useAuth } from "../../hooks/useAuth"
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
          <div className="user-info">
            <p>
              <strong>Nome:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        ) : (
          <p>Estou de olho ein 👀</p>
        )}
      </Modal.Body>
      <Modal.Footer className="user-modal-footer">
        {user && (
          <>
            {isAdmin && (
              <Button
                className="user-modal-btn custom-btn"
                onClick={() => navigate("/admin")}
              >
                Area Admin
              </Button>
            )}

            <Button
              className="user-modal-btn custom-btn"
              onClick={() => navigate("user/edit", { state: { user } })}
            >
              Editar Perfil
            </Button>
            <Button
              className="user-modal-btn custom-btn"
              onClick={() => logout()}
            >
              Sair
            </Button>
          </>
        )}
      </Modal.Footer>
    </>
  )
}

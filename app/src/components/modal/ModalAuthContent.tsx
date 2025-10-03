import { Button, Modal } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export function ModalAuthContent(props: { onHide: () => void }) {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/user/login")
    props.onHide()
  }

  const handleRegister = () => {
    navigate("/user/register")
    props.onHide()
  }

  return (
    <>
      <Modal.Body className="user-modal-body">
        <p className="user-modal-text">Escolha uma opção para continuar:</p>
      </Modal.Body>
      <Modal.Footer className="user-modal-footer">
        <Button
          className="user-modal-btn login-btn"
          onClick={handleLogin}
        >
          Fazer Login
        </Button>
        <Button
          className="user-modal-btn register-btn"
          onClick={handleRegister}
        >
          Registrar-se
        </Button>
      </Modal.Footer>
    </>
  )
}

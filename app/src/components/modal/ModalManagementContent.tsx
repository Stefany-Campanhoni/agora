import { Button, Modal } from "react-bootstrap"
import { useAuth } from "../../hooks/useAuth"

export function ModalManagementContent() {
  const {} = useAuth()

  return (
    <>
      <Modal.Body className="user-modal-body">
        <p className="user-modal-text">Escolha uma opção para continuar:</p>
      </Modal.Body>
      <Modal.Footer className="user-modal-footer">
        <Button className="user-modal-btn login-btn">Fazer Login</Button>
        <Button className="user-modal-btn register-btn">Registrar-se</Button>
      </Modal.Footer>
    </>
  )
}

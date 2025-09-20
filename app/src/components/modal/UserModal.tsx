import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import "./UserModal.css"

type UserModalProps = {
  onHide: () => void
  show: boolean
}

export function UserModal(props: UserModalProps) {
  const handleLogin = () => {
    alert("Login clicked")
    props.onHide()
  }

  const handleRegister = () => {
    alert("Register clicked")
    props.onHide()
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="user-modal"
    >
      <Modal.Header
        closeButton
        className="user-modal-header"
      >
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="user-modal-title"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="modal-user-icon"
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
          Acesso do Usuário
        </Modal.Title>
      </Modal.Header>
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
    </Modal>
  )
}

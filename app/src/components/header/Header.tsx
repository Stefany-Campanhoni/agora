import Nav from 'react-bootstrap/Nav';
import "./header.css"

export function Header() {
  return (
    <Nav variant="pills" defaultActiveKey="/home" className="header-nav">
      <Nav.Item>
        <Nav.Link eventKey="/home" className='nav-link text-light'>Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/rooms" className='nav-link text-light'>Salas Disponíveis</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/rooms/create" className='nav-link text-light'>Criar Reserva</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
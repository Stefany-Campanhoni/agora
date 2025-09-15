import Nav from 'react-bootstrap/Nav';
import "./header.css"

export function Header() {
  return (
    <Nav variant="pills" defaultActiveKey="/home" className="header-nav">
      <Nav.Item>
        <Nav.Link href="/home" className='nav-link text-light'>Salas Disponíveis</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" className='nav-link text-light'>Criar Reserva</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
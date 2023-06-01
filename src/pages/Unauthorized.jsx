import { Button, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
  const navigate = useNavigate();
  const handleOnClick = () => {
    localStorage.removeItem('admin');
    navigate('/login');
  };
  return (
    <Row>
      <Col md={7}></Col>
      <Col md={10}>
        <h2>Unauthorized</h2>
        <h4>You do not have access to the requested page.Click! Log out and try another account</h4>
        <Button type="primary" onClick={handleOnClick}>
          LogOut
        </Button>
      </Col>
      <Col md={7}></Col>
    </Row>
  );
}

export default Unauthorized;

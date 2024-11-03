import React, { useEffect } from 'react'; 
import Col from 'react-bootstrap/Col';
import '../styles/home.component.css'; 
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useNavigate } from "react-router-dom";
import Moda_Masculina from "../../../../assests/moda-masculina-destaque-usa-se-quiser.webp";
import Moda_Feminina from "../../../../assests/short_saia_2037_1_06f0bb5affc8f4d67b2ca7573f4bdd4a.webp";
import Adidas from "../../../../assests/adidas.png";
import Nike from "../../../../assests/Nike.webp";
import Lacoste from "../../../../assests/Lacoste.jpg";
import { FormattedMessage } from 'react-intl';
function Home() {

  return (
    
    <div>
      <div style={{border:'1px solid black'}}>
        <Container fluid>
          <Row>
            <Col className="promo-text">
            <FormattedMessage id='home_frete_gratis' defaultMessage="Frete Gratis para todos os produtos"></FormattedMessage>
              <div className="divider"></div>
              <FormattedMessage id='home_descoto_10_porcentos' defaultMessage=" 10% de desconto em todos os produtos"></FormattedMessage>
              <div className="divider"></div>
              <FormattedMessage id='home_desconto_30_porcentos' defaultMessage="Desconto de 30% para pagamento em dinheiro"></FormattedMessage>
              <div className="divider"></div>
              <FormattedMessage id='home_parcela' defaultMessage=" Parcela em até 10X em vários tipos de cartão"></FormattedMessage>
            </Col>
          </Row>
        </Container>
      </div>
    <br></br>
      <section className="banner-sections">
          <Container>
            <Row className="justify-content-center">
                <Col md={6} className="text-center">
                    <div style={{ marginBottom: '20px' }}>
                        <Link to={'/moda_masculina'}><Image src={Moda_Masculina} className="banner-image" roundedCircle /></Link>
                        <h4><center> <h4> <FormattedMessage id='home_moda_Masculina' defaultMessage="Moda Masculina"></FormattedMessage></h4></center></h4>
                    </div>
                </Col>
                <Col md={6} className="text-center">
                    <div>
                        <Link to={'/moda_feminina'}><Image src={Moda_Feminina} className="banner-image" roundedCircle /></Link>
                        <center><h4> <FormattedMessage id='home_moda_Feminina' defaultMessage="Moda Feminina"></FormattedMessage></h4></center>
                    </div>
                </Col>
            </Row>
          </Container>
      </section>
      <br></br>
      <br></br>

     <h1 className="text-center"><FormattedMessage id='home_melhores_marcas' defaultMessage="AS MELHORES MARCAS"></FormattedMessage></h1>
     <br></br>
      <div>
          <Container>
            <Row className="justify-content-center">
                <Col md={4} className="text-center">
                    <Image src={Adidas} className="brand-image" rounded/>
                </Col>
                <Col md={4} className="text-center">
                    <Image src={Nike} className="brand-image" rounded/>
                </Col>
                <Col md={4} className="text-center">
                    <Image src={Lacoste} className="brand-image" rounded/>
                </Col>
            </Row>
          </Container>
      </div>
      <br></br>
      <br></br>
      <br></br>      
    </div>
   
  );  
}



export default Home;

import React, {Component} from 'react';
import { Button, Row, Navbar} from 'react-bootstrap';
import './css/estilo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'

class TelaInicio extends Component {

	render() {

	    return (
            <div>
                <Navbar expand="xl" className='no-padding menu'>
                    <Navbar.Brand href="#home" className='no-padding'>
                        <img
                            alt=""
                            src="/logoAutoMail.jpg"
                            width="420"
                            height="90"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Brand href="#" className="title-menu">Estação de Controle</Navbar.Brand>
                    <Navbar.Brand className="contato-menu">   
                        <Button className="botao-contato"> Contato</Button>
                    </Navbar.Brand>
                </Navbar>
               
                <Row>
                    <div class="col-sm-12" style={{position:"absolute", top:"50%"}}>
                        <div class="text-center">
                            <Link to="/telaPrincipal" className="botao-incio" size='lg' >Iniciar <FontAwesomeIcon icon="sign-in-alt"/> </Link>

                        </div>
                    </div>
                </Row>
            </div>
	);
  }
}


export default TelaInicio;

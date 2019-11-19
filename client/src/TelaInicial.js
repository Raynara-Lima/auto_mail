import React, {Component} from 'react';
import { Button, Row, Navbar, Spinner} from 'react-bootstrap';
import './css/estilo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'
import axios from 'axios';

class TelaInicial extends Component {

    constructor(props){
        super(props);
        this.state = {
        iaLoading: false,
        }
    }
    interceptorRequest = axios.interceptors.response.use((response) => {
        // do something with the response data
        console.log(response);
      
        return response;
      }, error => {
          console.log("erro: " + error.response)
        // handle the response error
        return Promise.reject(error);
      });
    iniciar = () =>{
        this.setState({isLoading: true})
        axios('http://localhost:8080/api/setData', {
            mode:'no-cors',
            method: 'POST',
            // headers:{'Content-Type' : 'application/json', 'Access-Control-Allow-Origin': '*'},
            params: JSON.stringify({  modo: "1", destino: "",sentido: ""})
        })
            .then(response => {  this.setState({isLoading: false})})
            .catch(err => console.log(err));

    
    }
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
                {this.state.isLoading ? 
                <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>: ""}
                <Row>
                    <div class="col-sm-12" style={{position:"absolute", top:"50%"}}>
                        <div class="text-center">
                            <Link to="/telaPrincipal" className="botao-incio" size='lg' 
                            onClick={this.iniciar}
                             >
                                Iniciar <FontAwesomeIcon icon="sign-in-alt"/> </Link>

                        </div>
                    </div>
                </Row>
               
            </div>
	);
  }
}


export default TelaInicial;

import React, {Component} from 'react';
import {Button, Row, Navbar, Spinner, Alert} from 'react-bootstrap';
import './css/estilo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'
import axios from 'axios';

class TelaInicial extends Component {

    constructor(props){
        super(props);
        this.state = {
        iaLoading: false,
            mostrarAlerta: false,
            msgAlerta: '',
            typeAlert: ''
        }
    }
    interceptorRequest = axios.interceptors.response.use((response) => {
        // do something with the response data
        console.log(response);
      
        return response;
      }, error => {
        if(error.message === "Network Error"){
            error.menssagem = "Erro de conexão, verifique sua conexão de internet ou contate o Administrador."

            return error

        }
          console.log("erro: " + error.message)
        // handle the response error
        return Promise.reject(error);
      });

    iniciar = () =>{
        this.setState({isLoading: true})
        axios('http://localhost:5000/api/setData', {
            mode:'no-cors',
            method: 'POST',
            // headers:{'Content-Type' : 'application/json', 'Access-Control-Allow-Origin': '*'},
            params: JSON.stringify({  modo: "1", destino: "",sentido: ""})
        })
            .then(response => {
                if(response.status === 200) {
                    window.location.href = "/telaPrincipal"
                    this.setState({isLoading: false})
                }else{
                    this.setState({mostrarAlerta: true, msgAlerta: response.menssagem})

                }
            })
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
                            <Link  className="botao-incio" size='lg'
                            onClick={this.iniciar}
                             >
                                Iniciar <FontAwesomeIcon icon="sign-in-alt"/> </Link>

                        </div>
                    </div>
                </Row>
                <Alert variant="danger" show={this.state.mostrarAlerta} onClose={false} bsPrefix="alerta-tela-inicial">
                    {this.state.msgAlerta}
                </Alert>
            </div>
	);
  }
}


export default TelaInicial;

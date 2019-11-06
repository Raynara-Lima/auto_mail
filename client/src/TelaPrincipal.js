import React, {Component} from 'react';
import ImageMapper from 'react-image-mapper';
import axios from 'axios';
import { Button, Col, Row, Navbar, Card, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css';
import {Link} from 'react-router-dom'
import './css/estilo.css'
// import {Scroll} from 'react-scroll';
const URL = "./mapa.jpg"

class TelaPrincipal extends Component {

    constructor(props){
        super(props);
        this.state = {
            response: '',
            hoveredArea: '',
            msg: '',
            moveMsg: '',
            data: '',
            mensagem: '',
            mensagemRecebida: '',
            showModal: false,
            map:  {name: "my-map",
                areas: [
                    // { name: "1", shape: "poly", coords: [25,33,27,300,128,240,128,94], preFillColor: "green", fillColor: "blue"  },
                    { name: "2", shape: "poly", coords: [125,270,145,270,145,250,125,250], preFillColor: "pink"  },
                    { name: "1", shape: "poly", coords: [110,260,110,270,125,270,125,260], preFillColor: "black"  },
                    // { name: "5", shape: "circle", coords: [170, 100, 25 ] },
                ]},
            dadosMailCar:{
                instru: {
                    accx: " ", 
                    accy: " ", 
                    vg: " ",
                    velox: " ", 
                    veloy: " ", 
                    distan: " ",
                    angulo: " ",
                    bate: " ", 
                    enco1: " ",
                    enco2: " ",
                    ultra1: " ",
                    ultra2: " ", 
                    ultra3: " "},
                    status: {
                        modo: " "
                    },
                    coord: {
                        x: " ",
                        y: " "},
                    erros: []
            },
            corIconeBateria:  ''
        }
    }
    componentDidMount() {
        // setInterval(this.desenharTrajetoria, 1000);
         this.getMensagem()
       // this.setMensagem()
    }


    enterArea(area) {
        this.setState({ hoveredArea: area });
    }
    load() {
        this.setState({ msg: "Interact with image !" });
    }

    leaveArea(area) {
        this.setState({ hoveredArea: null });
    }

    getTipPosition(area) {
        return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
    }
    moveOnImage(evt) {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
        this.setState({
            moveMsg: `You moved on the image at coords ${JSON.stringify(coords)} !`
        });
    }
    moveOnArea(area, evt) {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
        this.setState({
            moveMsg: `You moved on ${area.shape} ${
                area.name
                } at coords ${JSON.stringify(coords)} !`
        });
    }
    clicked(area) {
        this.setState({
            msg: `You clicked on ${area.shape} at coords ${JSON.stringify(
                area.coords
            )} !`
        });
    }
    clickedOutside(evt) {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
        this.setState({
            msg: `You clicked on the image at coords ${JSON.stringify(coords)} !`
        });
    }
    getMensagem = () => {
        axios.get('http://localhost:8080/api/getData', {mode:'no-cors'})
            .then(response => {
                this.setState({dadosMailCar: response.data.data});
                console.log(response.data)
            }	).catch(err => console.log(err));

    };
    setMensagem = () => {
        axios('http://localhost:8080/api/setData', {
            mode:'no-cors',
            method: 'POST',
            // headers:{'Content-Type' : 'application/json', 'Access-Control-Allow-Origin': '*'},
            params: JSON.stringify({msg: this.state.mensagem})
        })
            .then(response => this.setState({mensagemRecebida: ''}))
            .catch(err => console.log(err));

    };

    desenharTrajetoria = () =>{
        let p0
        let p2
        let state = this.state
        for(var i = 0; i < 10; ++i) {
            p0 = this.state.map.areas[1].coords[0] -= 0.2
            p2 = this.state.map.areas[1].coords[2] -=0.2
        }
        state.map.areas[1].coords[0] = p0
        state.map.areas[1].coords[2] = p2
        this.setState(state)
    }

    visaualizarSensores = () =>{
        window.open('/sensores')

    }
    handleCloseModal = () => {
        let state = this.state;
        state.showModal = false;
        this.setState(state);
    };
    handleShowModal = () => {
        let state = this.state;
        state.showModal = true;
        this.setState(state);
    };
    getCamposModalObservacao = (event) => {
        return {
            showModal: this.state.showModal
        }
    };
    getFuncoesModalObservacao = (event) => {
        return {
            handleShowModal: this.handleShowModal,
            handleCloseModal: this.handleCloseModal,
        }
    };
    iconeBateria = () =>{
        if(this.state.dadosMailCar.instru.bate === 100){
            this.state.corIconeBateria = 'red'
            return 'battery-quarter';
        }else{
            this.state.corIconeBateria = 'green'            
            return 'battery-full';

        }
    }
    render(){
        return(
            <div >
                 <Navbar expand="xl" className='no-padding menu'>
                    <Navbar.Brand href="#home" className='no-padding'>
                        <img
                            alt=""
                            src="/logoAutoMail.jpg"
                            width="350"
                            height="70"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Brand href="#" className="title-menu">Estação de Controle</Navbar.Brand>
                    <Navbar.Brand className="contato-menu">   
                        <Button className="botao-contato"> Contato</Button>
                    </Navbar.Brand>
                    <Navbar.Brand className="contato-menu">   
                        <Link className="botao-sair" to='/'> Desconectar <FontAwesomeIcon icon='times'></FontAwesomeIcon></Link>
                    </Navbar.Brand>
                </Navbar>
              
                <Card className="card-tela-principal" style={{boxShadow: 'rgb(169, 166, 166) 2px 2px 12px'}}>
                    <Card.Body>
                        <Row  style={{paddingLeft: '1%'}}>
                            <Col xs={12} md={3}>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label style={{fontSize: '15px'}}>Modo de Operação</Form.Label>
                                    <Form.Control size='sm'
                                    type="password"  readOnly/>
                                </Form.Group>
                            </Col>
                            <Col  xs={12} md={3} className='botoes-tela-principal'  style={{ paddingTop: '1.5%', paddingLeft: '7%'}}>
                                <Button size='sm' onClick={this.handleShowModal}>Modo Expresso</Button>
                            </Col>
                            <Col xs={12} md={4} className='botoes-tela-principal' style={{ paddingTop: '1.5%', paddingLeft: '4%'}}>
                                <Button size='sm' onClick={()=> this.visaualizarSensores()}>Visualizar dados dos sensores</Button>
                            </Col>
                            <Col  xs={12} md={2} className='botoes-tela-principal'  style={{ paddingLeft: '3%', paddingTop: '1%' }}>
                                {this.state.dadosMailCar.instru.bate !== " " || this.state.dadosMailCar.instru.bate !== null ?
                                <FontAwesomeIcon icon={this.iconeBateria} color={this.state.corIconeBateria}size="4x"/>
                                : ""
                                }
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
               
            
                <Row style={{paddingTop: '70px'}}>
                    <Col md={6} style={{marginLeft: '17%'}}>
                        <ImageMapper src={URL} map={this.state.map} width={850}
                                     onLoad={() => this.load()}
                                     onClick={area => this.clicked(area)}
                                     onMouseEnter={area => this.enterArea(area)}
                                     onMouseLeave={area => this.leaveArea(area)}
                                     onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
                                     onImageClick={evt => this.clickedOutside(evt)}
                                     onImageMouseMove={evt => this.moveOnImage(evt)}
                        />
                        {	this.state.hoveredArea &&
                        <span className="tooltip"
                              style={{ ...this.getTipPosition(this.state.hoveredArea)}}>
            { this.state.hoveredArea && this.state.hoveredArea.name}
        </span>
                        }
                        <pre className="message">
                        {this.state.msg ? this.state.msg : null}
                    </pre>
                        <pre>{this.state.moveMsg ? this.state.moveMsg : null}</pre>
                    </Col>
                </Row>

            </div>
        )
    }
}
export default TelaPrincipal;
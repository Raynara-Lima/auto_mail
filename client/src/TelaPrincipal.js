import React, {Component} from 'react';
import ImageMapper from 'react-image-mapper';
import axios from 'axios';
import { Button, Col, Row, Navbar, Card, Form, Overlay, Tooltip} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css';
import {Link} from 'react-router-dom'
import './css/estilo.css'
import ModalModoExpr from './ModalModoExpr';
import socketIOClient from "socket.io-client";
const URL = "./mapaV2.png"


class TelaPrincipal extends Component {

    constructor(props){
        super(props);
        this.state = {
            placement: '',
            hoveredArea: '',
            msg: '',
            moveMsg: '',
            data: '',
            mensagem: '',
            mensagemRecebida: '',
            showModal: false,
            map:  {name: "my-map",
                areas: [
                    { name: "car", shape: "poly", coords: [], preFillColor: "#C59C52",  strokeColor: "#F0E68C" },

                    { name: "roda1", shape: "circle", coords: [], preFillColor: "black" },
                    { name: "roda2", shape: "circle", coords: [] , preFillColor: "black" },
                    { name: "roda3", shape: "circle", coords: [], preFillColor: "black" },
                    { name: "roda4", shape: "circle", coords: [], preFillColor: "black" },
                
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
                        x: 1799.8,
                        y: 0
                    },
                    erros: []
            },
            corIconeBateria:  '',
            endpoint: "http://localhost:8080",
            color: 'white'
        }
        // const socket = socketIOClient(this.state.endpoint);
        // socket.on('getData', (json) =>{
        //     console.log(json)
        //     this.setState({dadosMailCar: json})
        // })

    }
    getMensagemTeste() {
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('getData')

    }
    
    componentDidMount() {
    this.posicionarCar(this.state.dadosMailCar.coord.x, this.state.dadosMailCar.coord.y)
    // this.intervalo = setInterval( () =>  this.getMensagemTeste(), 1000);
   // this.intervalo = setInterval( () =>  this.desenharTrajetoria(), 1000);

       // this.setMensagem()
    }


    enterArea(area) {
        this.setState({ hoveredArea: area });
    }
    load() {
        this.setState({ msg: "Interact with image !" });
    }

    leaveArea(area) {
        this.setState({ hoveredArea: area });
    }

    getTipPosition(positionTooltip) {
        return { top: `${positionTooltip[1]}px`, left: `${positionTooltip[0]}px` , opacity: "1"};
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
    clicked = (area) =>{
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
    // getMensagem = () => {
    //     axios.get('http://localhost:8080/api/getData', {mode:'no-cors'})
    //         .then(response => {
    //             this.setState({dadosMailCar: response.data.data});
    //             console.log(response.data)
    //         }	).catch(err => console.log(err));

    // };
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

    posicionarCar = ( xCm, yCm) =>{
    
        let x = 28+ (xCm * 0.246)
        let y = 221 + (yCm * 0.366)
        let valorDecCord1e3 = 0, valorDecCord0e6 = 0
        let valoresIncRoda1 = []
        let valoresIncRoda2 = []
        let valoresIncRoda3 = []
        let valoresIncRoda4 = []
        let valorDecRodasY = 0, valorDecRodasX = 0
        let map = this.state.map
        let mapCar = map.areas[0]

        //Carrinho
       //x em cm 0
        if(xCm === 0){
            mapCar.coords[0] = x
            mapCar.coords[2] = x + 5.5
            mapCar.coords[4] = x + 5.5
            mapCar.coords[6] = x

            valorDecCord1e3 = 7.12
            
            valoresIncRoda1[0] = 0
            valoresIncRoda1[1] = 2

            valoresIncRoda2[0] = 0
            valoresIncRoda2[1] = 5.13

            valoresIncRoda3[0] = 5
            valoresIncRoda3[1] = 2

            valoresIncRoda4[0] = 5
            valoresIncRoda4[1] = 5.13
                   
        }else{
            mapCar.coords[0] = x
            mapCar.coords[2] = x + 7.12
            mapCar.coords[4] = x + 7.12
            mapCar.coords[6] = x
            
            valorDecCord1e3 = 5.5

            valoresIncRoda1[0] = 2
            valoresIncRoda1[1] = 0

            valoresIncRoda2[0] = 5.13
            valoresIncRoda2[1] = 0

            valoresIncRoda3[0] = 2
            valoresIncRoda3[1] = 5

            valoresIncRoda4[0] = 5.13
            valoresIncRoda4[1] = 5
         }
         if(xCm > 910){
            valorDecRodasX = 7.12
            mapCar.coords[0] = x - 7.12
            mapCar.coords[2] = x 
            mapCar.coords[4] = x 
            mapCar.coords[6] = x - 7.12
         }else{
            mapCar.coords[0] = x
            mapCar.coords[2] = x + 7.12
            mapCar.coords[4] = x + 7.12
            mapCar.coords[6] = x
         }
        if(yCm > 105){
            valorDecRodasY = valorDecCord1e3
            mapCar.coords[1] = y - valorDecCord1e3
            mapCar.coords[3] = y - valorDecCord1e3
            mapCar.coords[5] = y 
            mapCar.coords[7] = y 
        }else{
            mapCar.coords[1] = y
            mapCar.coords[3] = y
            mapCar.coords[5] = y + valorDecCord1e3
            mapCar.coords[7] = y + valorDecCord1e3
     
        }

            //Roda 1
            map.areas[1].coords[0] = x + valoresIncRoda1[0] - valorDecRodasX
            map.areas[1].coords[1] = y + valoresIncRoda1[1] - valorDecRodasY
            map.areas[1].coords[2] = 1

            //Roda 2
            map.areas[2].coords[0] = x +  valoresIncRoda2[0] - valorDecRodasX
            map.areas[2].coords[1] = y + valoresIncRoda2[1] - valorDecRodasY
            map.areas[2].coords[2] = 1

            //Roda 3
            map.areas[3].coords[0] = x +  valoresIncRoda3[0] - valorDecRodasX
            map.areas[3].coords[1] = y + valoresIncRoda3[1] - valorDecRodasY
            map.areas[3].coords[2] = 1

            //Roda 4
            map.areas[4].coords[0] = x + valoresIncRoda4[0] - valorDecRodasX
            map.areas[4].coords[1] = y +  valoresIncRoda4[1] - valorDecRodasY
            map.areas[4].coords[2] = 1

            //Tooltip
            let positionTooltip = []
            let xi = 9, yi = 221, xf = 490, yf = 299

            if (x <= xi && y >= yi && this.state.dadosMailCar.coord.y <=yf){
                this.state.placement = 'right'
                positionTooltip[0] = x + 25
                positionTooltip[1] = y - 3  - valorDecRodasY
            } else if(y >= (yi + 30) && x > xi && x < xf ){ 
                this.state.placement = 'top'
                positionTooltip[0] = x + 13
                positionTooltip[1] = y - 42  - valorDecRodasY
            }else{
                this.state.placement = 'bottom'
                positionTooltip[0] = x + 13
                positionTooltip[1] = y + 10  //- valorDecRodasY
             }
 

            this.setState({map: map, hoveredArea: positionTooltip})
        
    }
    desenharTrajetoria = () =>{

        //MbM para mb1
        if(this.state.dadosMailCar.coord.y < 180 && this.state.dadosMailCar.coord.x == 0){
            for(var i = 0; i <= 5; i++){
                this.posicionarCar(this.state.dadosMailCar.coord.x , (this.state.dadosMailCar.coord.y + 5))
                this.state.dadosMailCar.coord.y = this.state.dadosMailCar.coord.y + 5
            }
        }else if ( this.state.dadosMailCar.coord.x < 1790  && this.state.dadosMailCar.coord.y >= 180) {
            for(var i = 0; i <= 5; i++){
                this.posicionarCar((this.state.dadosMailCar.coord.x + 25) , this.state.dadosMailCar.coord.y )
                this.state.dadosMailCar.coord.x = this.state.dadosMailCar.coord.x + 25            }  
        }else if(this.state.dadosMailCar.coord.x >= 1790 && this.state.dadosMailCar.coord.y > 30){
            for(var i = 0; i <= 5; i++){
                this.posicionarCar(this.state.dadosMailCar.coord.x , (this.state.dadosMailCar.coord.y - 5))
                this.state.dadosMailCar.coord.y = this.state.dadosMailCar.coord.y - 5
            }

        }else {
            for(var i = 0; i <= 5; i++){
                this.posicionarCar((this.state.dadosMailCar.coord.x - 25) , this.state.dadosMailCar.coord.y )
                this.state.dadosMailCar.coord.x = this.state.dadosMailCar.coord.x - 25            }  
        }
        
    }

    visaualizarSensores = () =>{
        window.open('/sensores')

    }
    closeModal = () => {
        let state = this.state;
        state.showModal = false;
        this.setState(state);
    };
    showModal = () => {
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
        if(this.state.dadosMailCar.instru.bate <= 100 && this.state.dadosMailCar.instru.bate >=90 ){
            this.state.corIconeBateria = 'green'
            return 'battery-full';
        }else if(this.state.dadosMailCar.instru.bate <= 20 && this.state.dadosMailCar.instru.bate>=10){
            this.state.corIconeBateria = 'red'            
            return 'battery-quarter';
        }else{
            return 'battery-full';
        }
    }
    modoOperacao = () =>{
        if(this.state.dadosMailCar.status.modo === 0){
            return 'Desligado';
        }else if(this.state.dadosMailCar.status.modo === 1){
            return 'Circular';
        }else if(this.state.dadosMailCar.status.modo === 2){
            return 'Expresso';
        }else if(this.state.dadosMailCar.status.modo === 3){
            return 'Recarga';
        }else{
            return '';
        }
    }
  
    
    render(){
            //const socket = socketIOClient(this.state.endpoint);

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
                <ModalModoExpr showModal={this.state.showModal} closeModal={this.closeModal}/>         
                <Card className="card-tela-principal" style={{boxShadow: 'rgb(169, 166, 166) 2px 2px 12px'}}>
                    <Card.Body>
                        <Row  style={{paddingLeft: '1%'}}>
                            <Col xs={12} md={3}>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label style={{fontSize: '15px'}}>Modo de Operação</Form.Label>
                                    <Form.Control size='sm' value={this.modoOperacao()}
                                    type="text"  readOnly/>
                                </Form.Group>
                            </Col>
                            <Col  xs={12} md={3} className='botoes-tela-principal'  style={{ paddingTop: '1.5%', paddingLeft: '7%'}}>
                                <Button size='sm' onClick={this.showModal}>Modo Expresso</Button>
                            </Col>
                            <Col xs={12} md={4} className='botoes-tela-principal' style={{ paddingTop: '1.5%', paddingLeft: '4%'}}>
                                <Button size='sm' onClick={()=> this.visaualizarSensores()}>Visualizar dados dos sensores</Button>
                            </Col>
                            <Col  xs={12} md={2} className='botoes-tela-principal'  style={{ paddingLeft: '3%', paddingTop: '1%' }}>
                                {this.state.dadosMailCar.instru.bate !== " " || this.state.dadosMailCar.instru.bate !== null || this.state.dadosMailCar.instru.bate!== undefined?
                                <FontAwesomeIcon icon={this.iconeBateria()} color={this.state.corIconeBateria}size="4x"/>
                                : ""
                                }
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
               
            
                <Row style={{paddingTop: '70px'}}>
                    <Col md={6} style={{marginLeft: '30%'}}>
                        <ImageMapper src={URL} map={this.state.map} width={500}
                                    //  onLoad={() => this.load()}
                                    //  onClick={area => this.clicked(area)}
                                    //  onMouseEnter={area => this.enterArea(area)}
                                    //  onMouseLeave={area => this.leaveArea(area)}
                                     onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
                                    //  onImageClick={evt => this.clickedOutside(evt)}
                                     onImageMouseMove={evt => this.moveOnImage(evt)}
                        />
                         
                        {this.state.hoveredArea && (      
                            <Tooltip id="overlay-example"
                            placement={this.state.placement} 
                            style={{ ...this.getTipPosition(this.state.hoveredArea) }}>
                                MailCar
                            </Tooltip>
                    
                       )}
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
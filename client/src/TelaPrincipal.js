import React, {Component} from 'react';
import ImageMapper from 'react-image-mapper';
import axios from 'axios';
import {FormControl, Button, Col, Row, Modal} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faChevronDown, faChevronUp, faTrash, faEdit, faCheckCircle, faTimesCircle, faBatteryFull, faTimes, faSignOutAlt}  from '@fortawesome/free-solid-svg-icons';
import './App.css';
import ModalModoExpr from "./ModalModoExpr";

library.add(faEnvelope,
    faKey,
    faChevronDown,
    faChevronUp,
    faTrash,
    faEdit,
    faCheckCircle,
    faTimesCircle,
    faBatteryFull,
    faTimes,
    faSignOutAlt);
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
            modo_operacao: '',
            showModal: false,
            map:  {name: "my-map",
                areas: [
                    // { name: "1", shape: "poly", coords: [25,33,27,300,128,240,128,94], preFillColor: "green", fillColor: "blue"  },
                    { name: "2", shape: "poly", coords: [125,270,145,270,145,250,125,250], preFillColor: "pink"  },
                    { name: "1", shape: "poly", coords: [110,260,110,270,125,270,125,260], preFillColor: "black"  },
                    // { name: "5", shape: "circle", coords: [170, 100, 25 ] },
                ]}
        }
    }
    componentDidMount() {
        // setInterval(this.desenharTrajetoria, 1000);
         this.getMensagem()

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
                this.setState({modo_operacao: response.data.data.modo_operacao});
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
        //    return <Redirect to='/sensores'/>

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

    render(){
        return(
            <div >
                <Row style={{backgroundColor:'black'}}>
                    <Col xs={12} md={6} >
                        <img src='./logoAutoMail.jpg' width='50%' />
                    </Col>
                    <Col  xs={6} md={4}style={{marginLeft: '-22%',fontSize: '34px', color: 'white', marginTop: '15px'}}>
                        <label>Estação de Controle</label>
                    </Col>
                    <Col xs={6} md={2}  style={{marginTop: '22px',  color: 'white'}}>
                        <Button style={{backgroundColor:'#333', borderColor: '#333'}}> Contato</Button>
                    </Col>
                    <Col xs={6}md={2}  style={{marginTop: '22px'}}>
                        <Button style={{backgroundColor:'#333', borderColor: '#333'}}>Desconectar <FontAwesomeIcon icon='times'></FontAwesomeIcon></Button>
                    </Col>

                </Row>
                <Row style={{paddingTop: '70px', boxShadow: "2px 2px 12px #a9a6a6", width: "80%", height: "125px", padding: "25px", backgroundColor: "#fcfcfc", borderWidth: "2px",marginTop: "43px", border: '1px solid #b5abab',
                    marginLeft: '127px'}}>

                    <Col  xs={12} md={3}>
                        <label>Modo de operação</label>
                        <FormControl type='text' disabled value='' value={this.state.modo_operacao}/>
                    </Col>
                    <Col  xs={12} md={3} style={{    paddingTop: '32px', paddingLeft: '70px'}}>
                        <Button onClick={this.handleShowModal}>Modo Expresso</Button>
                    </Col>


                    <ModalModoExpr showModal={this.state.showModal} closeModal={this.handleCloseModal}/>

                    <Col  xs={12} md={4} style={{ paddingTop: '32px'}}>

                        <Button onClick={()=> this.visaualizarSensores()}>Visualizar dados dos sensores</Button>

                    </Col>
                    <Col  xs={12} md={2} style={{ paddingTop: '8px' }}>
                        <FontAwesomeIcon
                            icon='battery-full' size="5x"/>
                    </Col>
                </Row>

                <Row style={{paddingTop: '70px'}}>
                    <Col md={6} style={{marginLeft: '13%'}}>
                        {/* <img src='./mapa.jpg'></img> */}
                        <ImageMapper src={URL} map={this.state.map} width={1000}
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
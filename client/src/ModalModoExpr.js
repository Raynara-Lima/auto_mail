import React, {Component} from 'react';
import {Badge, Form,Dropdown, DropdownButton, Modal, FormControl, Button, Col, Row, ButtonToolbar,ToggleButtonGroup, ToggleButton,Image, Container, ButtonGroup} from 'react-bootstrap';
import ImageMapper from 'react-image-mapper';
import axios from 'axios';

const URL = "./mapaV2.jpg"
var value


class ModalModoExpr extends Component {

    constructor() {
        super();
    
        this.state = {
          sentido: "",
          destino: ""
        }
      }

      
    enviarDadosModoExpr = () =>{
        axios('http://localhost:8080/api/setData', {
            mode:'no-cors',
            method: 'POST',
            // headers:{'Content-Type' : 'application/json', 'Access-Control-Allow-Origin': '*'},
            params: JSON.stringify({ modo: "3" ,destino: this.state.destino ,sentido: this.state.sentido })
        })
            .then(response => console.log(response.status))
            this.props.closeModal()
            // .catch(err => console.log(err));

    }
    
   
      handleChangeSentido = (event) => {
        this.setState({sentido: event.target.value});
      }
      handleChangeMailBox = (event) =>{
        this.setState({destino: event.target.id});

      }
    
    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.closeModal}
                size='lg'
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modo Expresso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center">
                        <Image width='75%' src="mapaV2.jpg" />
                        
                    </div>
                <Container>

                    <Container>
                        
                        <Row style = {{paddingTop: '15px', width: "100%", height: "40px"}}>
                            <Col xl = {40}>
                            
                            <label htmlFor="basic-url">Selecionar Mailbox:</label>
                            
                            </Col>   
                        </Row>
                    </Container>  
                        <Row style = {{ width: "100%", height: "40px"}}>
                            <Form.Group onChange={this.handleChangeMailBox}>
                                <Col >
                                    <Form.Check 
                                        custom  
                                        inline
                                        type="radio"
                                        label="Mb 1" 
                                        name="Mailbox"
                                        id="1"
                                        />
                                        <Form.Check
                                        custom  
                                        inline
                                        type="radio"
                                        label="Mb 2"
                                        name="Mailbox"
                                        id="2"
                                        />
                                        <Form.Check 
                                        custom  
                                        inline
                                        type="radio"
                                        label="Mb 3" 
                                        name="Mailbox"
                                        id="3"
                                        />
                                        
                                        <Form.Check
                                        custom  
                                        inline
                                        type="radio"
                                        label="Mb 4"
                                        name="Mailbox"
                                        id="4"
                                        />
                                       
                                
                                </Col>
                            </Form.Group>   
                        </Row>
                </Container> 
                
                
                <Container>
                    <Row>
                        <Col>
                        
                        <label htmlFor="basic-url">Sentido:</label>
                        
                        </Col>   
                    </Row>
                </Container>   

                <Container>

                    <Row style = {{width: "80%", height: "50px"}}>
                        <Col xs={12} md={5}>
                        <label>
                        <Form.Control as="select"  onChange={this.handleChangeSentido} >
                            <option value=""> Selecione o sentido </option>
                            <option value="1">Mailbox Master para Mailbox</option>
                            <option value="2">Mailbox para Mailbox Master</option>
                        </Form.Control>
                        </label>
                            {/* <ButtonGroup>                   
                            <DropdownButton variant="light"  title={this.state.dropDownValue}   id="dropdown-item-button" >
                                <Dropdown.Item eventKey="1" onClick = {e => this.changeValue("Mailbox Master para Mailbox")} >  Mailbox Master para Mailbox</Dropdown.Item>
                                <Dropdown.Item eventKey="2" onClick = {e => this.changeValue("Mailbox para Mailbox Master")}>Mailbox para Mailbox Master</Dropdown.Item>
                            </DropdownButton>
                            </ButtonGroup> */}
                        </Col>   
                    </Row>

                </Container>   
                
                </Modal.Body>
               
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closeModal} >
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={this.enviarDadosModoExpr}>
                        Confirmar
                    </Button>
                </Modal.Footer>
                
            </Modal>

        );
    }
}


export default ModalModoExpr;

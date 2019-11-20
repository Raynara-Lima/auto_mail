import React, {Component} from 'react';
import {
    Badge,
    Form,
    Dropdown,
    DropdownButton,
    Modal,
    FormControl,
    Button,
    Col,
    Row,
    ButtonToolbar,
    ToggleButtonGroup,
    ToggleButton,
    Image,
    Container,
    ButtonGroup,
    Tooltip
} from 'react-bootstrap';
import ImageMapper from 'react-image-mapper';
import axios from 'axios';
//import "../public/mapaV4.jpg"
const URL = "./mapaV4.jpg"
var value


class ModalModoExpr extends Component {

    constructor() {
        super();
    
        this.state = {
          sentido: "",
          destino: "",
            map:  {name: "map",
                areas: [
                    { name: "mb1", shape: "poly", coords: [259, 202, 285, 202, 285, 221, 259, 221], preFillColor: "#FFCD00",  strokeColor: "#FFCD00" },

                    { name: "mb2", shape: "poly", coords: [464, 202, 489, 202, 489, 221, 464, 221], preFillColor: "#FFCD00",  strokeColor: "#FFCD00" },
                    { name: "mb3", shape: "poly", coords: [72, 299, 92, 299, 92, 318, 72, 318], preFillColor: "#FFCD00",  strokeColor: "#FFCD00" },
                    { name: "mb4", shape: "poly", coords: [406, 299, 427, 299, 427, 318, 406, 318], preFillColor: "#FFCD00",  strokeColor: "#FFCD00" },

                ]},
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
    clicked = (area) =>{
        let map = this.state.map
        let indiceArea
        map.areas.map(function(a, indice){
            if( area.name === a.name ){
       //         console.log(indice)
                indiceArea =  indice;
            }
            if(a.strokeColor === 'black'){
                console.log(indice)
                map.areas[indice].strokeColor = '#FFCD00'
                map.areas[indice].preFillColor = '#FFCD00'
            }
        });
     //   console.log(indiceArea)
        map.areas[indiceArea].strokeColor = 'black'
        map.areas[indiceArea].preFillColor = 'black'
        this.state.destino = parseInt(indiceArea) + 1
       this.setState({map: map})
     //  console.log(area)
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
                    <Container>
                    <Row >
                        <Col md = {12}>

                            <label htmlFor="basic-url">Selecionar Mailbox:</label>

                        </Col>
                    </Row>
                    </Container>
                    <div className="d-flex justify-content-center">

                        <ImageMapper src={URL}
                                     map={this.state.map}
                                     width={500}
                            //  onLoad={() => this.load()}
                             onClick={area => this.clicked(area)}
                             // onMouseEnter={area => this.enterArea(area)}
                            //  onMouseLeave={area => this.leaveArea(area)}
                            //          onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
                            //  onImageClick={evt => this.clickedOutside(evt)}
                            //          onImageMouseMove={evt => this.moveOnImage(evt)}
                        />

                        {/*{this.props.hoveredArea && (*/}
                            {/*<Tooltip id="overlay-example"*/}
                                     {/*placement={this.props.placement}*/}
                                     {/*style={{ ...this.props.getTipPosition(this.props.hoveredArea) }}>*/}
                                {/*MailCar*/}
                            {/*</Tooltip>*/}

                        {/*)}*/}
                        {/*<Image width='75%' src="./mapaV4.jpg" />*/}
                        
                    </div>
                <Container>

                    <Container>

                    </Container>  
                        {/*<Row style = {{ width: "100%", height: "40px"}}>*/}
                            {/*<Form.Group onChange={this.handleChangeMailBox}>*/}
                                {/*<Col >*/}
                                    {/*<Form.Check */}
                                        {/*custom  */}
                                        {/*inline*/}
                                        {/*type="radio"*/}
                                        {/*label="Mb 1" */}
                                        {/*name="Mailbox"*/}
                                        {/*id="1"*/}
                                        {/*/>*/}
                                        {/*<Form.Check*/}
                                        {/*custom  */}
                                        {/*inline*/}
                                        {/*type="radio"*/}
                                        {/*label="Mb 2"*/}
                                        {/*name="Mailbox"*/}
                                        {/*id="2"*/}
                                        {/*/>*/}
                                        {/*<Form.Check */}
                                        {/*custom  */}
                                        {/*inline*/}
                                        {/*type="radio"*/}
                                        {/*label="Mb 3" */}
                                        {/*name="Mailbox"*/}
                                        {/*id="3"*/}
                                        {/*/>*/}
                                        {/**/}
                                        {/*<Form.Check*/}
                                        {/*custom  */}
                                        {/*inline*/}
                                        {/*type="radio"*/}
                                        {/*label="Mb 4"*/}
                                        {/*name="Mailbox"*/}
                                        {/*id="4"*/}
                                        {/*/>*/}
                                       {/**/}
                                {/**/}
                                {/*</Col>*/}
                            {/*</Form.Group>   */}
                        {/*</Row>*/}
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

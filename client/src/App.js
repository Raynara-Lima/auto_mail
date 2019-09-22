import React, {Component} from 'react';
import ImageMapper from 'react-image-mapper';
import axios from 'axios';
import {FormControl, Button,Col, Row} from 'react-bootstrap';

import './App.css';
const URL = "./mapa2.png"
const MAP = {
  name: "my-map",
  areas: [
    // { name: "1", shape: "poly", coords: [25,33,27,300,128,240,128,94], preFillColor: "green", fillColor: "blue"  },
    { name: "2", shape: "poly", coords: [219,118,220,210,283,210,284,119], preFillColor: "pink"  },
    // { name: "3", shape: "poly", coords: [381,241,383,94,462,53,457,282], fillColor: "yellow"  },
    // { name: "4", shape: "poly", coords: [245,285,290,285,274,239,249,238], preFillColor: "red"  },
    // { name: "5", shape: "circle", coords: [170, 100, 25 ] },
  ]
}
class App extends Component {
  state = {
	response: '',
	hoveredArea: '',
	msg: '',
	moveMsg: '',
	data: '',
	mensagem: '',
	mensagemRecebida: '',
	map:  {name: "my-map",
	areas: [
	  // { name: "1", shape: "poly", coords: [25,33,27,300,128,240,128,94], preFillColor: "green", fillColor: "blue"  },
	  { name: "2", shape: "poly", coords: [130,220,130,240,150,240,150,220], preFillColor: "pink"  },
	  { name: "2", shape: "poly", coords: [130,220,130,240,150,240,150,220], preFillColor: "black"  },

	  // { name: "3", shape: "poly", coords: [381,241,383,94,462,53,457,282], fillColor: "yellow"  },
	  // { name: "4", shape: "poly", coords: [245,285,290,285,274,239,249,238], preFillColor: "red"  },
	  // { name: "5", shape: "circle", coords: [170, 100, 25 ] },
	]}
  };

  componentDidMount() {
	this.callApi()
  	.then(res => this.setState({ response: res.express }))
	  .catch(err => console.log(err));
  }

  callApi = async () => {
	const response = await fetch('/api/mensagem');
	const body = await response.json();
	if (response.status !== 200) throw Error(body.message);

	return body;
  };
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
		this.setState({mensagemRecebida: response.data.data});
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
  render() {
	return (
  	<div className="container">
		  <Row style={{paddingTop: '15px'}}>
			  <Col md={12}>
			  <Col md={6}>
		 	 <img src='./logoAutoMail.jpg' width='30%' />
			</Col>
			{/* <Col md={6}>Estação de Controle</Col> */}
			</Col>
		  </Row>
		  <Row style={{paddingTop: '15px'}}>
		  <Col md={9}>

			  <Col md={6}>
			  <FormControl type="text" value={this.state.mensagem} onChange={(event) => this.setState({mensagem: event.target.value})}/>
			  </Col>
			  <Col md={6}>
				  <Button onClick={this.setMensagem}>Enviar</Button>
				  </Col>
				  </Col>
		  </Row>
		  <Row style={{paddingTop: '15px'}}>
		  <Col md={6}>
			<Col md={3}>
		  		<Button onClick={this.getMensagem}>Ver mensagem</Button>
			</Col>
			<Col md={8}>
				  <FormControl type="text" value={this.state.mensagemRecebida }  disabled/>
		  </Col>
	</Col>
		  </Row>
		  <Row style={{paddingTop: '70px'}}>
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
  	
	  </Row>
	  </div>
	  
	);
  }
}


export default App;

import React, {Component} from 'react';
import ImageMapper from 'react-image-mapper';
import axios from 'axios';
import {FormControl, Button,Col, Row} from 'react-bootstrap';

import './App.css';
const URL = "./mapa.jpg"
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
	  { name: "2", shape: "poly", coords: [125,270,145,270,145,250,125,250], preFillColor: "pink"  },
	  { name: "1", shape: "poly", coords: [110,260,110,270,125,270,125,260], preFillColor: "black"  },

	  // { name: "3", shape: "poly", coords: [381,241,383,94,462,53,457,282], fillColor: "yellow"  },
	  // { name: "4", shape: "poly", coords: [245,285,290,285,274,239,249,238], preFillColor: "red"  },
	  // { name: "5", shape: "circle", coords: [170, 100, 25 ] },
	]}
  };

  componentDidMount() {
	setInterval(this.desenharTrajetoria, 1000);

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

  render() {
	return (
  	<div >
		  <Row style={{backgroundColor:'black'}}>
			  <Col md={12}>
			  <Col md={6} style={{padding: 0}}>
		 	 <img src='./logoAutoMail.jpg' width='50%' />
			</Col>
			<Col md={6} style={{marginLeft: '-22%',fontSize: '40px', color: 'white', marginTop: '8px'}}>
				Estação de Controle
				</Col>
			</Col>
		  </Row>
		  {/* <Row style={{paddingTop: '70px'}}>
			  <Col md={12}>

			  </Col>
			  </Row> */}
		  
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
	  
	);
  }
}


export default App;

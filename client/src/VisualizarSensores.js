  import React, {Component} from 'react';
  import { LineChart, Line, XAxis,YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
  import {FormControl, Button,Col, Row, InputGroup, Navbar} from 'react-bootstrap';
  import './css/estilo.css';
  import axios from 'axios';
  import { Chart } from 'react-charts'
  import socketIOClient from "socket.io-client";

    const data = [
      {name: 'Page A', s: 2400, amt: 2400},
      {name: 'Page B', s: 1398, amt: 2210},
      {name: 'Page C', s: 9800, amt: 2290},
      {name: 'Page D', s: 3908, amt: 2000},
      {name: 'Page E', s: 4800, amt: 2181},
      {name: 'Page F', s: 3800, amt: 2500},
      {name: 'Page G', s: 4300, amt: 2100},
  

    ];
    const data4 = [
      { color: '#8884d8', type: 'line'},
     
    ];
  class VisualizarSensores extends Component {
    constructor(props){
      super(props);
      this.state={
        graficoVelocidadeGiro: [
          {v: ""},
          {v: ""},
          {v: ""},
          {v: ""},
           {v: ""},
           {v: ""},
           {v: ""},
           {v: ""},
           {v: ""},
          // {vg: 31.33862907915824}
          // {vg: 31.33862907915824}
                    // {name: 'Page B', s: 1398, amt: 22},
          // {name: 'Page C', s: 9800, amt: 29},
          // {name: 'Page D', s: 3908, amt: 20},
          // {name: 'Page E', s: 4800, amt: 21},
          // {name: 'Page F', s: 3800, amt: 25},
          // {name: 'Page G', s: 4300, amt: 21},
          // {name: 'Page G', s: 4300, amt: 21},
          // {name: 'Page G', s: 4300, amt: 21},
          // {name: 'Page G', s: 4300, amt: 21},
          // {name: 'Page G', s: 4300, amt: 21},
        ],

        graficoAcelaracao:[
          {name: 'Page A', s: 2400, amt: 24},
          {name: 'Page B', s: 1398, amt: 22},
          {name: 'Page C', s: 9800, amt: 29},
          {name: 'Page D', s: 3908, amt: 20},
          {name: 'Page E', s: 4800, amt: 21},
          {name: 'Page F', s: 3800, amt: 25},
          {name: 'Page G', s: 4300, amt: 21},
          {name: 'Page G', s: 4300, amt: 21},
          {name: 'Page G', s: 4300, amt: 21},
          {name: 'Page G', s: 4300, amt: 21},
          {name: 'Page G', s: 4300, amt: 21},
        ],
        instrumentacao: '',
        endpoint: "http://localhost:8080",

        
      }
      const socket = socketIOClient(this.state.endpoint);
      socket.on('getData', (json) =>{
          console.log(json)
          this.setState({dadosMailCar: json})
      })

    }
    getMensagemTeste() {
      const socket = socketIOClient(this.state.endpoint);
      socket.emit('getData')

  }
    componentDidMount(){
     //this.getMensagem()
     this.intervalo = setInterval( () => this.getMensagemTeste(), 1000);
      }
    getMensagem = () => {
      axios.get('http://localhost:8080/api/getDataSensores', {mode:'no-cors',  timeout: 2000}, )
          .then(response => {
            let state = this.state
            state.instrumentacao= response.data.data.instru
            let random = Math.random() * (360 - (-360)) + (-360)
            if(state.graficoVelocidadeGiro[0].v === ""){
              state.graficoVelocidadeGiro[0] = {vg: response.data.data.instru.vg, v: response.data.data.instru.vg}

            }else{
            for(var i = (state.graficoVelocidadeGiro.length - 1); i > 0; i--){

              //if(state.graficoVelocidadeGiro[i].v == "" ){
              state.graficoVelocidadeGiro[i] = state.graficoVelocidadeGiro[i-1]
              }
              state.graficoVelocidadeGiro[0] = {vg:  response.data.data.instru.vg, v:  response.data.data.instru.vg}
            
          }
            state.instrumentacao.distan = 10
            //const dataG = this.state.graficoVelocidadeGiro
             this.setState(state);
              console.log(response.data)
          }	).catch(err => console.log(err));

  };
  componentDidUpdate(prevProps, prevState) {
    return this.state.graficoVelocidadeGiro !== prevState.graficoVelocidadeGiro;
  }

  render(){
      return(
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
        <div className='container'>

        <Row>
      {/* <Col md={6} style={{textAlign: 'center', paddingtop: '15px'}}> */}
      <h2>Informações dos Sensores</h2>
      {/* </Col> */}
            </Row>
            <Row style={{ marginTop: '15px'}}>
              <Col md={12}>
                <Col md={2}>
                  <label>Distância percorrida: </label>
                </Col>
              <Col md={2}>
            <InputGroup className="mb-3">
              <FormControl
                    readOnly
                  value={this.state.instrumentacao.distan}
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon2">m</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            </Col>
            </Col>

            </Row>
                {/* <Row style={{ marginTop: '15px'}}>
                  <Col md={12}>
                    <Col md={2}>
                      <label>Velocidade: </label>
                    </Col>
                  <Col md={2}>
                <InputGroup className="mb-3">
                  <FormControl
                  readOnly
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2">m/s</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
                </Col>
                </Col>
                </Row> */}
  <Row style={{ marginTop: '20px'}}>
      <Col md={12}>
        <Col md={2}>
          <label>Velocidade de giro: </label>
        </Col>
      <Col md={6}>
        
        <LineChart
              width={600}
              height={300}
              data={this.state.graficoVelocidadeGiro}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
        <Line
          type='monotone'
          dataKey='vg'
          stroke='#8884d8'
          //activeDot={{r: 8}}
          />
              <CartesianGrid strokeDasharray='1 1'/>
              <Tooltip/>
              <YAxis domain={[-360, 360]}/>
              {/* <Legend payload={data4}/> */}

              <XAxis/>
              <Legend />
            </LineChart>
          </Col>
        </Col>
      </Row>
      <Row style={{ marginTop: '20px'}}>
      <Col md={12}>
        <Col md={2}>
          <label>Ângulo: </label>
        </Col>
      <Col md={6}>
        <LineChart
              width={600}
              height={300}
              data={data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
        <Line
          type='monotone'
          dataKey='s'
          stroke='#8884d8'
          activeDot={{r: 8}}
          />
              <CartesianGrid strokeDasharray='3 3'/>
              <Tooltip/>
              <YAxis/>
              <XAxis dataKey='name'/>
              <Legend />
            </LineChart>
          </Col>
        </Col>
      </Row>
      <Row style={{ marginTop: '20px'}}>
      <Col md={12}>
        <Col md={2}>
          <label>Aceleração: </label>
        </Col>
      <Col md={6}>
        
        <LineChart
              width={600}
              height={300}
              data={this.state.graficoAcelaracao}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
        <Line
          type='monotone'
          dataKey='s'
          stroke='#8884d8'
          activeDot={{r: 8}}
          />
              <CartesianGrid strokeDasharray='1 1'/>
              <Tooltip/>
              <YAxis range={[1, 10, 20]} />
              <Legend payload={data4}/>

              <XAxis/>
              <Legend />
            </LineChart>
          </Col>
        </Col>
      </Row>
      <Row style={{ marginTop: '20px'}}>
      <Col md={12}>
        <Col md={2}>
          <label>Ângulo: </label>
        </Col>
      <Col md={6}>
        <LineChart
              width={600}
              height={300}
              data={data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
        <Line
          type='monotone'
          dataKey='s'
          stroke='#8884d8'
          activeDot={{r: 8}}
          />
              <CartesianGrid strokeDasharray='3 3'/>
              <Tooltip/>
              <YAxis/>
              <XAxis dataKey='name'/>
              <Legend />
            </LineChart>
          </Col>
        </Col>
      </Row>
      <Row style={{ marginTop: '20px'}}>
      <Col md={12}>
        <Col md={2}>
          <label>Velocidade de giro: </label>
        </Col>
      <Col md={6}>
        <LineChart
              width={600}
              height={300}
              data={data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
        <Line
          type='monotone'
          dataKey='pv'
          stroke='#8884d8'
          activeDot={{r: 8}}
          />
              <CartesianGrid strokeDasharray='3 3'/>
              <Tooltip/>
              <YAxis/>
              <XAxis dataKey='name'/>
              <Legend />
            </LineChart>
          </Col>
        </Col>
      </Row>
    </div>
  </div>
      )
  }
  }
  export default VisualizarSensores;

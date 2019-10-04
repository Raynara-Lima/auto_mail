  import React, {Component} from 'react';
  import { LineChart, Line, XAxis,YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
  import {FormControl, Button,Col, Row, InputGroup} from 'react-bootstrap';
  import estilo from './css/estilo.css'
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
      { value: 'm/s²', color: '#8884d8', type: 'line'},
     
    ];
  class VisualizarSensores extends Component {
    constructor(props){
      super(props);
      this.state={
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
        ]
        
      }
    }

  render(){
      return(
          <div>
          <Row style={{backgroundColor:'black'}}>
            <Col md={12}>
            <Col md={6} style={{padding: 0}}>
            <img src='./logoAutoMail.jpg' width='50%' />
          </Col>
          <Col md={6} style={{marginLeft: '-22%',fontSize: '34px', color: 'white', marginTop: '15px'}}>
              Estação de Controle
              </Col>
          </Col>
        </Row>
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

        aria-describedby="basic-addon2"
      />
      <InputGroup.Append>
        <InputGroup.Text id="basic-addon2">m</InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
    </Col>
    </Col>
    </Row>
    <Row style={{ marginTop: '15px'}}>
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

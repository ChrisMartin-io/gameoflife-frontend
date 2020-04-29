import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Button, FormControl, Row, Col } from 'react-bootstrap';
import axios from 'axios';

// styles
const contentStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: '5%'
};
const updateBox = {};

function Main() {
  // set table dimensions state
  const [tableWidth, setTableWidth] = useState(50);
  const [tableHeight, setTableHeight] = useState(15);

  // generate starting array
  let startTable = [];
  for (let i = 0; i < tableHeight; i++) {
    startTable.push([]);
    for (let j = 0; j < tableWidth; j++) {
      startTable[i].push(0);
    }
  }

  // set table state
  const [table, setTable] = useState(startTable);
  const [time, setTime] = useState(1000)

  // handle clicks on boxes
  const handleBoxClick = (rowIdx, nodeIdx) => {
    let currTable = [...table];

    // change value
    if (currTable[rowIdx][nodeIdx] === 0) {
      currTable[rowIdx][nodeIdx] = 1;
    } else {
      currTable[rowIdx][nodeIdx] = 0;
    }

    // set new state
    setTable(currTable);
  };

  // handle click on update button
  const handleUpdateClick = e => {
    // prevent default submit behavior
    e.preventDefault();

    // declare updated variables from form inputs
    let width = Number(e.target.elements[0].value);
    let height = Number(e.target.elements[1].value);

    // update state
    if (!width) {
      width = tableWidth;
    } else {
      setTableWidth(width);
    }
    if (!height) {
      height = tableHeight;
    } else {
      setTableHeight(height);
    }

    // update table
    let startTable = [];
    for (let i = 0; i < height; i++) {
      startTable.push([]);
      for (let j = 0; j < width; j++) {
        startTable[i].push(0);
      }
    }
    setTable(startTable);
  };

  // handle randomizer
  const handleRandomize = () => {
    // update table
    let startTable = [];
    for (let i = 0; i < tableHeight; i++) {
      startTable.push([]);
      for (let j = 0; j < tableWidth; j++) {
        startTable[i].push(Math.round(Math.random()));
      }
    }
    setTable(startTable);
  };

  // handle glider gun
  const gliderGun = () => {
    setTableHeight(15);
    setTableWidth(50);

    // blank table
    let startTable = [];
    for (let i = 0; i < tableHeight; i++) {
      startTable.push([]);
      for (let j = 0; j < tableWidth; j++) {
        startTable[i].push(0);
      }
    }

    // set each square

    let height = 3;
    let width = 7;

    startTable[0 + height][25 + width] = 1;

    startTable[1 + height][23 + width] = 1;
    startTable[1 + height][25 + width] = 1;

    startTable[2 + height][13 + width] = 1;
    startTable[2 + height][14 + width] = 1;
    startTable[2 + height][21 + width] = 1;
    startTable[2 + height][22 + width] = 1;
    startTable[2 + height][35 + width] = 1;
    startTable[2 + height][36 + width] = 1;

    startTable[3 + height][12 + width] = 1;
    startTable[3 + height][16 + width] = 1;
    startTable[3 + height][21 + width] = 1;
    startTable[3 + height][22 + width] = 1;
    startTable[3 + height][35 + width] = 1;
    startTable[3 + height][36 + width] = 1;

    startTable[4 + height][1 + width] = 1;
    startTable[4 + height][2 + width] = 1;
    startTable[4 + height][11 + width] = 1;
    startTable[4 + height][17 + width] = 1;
    startTable[4 + height][21 + width] = 1;
    startTable[4 + height][22 + width] = 1;

    startTable[5 + height][1 + width] = 1;
    startTable[5 + height][2 + width] = 1;
    startTable[5 + height][11 + width] = 1;
    startTable[5 + height][15 + width] = 1;
    startTable[5 + height][15 + width] = 1;
    startTable[5 + height][17 + width] = 1;
    startTable[5 + height][18 + width] = 1;
    startTable[5 + height][23 + width] = 1;
    startTable[5 + height][25 + width] = 1;
    
    startTable[6 + height][11 + width] = 1;
    startTable[6 + height][17 + width] = 1;
    startTable[6 + height][25 + width] = 1;
    
    startTable[7 + height][12 + width] = 1;
    startTable[7 + height][16 + width] = 1;
    
    startTable[8 + height][13 + width] = 1;
    startTable[8 + height][14 + width] = 1;

    
  
    setTable(startTable);
  };

  // handle animation

  const [int, setInt] = useState();

  // button handle to start
  const startAnimation = () => {
    let currTable = table;
    console.log('starting');
    setInt(
      setInterval(() => {
        console.log('table is', currTable);
        axios
          .post('http://localhost:3002', {
            data: currTable
          })
          .then(res => {
            setTable(res.data);
            currTable = res.data;
            console.log('res is', res.data);
          });
      }, 100)
    );
  };

  // button handle to stop
  const stopAnimation = () => {
    clearInterval(int);
    console.log('stopping');
  };

  return (
    <div style={contentStyle}>
      <h1 style={{marginBottom: 30}}>Game of Life simulation</h1>
      <div style={updateBox}>
        <Form onSubmit={handleUpdateClick}>
          <Row>
            <Col>
              <Form.Group controlId="width">
                <Form.Label>Width</Form.Label>
                <Form.Control type="text" placeholder={tableWidth} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="height">
                <Form.Label>Height</Form.Label>
                <Form.Control type="text" placeholder={tableHeight} />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Update/Clear
          </Button>
        </Form>
      </div>
      <Row>
        <Col>
          <Button
            style={{ marginTop: 20, marginBottom: 10 }}
            onClick={handleRandomize}
            variant="secondary"
          >
            Randomize
          </Button>
        </Col>
        <Col>
          <Button
            style={{ marginTop: 20, marginBottom: 10 }}
            onClick={gliderGun}
            variant="secondary"
          >
            Glider Gun
          </Button>
        </Col>
      </Row>
      {/* loop over table array to create nodes */}
      <table>
        {table.map((row, rowIdx) => (
          <tr>
            {row.map((node, nodeIdx) => (
              <td>
                <div
                  style={{
                    border: 'solid 1px grey',
                    width: 12,
                    height: 12,
                    backgroundColor: node === 0 ? 'white' : 'black'
                  }}
                  onClick={() => handleBoxClick(rowIdx, nodeIdx)}
                ></div>
              </td>
            ))}
          </tr>
        ))}
      </table>
      <Row style={{ marginTop: 20 }}>
        <Col>
          <Button variant="danger" onClick={stopAnimation}>
            Stop
          </Button>
        </Col>
        <Col>
          <Button variant="success" onClick={startAnimation}>
            Go
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Main;

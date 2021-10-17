import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Container, Row, Col, InputGroup, Button, FormControl } from 'react-bootstrap';
import { useAppSelector } from './store/hooks';
import StockContainer from './components/stockContainer';
import { addStock } from './api/api';

function App() {
  const [stockName, setStockName] = useState('');
  const stockList = useAppSelector(state => state.stocks);

  const handleAddStock = () => {
    console.log('handleAddStock');
    addStock(stockName.toUpperCase());
    setStockName('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStockName(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      handleAddStock();
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md="6">
          <Row style={{ paddingTop: '10em' }}>
            <Col>
              <div style={{ fontSize: '4em', font: 'Roboto', textAlign: 'center', fontWeight: 'bold' }}>
                <span style={{ color: '#4285F4' }}>S</span>
                <span style={{ color: '#EA4335' }}>t</span>
                <span style={{ color: '#FBBC05' }}>o</span>
                <span style={{ color: '#4285F4' }}>n</span>
                <span style={{ color: '#34A853' }}>k</span>
                <span style={{ color: '#EA4335' }}>s</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 8, offset: 2 }}>
              <StockContainer stockList={stockList.stocks} />
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 8, offset: 2 }}>
              <InputGroup className="mb-3">
                <FormControl value={stockName} onChange={handleChange} onKeyDown={handleKeyDown} />
                <InputGroup.Append>
                  <Button variant="primary" onClick={handleAddStock}>Add stock</Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
        </Col>
      </Row>

    </Container>
  );
}

export default App;

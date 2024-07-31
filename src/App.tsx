import React from 'react';
import {Container, CssBaseline, Typography, Box, Divider} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import './App.css';
import AddProduct from './Components/AddProduct';
import ProductList from './Components/ProductList';
import TotalItems from './Components/TotalItems';

function App() {
  const theme = useTheme();
  const backgroundColor = theme.palette.primary.main;

  return (
    <Container style={{textAlign:'center'}}>
      <CssBaseline/>
      <Box my={4}>
        <Typography  variant="h4" component="h1" gutterBottom style={{
          backgroundColor: backgroundColor,
          color: '#fff',
          padding: '1.2rem',
          borderRadius: '5px',
          textAlign: 'center',
        }}>
        רשימת קניות
        </Typography>
        <TotalItems/>
        <AddProduct/>
        <Typography  variant="h4" component="h1" gutterBottom>
        <Divider style={{ margin: '20px 0' }} />
        יש לאסוף מוצרים אלו במחלקות המתאימות
        </Typography>
        <ProductList/>
      </Box>
    </Container>
  );
}

export default App;

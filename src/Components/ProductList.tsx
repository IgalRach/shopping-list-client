import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Models/Store';
import { List, ListItem, ListItemText, Paper, Typography, Grid } from '@mui/material';


const ProductList: React.FC = () => {
  const products = useSelector((state: RootState) => state.shoppingList.products);

  // Group products by category
  const groupedProducts = products.reduce((acc: any, product: any) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <Grid container spacing={2} justifyContent="center">
          {Object.keys(groupedProducts).map((category) => (
            <Grid item xs={12} md={6} lg={4} key={category} justifyContent="center">
              <Typography variant="h6" gutterBottom>
                {category} - {groupedProducts[category].reduce((total: number, product: any) => total + product.quantity, 0)} מוצרים
              </Typography>
              <Paper style={{ padding: 16 }}>
              <List>
                  {groupedProducts[category].map((product: any) => (
                    <ListItem key={product.id} style={{ justifyContent: 'center' }}>
                      <ListItemText
                         primary={<span>{product.name} {product.quantity > 1 ? `(${product.quantity})` : ''}</span>}
                         primaryTypographyProps={{ style: { textAlign: 'center' } }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          ))}
        </Grid>
  );
};

export default ProductList;
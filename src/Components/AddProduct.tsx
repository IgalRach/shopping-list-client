import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Select, MenuItem, Box } from '@mui/material';
import { addProduct } from '../Models/ShoppingList';
import axios from 'axios';
import { RootState } from '../Models/Store';

const categories = ['מוצרי ניקיון', 'גבינות', 'ירקות ופירות', 'בשר ודגים', 'מאפים'];

const AddProductForm: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.shoppingList.products);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productName.trim()) {
      dispatch(addProduct({ name: productName, category }));
      setProductName('');

    }
  };

  const handleFinalizeOrder = async () => {
    try {
      await axios.post('/api/shoppinglist', { products });
      alert('Order finalized successfully!');
    } catch (error) {
      console.error('Error finalizing order:', error);
    }
  };

  return (
    <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      mb: 4,
      alignItems: 'center',
      direction: 'rtl',
      '@media (min-width: 600px)': {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      width: '100%',
      maxWidth: 600,
      mx: 'auto',  // Center horizontally
      p: 2
    }}
  >
    <TextField
      label="שם המוצר"
      value={productName}
      onChange={(e) => setProductName(e.target.value)}
      required
      fullWidth
    />
    <Select
      labelId="category-select"
      value={category}
      onChange={(e) => setCategory(e.target.value as string)}
      fullWidth
    >
      {categories.map((cat) => (
        <MenuItem key={cat} value={cat}>
          {cat}
        </MenuItem>
      ))}
    </Select>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        direction: 'rtl',
        '@media (min-width: 600px)': {
          flexDirection: 'row',
        },
      }}
    >
      <Button type="submit" variant="contained" fullWidth>
        הוסף מוצר
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleFinalizeOrder}
        fullWidth
      >
        סיים הזמנה
      </Button>
    </Box>
  </Box>
);
};

export default AddProductForm;

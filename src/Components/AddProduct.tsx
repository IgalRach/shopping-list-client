import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Select, MenuItem, Box } from '@mui/material';
import { addProduct } from '../Models/ShoppingList';
import axios from 'axios';
import { RootState } from '../Models/Store';

//onst categories = ['מוצרי ניקיון', 'גבינות', 'ירקות ופירות', 'בשר ודגים', 'מאפים'];

interface Category {
  id: string;
  name: string;
}

const AddProductForm: React.FC = () => {
  const [productName, setProductName] = useState('');
   const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.shoppingList.products);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('https://localhost:53031/api/shoppinglist/categories'); // Use Category[] type for response
        setCategories(response.data);
        // Set the default category to the first one if available
        if (response.data.length > 0) {
          setCategory(response.data[0].name);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productName.trim()) {
      dispatch(addProduct({ name: productName, category }));
      setProductName('');
    }
  };

  const handleFinalizeOrder = async () => {
    try {
      await fetch('https://localhost:53031/api/shoppinglist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products }),
      });
      alert('Order finalized successfully!');
    } catch (error) {
      console.error('Error finalizing order:', error);
      alert('Failed to finalize order.');
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
        required
        onChange={(e) => setCategory(e.target.value as string)}
        fullWidth
        displayEmpty
      >
        <MenuItem value="" disabled>
          קטגוריה
        </MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat.id} value={cat.name}>
            {cat.name}
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

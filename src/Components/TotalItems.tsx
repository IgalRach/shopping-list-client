import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Models/Store';
import { Box, Typography } from '@mui/material';

const TotalItems: React.FC = () => {
  const totalItems = useSelector((state: RootState) => state.shoppingList.totalItems);

  return (
    <Box mb={4}>
      <Typography variant="h6">
         סה"כ: {totalItems} מוצרים
      </Typography>
    </Box>
  );
};

export default TotalItems;
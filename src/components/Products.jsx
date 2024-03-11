import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reducerChangeOffset, reducerChangeLimit, reducerGetProducts, reducerGetField, reducerGetFilteredField } from "../redux/slices/getIRequestsSlice";
import { useTheme, List, ListItemText, Pagination, Box, TextField, Button, InputLabel, MenuItem, FormControl, Select, Grid } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { styled } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';

const StyledArrowCircleLeftIcon = styled(ArrowCircleLeftIcon)(({ theme }) => ({
   color: theme.palette.secondary.main,
   fontSize: '55px',
   cursor: 'pointer',
   transition: 'color 0.3s ease',
   '&:hover': {
      color: theme.palette.primary.main,
   },
}));

const StyledArrowCircleRightIcon = styled(ArrowCircleRightIcon)(({ theme }) => ({
   color: theme.palette.secondary.main,
   fontSize: '55px',
   cursor: 'pointer',
   transition: 'color 0.3s ease',
   '&:hover': {
      color: theme.palette.primary.main,
   },
}));

const Products = () => {

   const theme = useTheme();
   const dispatch = useDispatch();
   const {
      arrayOfFilteredField,
      arrayOfProducts,
      arrayOfField,
      limit,
      offset,
      field,
      value
   } = useSelector((state) => state.rootReducer.requests);


   const [inputLimit, setInputLimit] = useState(limit);
   const [inputOffset, setInputOffset] = useState(offset);
   const [inputField, setInputField] = useState(field);
   const [inputValue, setInputValue] = useState(value);

   const [renderOptions, setRenderOptions] = useState({
      products: true,
      field: false,
      filteredField: false
   });

   useEffect(() => {
      if (renderOptions.products) {
         dispatch(reducerGetProducts());
      }
      if (renderOptions.field) {
         dispatch(reducerGetField({ inputField, inputOffset, inputLimit }));
      }
      if (renderOptions.filteredField) {
         dispatch(reducerGetFilteredField({ inputField, inputValue, arrayOfFilteredField }));
      }
   }, [dispatch, inputOffset, renderOptions])


   const handleGoToRight = () => {
      const newOffset = inputOffset + inputLimit; // Calculate the new offset value
      setInputOffset(newOffset); // Update the state with the new offset value
      dispatch(reducerChangeOffset(newOffset)); // Dispatch the action with the new offset value
   };

   const handleGoToLeft = () => {
      if ((inputOffset - inputLimit) < 0) {
         return;
      }
      setInputOffset(inputOffset - inputLimit);
      dispatch(reducerChangeOffset(inputOffset));
   };

   const handleGiveValue = (event) => {
      setInputValue(event.target.value);
   };

   const handleChangeLimit = (event) => {
      const newLimit = parseInt(event.target.value);
      setInputLimit(newLimit);
      dispatch(reducerChangeLimit(newLimit));
   };

   const handleChangeOffset = (event) => {
      const newOffset = parseInt(event.target.value);
      dispatch(reducerChangeOffset(newOffset));
   };

   function getProducts() {
      setRenderOptions({
         products: true,
         field: false,
         filteredField: false
      });
   }

   function getField() {
      setRenderOptions({
         products: false,
         field: true,
         filteredField: false
      });
   }

   function handleFilterField() {
      setRenderOptions({
         products: false,
         field: false,
         filteredField: true
      });

   }
   const handleCangeValue = (event) => {
      setInputField(event.target.value)
   };

   return (
      <Box sx={{ width: '100%', minHeight: '100dvh', backgroundColor: theme.palette.background.paper, padding: '20px 30px', boxSizing: 'border-box' }}>
         <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={12}>
               <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" >Field</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={inputField ? inputField : 'product'}
                     label="field"
                     onChange={handleCangeValue}
                  >
                     <MenuItem value={"product"}>Product</MenuItem>
                     <MenuItem value={"brand"}>Brand</MenuItem>
                     <MenuItem value={"price"}>Price</MenuItem>
                  </Select>
               </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
               <Button variant="contained" color="secondary" onClick={getProducts} >Get Products</Button>
            </Grid>
            <Grid item xs={12} sm={4}>
               <Button variant="contained" color="secondary" onClick={getField} >Get Field</Button>
            </Grid>
            <Grid item xs={12} sm={4}>
               <Button variant="contained" color="secondary" onClick={handleFilterField} >Filter Field</Button>
            </Grid>
            <Grid item xs={12} sm={4}>
               <TextField type="number" label="Limit" color="secondary" value={inputLimit} onChange={handleChangeLimit} />
            </Grid>
            <Grid item xs={12} sm={4}>
               <TextField type="number" label="Offset" color="secondary" value={inputOffset} onChange={handleChangeOffset} />
            </Grid>
            <Grid item xs={12} sm={4}>
               <TextField type="text" label="Write value" color="secondary" value={inputValue} onChange={handleGiveValue} />
            </Grid>
         </Grid>

         <Box>
            <StyledArrowCircleLeftIcon style={{ color: inputOffset === 0 && 'black' }} onClick={handleGoToLeft} />
            <StyledArrowCircleRightIcon onClick={handleGoToRight} />
         </Box>

         {renderOptions.products && <Box>
            {Array.isArray(arrayOfProducts)
               ? arrayOfProducts?.map((product, index) => (
                  <List key={index} component="div" href="#simple-list">
                     <ListItemText color="secondary" >brand: {product?.brand}</ListItemText>
                     <ListItemText color="secondary" >ID: {product?.id}</ListItemText>
                     <ListItemText color="secondary" >Price: ${product?.price}</ListItemText>
                     <ListItemText color="secondary" >Name: {product?.product}</ListItemText>
                  </List>
               ))
               : <CircularProgress />
            }
         </Box>}

         {renderOptions.field && <Box>
            {Array.isArray(arrayOfField)
               ? arrayOfField?.map((product, index) => (
                  product === null
                     ? null
                     : <List key={index} component="div" href="#simple-list">
                        <ListItemText color="secondary">{product}</ListItemText>
                     </List>
               ))
               : <CircularProgress />
            }
         </Box>}
         {renderOptions.filteredField && <Box>
            {Array.isArray(arrayOfProducts)
               ? arrayOfProducts?.map((product, index) => (
                  product === null
                     ? null
                     : (<List key={index} component="div" href="#simple-list">
                        <ListItemText color="secondary"> brand: {product?.brand}</ListItemText>
                        <ListItemText color="secondary"> ID: {product?.id}</ListItemText>
                        <ListItemText color="secondary"> $ Price: {product?.price}</ListItemText>
                        <ListItemText color="secondary"> Name: {product?.product}</ListItemText>
                     </List>)
               ))
               : <CircularProgress />}
         </Box>}
      </Box>
   );
};

export default Products;

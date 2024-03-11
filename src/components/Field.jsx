import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reducerGetIds, reducerChangeOffset, reducerChangeLimit, reducerGetProducts, reducerGetField, reducerFilterField } from "../redux/slices/getIRequestsSlice";
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
   const arrayOfField = useSelector((state) => state.rootReducer.requests.arrayOfField);
   const arrayOfFilteredField = useSelector((state) => state.rootReducer.requests.arrayOfFilteredField);
   const arrayOfIds = useSelector((state) => state.rootReducer.requests.arrayOfIds);
   const arrayOfProducts = useSelector((state) => state.rootReducer.requests.arrayOfProducts);
   const limit = useSelector(state => state.rootReducer.requests.limit);
   const offset = useSelector(state => state.rootReducer.requests.offset);
   let fieldFromInitial = useSelector(state => state.rootReducer.requests.field);
   let valueFromInitial = useSelector(state => state.rootReducer.requests.value);

   const [inputLimit, setInputLimit] = useState(limit);
   const [inputOffset, setInputOffset] = useState(offset);
   const [field, setField] = useState(fieldFromInitial);
   const [value, setValue] = useState(valueFromInitial);
   const [changeReques, setChangeReques] = useState(false);

   useEffect(() => {
      dispatch(reducerGetField({
         "field": field, "offset": offset, "limit": limit
      }));
   }, [dispatch, inputOffset])

   const handleGoToRight = () => {
      setInputOffset(inputOffset + inputLimit);
      dispatch(reducerChangeOffset(inputOffset));
   };

   const handleGoToLeft = () => {
      if ((inputOffset - inputLimit) < 0) {
         return;
      }
      setInputOffset(inputOffset - inputLimit);
      dispatch(reducerChangeOffset(inputOffset));
   };

   const handleGiveValue = (event) => {
      setValue(event.target.value);
   };

   const handleChangeLimit = (event) => {
      const newLimit = parseInt(event.target.value);
      setInputLimit(newLimit);
      dispatch(reducerChangeLimit(newLimit));
   };

   const handleChangeOffset = (event) => {
      const newOffset = parseInt(event.target.value);
      setInputOffset(newOffset);
      dispatch(reducerChangeOffset(newOffset));
   };

   function getProducts() {
      dispatch(reducerGetProducts(arrayOfProducts));
   }

   function getField() {
      dispatch(reducerGetField({
         field: field, offset: offset, limit: limit
      }));
      setChangeReques(!changeReques);
   }

   function handleFilterField() {
      dispatch(reducerFilterField({ field, value }));
   }

   const handleCangeValue = (event) => {
      setField(event.target.value)
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
                     value={field}
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
               <TextField type="text" label="Write value" color="secondary" value={value} onChange={handleGiveValue} />
            </Grid>
         </Grid>

         <Box>
            <StyledArrowCircleLeftIcon style={{ color: inputOffset === 0 && 'black' }} onClick={handleGoToLeft} />
            <StyledArrowCircleRightIcon onClick={handleGoToRight} />
         </Box>

         <Box>
            {Array.isArray(arrayOfField)
               ? arrayOfField?.map((product, index) => (
                  product === null
                     ? null
                     : <List component="p" href="#simple-list">
                        <ListItemText color="secondary">{product}</ListItemText>
                     </List>
               ))
               : <CircularProgress />}
         </Box>

         {/* <Box>
            {Array.isArray(arrayOfFilteredField)
               ? arrayOfFilteredField?.map((product, index) => (
                  product === null
                     ? null
                     : <List component="p" href="#simple-list">
                        <ListItemText color="secondary">{product}</ListItemText>
                     </List>
               ))
               : <CircularProgress />}
         </Box> */}

         {/* arrayOfFilteredField */}
      </Box>
   );
};

export default Products;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isLoadingIds: false,
   limit: 50,
   offset: 0,
   arrayOfIds: [],
   arrayOfProducts: [],
   arrayOfField: [],
   arrayOfFilteredField: [],
   field: "",
   value: "",
};

export const reducerOfRequest = createSlice({
   name: "requests",
   initialState,
   reducers: {

      reducerChangeLimit: (state, action) => {
         state.limit = action.payload;
      },
      reducerChangeOffset: (state, action) => {
         state.offset = action.payload;
      },

      reducerGetIds: (state, action) => {
         state.limit = action.payload.inputLimit;
         state.offset = action.payload.inputOffset;
         Array.isArray(action.payload) ? (state.arrayOfIds = action.payload) : state.arrayOfIds = ["This Page is Empty"];
      },

      reducerGetProducts: (state, action) => {
         Array.isArray(action.payload) ? (state.arrayOfProducts = action.payload) : state.arrayOfProducts = ["This Page is Empty"];
      },

      reducerGetField: (state, action) => {
         state.field = action.payload.inputField;
         state.offset = action.payload.inputOffset;
         state.limit = action.payload.inputLimit;
         Array.isArray(action.payload) ? (state.arrayOfField = action.payload) : state.arrayOfField = ["This Page is Empty"];
      },

      reducerFilterField: (state, action) => {
         state.field = action.payload.inputField;
         state.value = action.payload.inputValue;
         Array.isArray(action.payload) ? (state.arrayOfFilteredField = action.payload) : state.arrayOfFilteredField = ["This Page is Empty"];
      },

      reducerGetFilteredField: (state, action) => {
         state.field = action.payload.inputField;
         state.value = action.payload.inputValue;
         Array.isArray(action.payload) ? (state.arrayOfProducts = action.payload) : state.arrayOfFilteredField = ["This Page is Empty"];
      },
   },
});

export const {
   reducerChangeOffset,
   reducerChangeLimit,
   reducerGetIds,
   reducerGetProducts,
   reducerGetField,
   reducerFilterField,
   reducerGetFilteredField
} = reducerOfRequest.actions;

export default reducerOfRequest.reducer;

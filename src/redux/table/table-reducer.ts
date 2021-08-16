import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import  contactsActions  from './table-actions'; 
const {
  getTableRequest,
  getTableSuccess, 
  getTableError, 
  searchTableRequest,
  searchTableSuccess,
  searchTableError,
  addTableRequest, 
  addTableSuccess, 
  addTableError, 
  deleteTableRequest, 
  deleteTableSuccess, 
  deleteTableError, 
  setTotalPages,
  setPage,
  setSearchedParameters,
  setSearchedItems
} = contactsActions;

const items = createReducer([], {
  [getTableSuccess.type]: (_, { payload }) => payload,
  [searchTableSuccess.type]: (_, { payload }) => payload,
  [addTableSuccess.type]: (state, { payload }) => [payload, ...state],
  [deleteTableSuccess.type] : (state, { payload }) => state.filter(({ _id }) => _id !== payload),
});

const searchedItems = createReducer([], {
  [searchTableSuccess.type]: (_, { payload }) => payload,
  [setSearchedItems.type]: (_, { payload }) => payload,
});

const searchedParameters = createReducer(null, {
  [setSearchedParameters.type]: (_, { payload }) => payload,
});

const page = createReducer(1, {
  [setPage.type]: (_, { payload }) => payload + 1,
});

const totalPages = createReducer(10, {
  [setTotalPages.type]: (_, { payload }) => payload,
});

const loading = createReducer(false, {
  [getTableRequest.type]: () => true,
  [searchTableRequest.type]: () => true,
  [addTableRequest.type]: () => true,
  [deleteTableRequest.type]: () => true,
  [getTableSuccess.type]: () => false,
  [addTableSuccess.type]: () => false,
  [deleteTableSuccess.type]: () => false,
  [getTableError.type]: () => false,
  [searchTableError.type]: () => false,
  [searchTableSuccess.type]: () => false,
  [addTableError.type]: () => false,
  [deleteTableError.type]: () => false, 
});

const error = createReducer(null, {
  [getTableError.type]: (_, { payload }) => payload,
  [addTableError.type]: (_, { payload }) => payload,
  [deleteTableError.type]: (_, { payload }) => payload,
  [searchTableError.type]: (_, { payload }) => payload,
  [searchTableSuccess.type]: () => null,
  [getTableSuccess.type]: () => null,
  [addTableSuccess.type]: () => null,
  [deleteTableError.type]: () => null,
});

export default combineReducers({
  items,
  searchedItems,
  loading,
  error,
  page,
  totalPages,
  searchedParameters
});
  



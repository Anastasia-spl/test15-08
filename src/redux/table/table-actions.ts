import { createAction } from '@reduxjs/toolkit';
import { ITableItem } from '../../interfaces/Table.interface';

const getTableRequest = createAction('table/getTableRequest');
const getTableSuccess = createAction<ITableItem[]>('table/getTableSuccess');
const getTableError = createAction<string, 'table/getTableError'>('table/getTableError');

const searchTableRequest = createAction('table/searchTableRequest');
const searchTableSuccess = createAction<ITableItem[]>('table/searchTableSuccess');
const searchTableError = createAction<string, 'table/searchTableError'>('table/searchTableError');

 const addTableRequest = createAction('table/addTableRequest');
 const addTableSuccess = createAction<ITableItem, 'table/addTableSuccess'>('table/addTableSuccess');
 const addTableError = createAction<string, 'table/addTableError'>('table/addTableError');

 const deleteTableRequest = createAction('table/deleteTableRequest');
 const deleteTableSuccess = createAction<string, 'table/deleteTableSuccess'>('table/deleteTableSuccess');
 const deleteTableError = createAction<string, 'table/deleteTableError'>('table/deleteTableError');

 const setTotalPages =  createAction<string, 'table/setTotalPages'>('table/setTotalPages');
 const setPage =  createAction<number, 'table/setPage'>('table/setPage');
const setSearchedParameters = createAction<any, 'table/setSearchedParameters'>('table/setSearchedParameters');
 const setSearchedItems = createAction<ITableItem[] | []>('table/setSearchedItems');
 // eslint-disable-next-line
export default {
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
};

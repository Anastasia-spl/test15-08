import axios from 'axios';
import { INewTableItem } from '../../interfaces/Table.interface';
import tableActions from './table-actions';
import { TAppDispatch } from '../store';

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
  setSearchedParameters
} = tableActions;

axios.defaults.baseURL = `https://test-task-welbex.herokuapp.com`;

interface ISearchTable {
  queryName: string,
  queryValue: string | number,
  queryCondition: string,
}

const getTable = (page: number) => async (dispatch: TAppDispatch ) => {
  dispatch(getTableRequest());

  try {
    const { data: { itemsList, totalPages } } = await axios.get(`/table?page=${page}`);
    dispatch(getTableSuccess(itemsList));
    dispatch(setPage(page));
    dispatch(setTotalPages(totalPages));
  } catch (error) {
    dispatch(getTableError(error.message));
  }
}

const searchTable = (page: number, { queryName, queryValue, queryCondition} : ISearchTable) => async (dispatch: TAppDispatch ) => {
  dispatch(searchTableRequest());
  try {
    const { data: { itemsList, totalPages } } = await axios.get(`/table/search?condition=${queryCondition}&${queryName}=${queryValue}&page=${page}`);
    dispatch(setPage(page));
    dispatch(setTotalPages(totalPages));
    dispatch(searchTableSuccess(itemsList));
    dispatch(setSearchedParameters({ queryName, queryValue, queryCondition}))
  } catch (error) {
    const err = error?.response?.data?.message || error?.response?.data?.status;
    dispatch(searchTableError(err));
  }
}

const addTableItem = (itemToAdd: INewTableItem) =>  async (dispatch: TAppDispatch ) => {
  dispatch(addTableRequest());
  try {
    const { data: { item } } = await axios.post('/table', itemToAdd);
    dispatch(addTableSuccess(item));
  } catch (error) {
     const err = error?.response?.data?.message || error?.response?.data?.status;
    dispatch(addTableError(err));
  }
}

const deleteTableItem = (itemId: string) => async (dispatch: TAppDispatch ) => {
  dispatch(deleteTableRequest());

  try {
    await axios.delete(`/table/${itemId}`);
    dispatch(deleteTableSuccess(itemId));
  } catch (error) {
    dispatch(deleteTableError(error.message))
  }
}

//eslint-disable-next-line 
export default { getTable, searchTable, addTableItem, deleteTableItem }
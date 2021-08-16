import { ITableItem } from '../../interfaces/Table.interface';
import { TRootState } from '../store';

type TSelector<R> = (state: TRootState) => R;

const getItems: TSelector<ITableItem[] | []> = state => state.table.items;
const getSearchedItems: TSelector<ITableItem[] | []> = state => state.table.searchedItems;
const getLoader: TSelector<boolean> = state => state.table.loading;
const getIsError: TSelector<null | string> = state => state.table.error;
const getPage: TSelector<number> = state => state.table.page;
const getTotalPages: TSelector<number> = state => state.table.totalPages;
const getSearchedParameters: TSelector<any> = state => state.table.searchedParameters;

//eslint-disable-next-line 
export default { getItems, getLoader, getIsError, getPage , getTotalPages, getSearchedItems, getSearchedParameters}
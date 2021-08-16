import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { tableActions, tableOperations, tableSelectors } from '../redux/table';
import { useAppSelector } from '../redux/hooks';

import Section from '../components/Section';
import Container from '../components/Container';
import Table from '../components/Table';
import FormAddOrder from '../components/FormAddOrder';
import SearchForm from '../components/SearchForm';

interface ISearchTable {
  queryName: string,
  queryValue: string,
  queryCondition: string,
}

const useStyles = createUseStyles({
  searchFormBtn: {
    margin: "20px 0",
    display: 'block',
  },
  error: {
    color: 'red',
  }
});

export default function TablePage() {
  const items = useAppSelector(tableSelectors.getItems);
  const searchedParametes = useAppSelector(tableSelectors.getSearchedParameters);
  const searchedItems = useAppSelector(tableSelectors.getSearchedItems);
  const ifSearchItemExist = searchedItems.length !== 0;
  const page = useAppSelector(tableSelectors.getPage);
  const totalPages = useAppSelector(tableSelectors.getTotalPages);
  const isLoading = useAppSelector(tableSelectors.getLoader);
  const isError = useAppSelector(tableSelectors.getIsError);

  const [formAddOrder, toggleFormAddOrder] = useState(false);

  const dispatch = useDispatch();
  const getTable = (page: number) => dispatch(tableOperations.getTable(page));
  const searchTable = (page: number, data: ISearchTable) => dispatch(tableOperations.searchTable(page, data));
  const setSearchedItems = (data: []) => dispatch(tableActions.setSearchedItems(data))

  useEffect(() => {
     items.length === 0 && getTable(page);
     // eslint-disable-next-line
  }, []);

  const handleLoadMore = () => {
    ifSearchItemExist ? 
    searchTable(page, searchedParametes) :
    getTable(page);
  }
  const handleBack = () => {
    ifSearchItemExist ? 
    searchTable(1, searchedParametes) :
    getTable(1);
  }

  const handleHideSearch = () => {
    getTable(1);
    setSearchedItems([]);
  }

  const noPagesToLoadMore = totalPages <= page;

  const classes = useStyles();
  return (
    <Section>
      <Container>
        <button type="button" onClick={() => toggleFormAddOrder(prev => !prev)}>
          {formAddOrder ? "Спрятать форму для добавления заказа" : "Добавить заказ"}
        </button>
        {formAddOrder && <FormAddOrder />}
        <SearchForm />
        {ifSearchItemExist &&
          <button className={classes.searchFormBtn} type="button" onClick={handleHideSearch}>
            Вернуться к исходной таблице
        </button>}
        {isError && <p className={classes.error}>{isError}</p>}
        <Table />
       
          {noPagesToLoadMore
            ? <p >Данных для загрузки больше нет</p>
            :
            <button type="button" onClick={handleLoadMore}>
              {isLoading ? "Идет загрузка" : "Загрузить еще"}
            </button>
          }
          {noPagesToLoadMore &&
            <button type="button" onClick={handleBack}>
          К началу таблицы
            </button>}
      </Container>
    </Section>
  );
};



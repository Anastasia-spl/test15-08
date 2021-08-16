import { useDispatch } from 'react-redux';
import {  useState } from 'react';
import { createUseStyles } from 'react-jss';

import { tableOperations, tableActions } from '../../redux/table';

const useStyles = createUseStyles({
  label: {
    marginRight: "20px",
  },
  labelText: {
    marginRight: "10px",
  },
  selectInput: {
    padding: "0 5px",
  }
});

interface ISearchTable {
  queryName: string,
  queryValue: string,
  queryCondition: string,
}

export default function SearchForm() {
  const dispatch = useDispatch();
    
  const setPage = (page: number) => dispatch(tableActions.setPage(page));
  const searchTable = (page: number, data: ISearchTable) => dispatch(tableOperations.searchTable(page, data))

  const [column, setColumn] = useState('distance');
  const [condition, setCondition] = useState('more');
  const [value, setValue] = useState('');


  const handleColumnChange = (e:  React.FormEvent<HTMLSelectElement>) => {
    setColumn(e.currentTarget.value);
  }
  const handleConditionChange = (e:  React.FormEvent<HTMLSelectElement>) => {
    setCondition(e.currentTarget.value);
  }
  const handleValueChange = (e:  React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryName = column;
    const queryValue = value;
    const queryCondition = condition;
    searchTable(1, { queryName, queryValue, queryCondition });
    setPage(1);
  }
  const classes = useStyles();
  return (
    <>
      <h2>Поиск по таблице:</h2>
      <form onSubmit={handleSearch}>
        <label className={classes.label}>
          <span  className={classes.labelText}>Искать по...</span>
          <select name="column"
            value={column}
            onChange={handleColumnChange}
            className={classes.selectInput}>
            <option value="name">названию</option>
            <option value="quantity">количеству</option>
            <option value="distance">расстоянию</option>
          </select>
        </label>
        <label className={classes.label}>
          <span className={classes.labelText}>Условие</span> 
          <select name="condition"
            value={condition}
            onChange={handleConditionChange}
            className={classes.selectInput}>
            <option value="includes" disabled={column === "name" ? false : true}>содержит</option>
            <option value="more" disabled={column === "name" ? true : false}>больше</option>
            <option value="less" disabled={column === "name" ? true : false}>меньше</option>
            <option value="equal" disabled={column === "name" ? true : false}>равно</option>
          </select>
        </label>
        <label className={classes.label}>
          <span className={classes.labelText}>Данные для поиска</span>
          <input type="text"
            name="value"
            value={value}
            onChange={handleValueChange}
            className={classes.selectInput} />
        </label>
        <button type='submit'>Поиск</button>
      </form>
    </>
  )
}


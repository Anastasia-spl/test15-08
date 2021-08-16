import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { tableOperations } from '../../redux/table';
import { INewTableItem } from '../../interfaces/Table.interface';
import TextField from '../TextField';

const useStyles = createUseStyles({
  Form: {
    marginTop: "20px",
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    width: 'maxContent',
    border: '1px solid #3f51b5',
    borderRadius: '5px',
    
  },
  label: {
    marginRight: '7px',
  },
});

export default function FormAddOrder() {
  const dispatch = useDispatch();
  const addTableItem = (data: INewTableItem) => dispatch(tableOperations.addTableItem(data));

  const [name, setName] = useState('');
  const handleChangeName = ( e: React.FormEvent<HTMLInputElement>) => {
    setName( e.currentTarget.value);
  };

  const [untypedDate, setDate] = useState('');
  const handleChangeDate = (e: React.FormEvent<HTMLInputElement>) => {   
    setDate(e.currentTarget.value);
  };

  const [quantity, setQuantity] = useState('');
  const handleChangeQuantity = ( e: React.FormEvent<HTMLInputElement>) => {
    setQuantity(e.currentTarget.value);
  };

  const [distance, setDistance] = useState('');
  const handleChangeDistance = ( e: React.FormEvent<HTMLInputElement>) => {
    setDistance(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dateArr = untypedDate.split('-');
    const date = dateArr[2] + "." + dateArr[1] + "." + dateArr[0];
    addTableItem({ name, date, quantity, distance });
    reset();
  };

  const reset = () => {
    setName('');
    setDate('');
    setQuantity('');
    setDistance('');
  };

  const styles = useStyles();
  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <TextField
        type="date"
        name="date"
        value={untypedDate}
        pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
        title="DD.MM.YYY"
        required
        onChange={handleChangeDate}
      />
      <TextField
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов."
        required
        onChange={handleChangeName}
        label="Название"
      />
      <TextField
        type="number"
        name="quantity"
        value={quantity}
        required
        onChange={handleChangeQuantity}
        label="Количество (кг)"
      />
      <TextField
        type="number"
        name="distance"
        value={distance}
        required
        onChange={handleChangeDistance}
        label="Расстояние (км)"
      />
      <button type="submit">Добавить</button>
    </form>
  );
}

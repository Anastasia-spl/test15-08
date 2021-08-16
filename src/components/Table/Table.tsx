import { useDispatch } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { useAppSelector } from '../../redux/hooks';
import { tableOperations, tableSelectors } from '../../redux/table';
import { ITableItem } from '../../interfaces/Table.interface';

const useStyles = createUseStyles({
  table: {
    marginTop: "20px",
    marginBottom: "20px",
    marginRight: 'auto',
    padding: '15px',
    width: 'fitContent',
    border: '1px solid #3f51b5',
    borderRadius: '5px',
  },
  thead: {
    lineHeight: '1.9'
  },
  td: {
    width: '150px',
  },
  th: {
    textAlign: 'start'
  },
  deleteBtn: {
    textAlign: 'center'
  }
});

export default function Table() {
  const items = useAppSelector(tableSelectors.getItems);
  const dispatch = useDispatch();

  const deleteTableItem = (id: string) => dispatch(tableOperations.deleteTableItem(id))

  const styles = useStyles(); 
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th className={styles.th}>Дата</th>
          <th className={styles.th}>Название</th>
          <th className={styles.th}>Количество (кг)</th>
          <th className={styles.th}>Расстояние (км)</th>
        </tr>
      </thead>
      <tbody>
        {
          items.map(({ _id, date, name, quantity, distance }: ITableItem) => (
          <tr key={_id}>
            <td className={styles.td}>{date}</td>
            <td className={styles.td}>{name}</td>
            <td className={styles.td}>{quantity}</td>
            <td className={styles.td}>{distance}</td>
            <td className={styles.deleteBtn}>
              <button type="button" onClick={() => deleteTableItem(_id)}>Удалить</button>
            </td>
          </tr>
        ))
        }
      </tbody>
    </table>
  );
}

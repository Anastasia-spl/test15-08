import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  Container: {
    padding: '0 20px',
    margin: '0 auto',
  },
});

interface Props {
  children: React.ReactNode
}

export default function Container({ children }: Props) {
  const styles = useStyles();
  return <div className={styles.Container}>{children}</div>;
}

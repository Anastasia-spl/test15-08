import Container from '../Container';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  section: {
    padding: '30px 0',
    '@media screen and (max-width: 767px)': {
      padding: '15px 0',
    },
  },
});

interface Props {
  title?: string,
  children: React.ReactNode
}

export default function Section({ title, children }: Props) {
  const classes = useStyles();
  return (
    <section className={classes.section}>
      <Container>
        <h2 className="title">{title}</h2>
        {children}
      </Container>
    </section>
  );
};



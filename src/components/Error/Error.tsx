import { createUseStyles } from 'react-jss';
import Section from '../Section';

const useStyles = createUseStyles({
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
});

interface Props {
  error: string
}

export default function Error({ error }: Props) {
  const classes = useStyles();
  return (
    <Section>
      <p className={classes.errorText}>{error}</p>
    </Section>
  );
};



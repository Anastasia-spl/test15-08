import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextFields from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    minWidth: 200,
  },
}));

interface Props {
  label?: string,
  name: string
  value: string,
  required?: boolean,
  type?: string,
  onChange(e: any): void,
  pattern?: string,
  title?: string
}

export default function TextField({ label, ...props }: Props) {
  const classes = useStyles();

  return (
    <TextFields
      id="outlined-basic"
      label={label}
      variant="outlined"
      className={classes.root}
      {...props}
    />
  );
}

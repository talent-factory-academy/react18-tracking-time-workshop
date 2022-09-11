import { format } from 'date-fns';

interface HumanDateProps {
  value: Date | number | string;
}

export function HumanDate (props: HumanDateProps) {
  return <>{format(new Date(props.value), 'dd MMM')}</>
};


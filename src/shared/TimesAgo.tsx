import { formatDistance } from 'date-fns';

interface TimesAgoProps {
  value: Date | number | string;
}

export function TimesAgo (props: TimesAgoProps) {
  return <>
    {formatDistance(new Date(props.value), new Date(), { addSuffix: true })}
  </>
};


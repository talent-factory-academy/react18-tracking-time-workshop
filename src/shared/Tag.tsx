import { PropsWithChildren } from 'react';

export function Tag (props: PropsWithChildren) {
  return <span className="text-sm bg-red-200 text-slate-800 rounded-xl px-3 py-0.5">
    {props.children}
  </span>
};


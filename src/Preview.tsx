import * as React from 'react';

export interface PreviewProps {
  value: string;
}

export function Preview({ value }: PreviewProps) {
  return <p>{value}</p>;
}

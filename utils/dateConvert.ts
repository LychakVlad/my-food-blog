import { ReactNode } from 'react';

export default function dateConvert(date: ReactNode): string | undefined {
  if (typeof date === 'string') {
    const convertedDate = new Date(date);

    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };

    const day = convertedDate.getDate();
    const month = convertedDate.toLocaleString('en-US', { month: 'short' });
    const year = convertedDate.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  }

  return undefined;
}

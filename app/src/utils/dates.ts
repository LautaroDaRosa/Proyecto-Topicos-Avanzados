export const getFormattedBirthday = (date: string) => {
  return date
    ? new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(new Date(date + 'T00:00:00.000'))
    : '-';
};

export const getFormattedEntryDate = (date: string) => {
  return date
    ? new Intl.DateTimeFormat('en-GB', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(date + 'T00:00:00.000'))
    : '-';
};

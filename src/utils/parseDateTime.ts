function formatDateTime(isoString: string): string {
  const [date, time] = isoString.split('T');
  return `${date} ${time}`;
}

export default formatDateTime;
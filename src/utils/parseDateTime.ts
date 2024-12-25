export function formatDateTime(isoString: string): string {
  const [date, time] = isoString.split('T');
  return `${date} ${time}`;
}

export function divideIsoDateTime(scheduledDate: string | undefined | null) {
  if (!scheduledDate) return { date: '2024-12-26', time: '09:00' };
  const [date, time] = scheduledDate.split('T');
  return { date, time: time?.slice(0, 5) || '00:00' };
}
export const getTodayIsoDate = () => new Date().toISOString().slice(0, 10);

export const getIsoDateDaysAgo = (days: number) =>
  new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

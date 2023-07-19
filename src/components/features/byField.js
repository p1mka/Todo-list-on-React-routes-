export const byField = (field) => {
  return (a, b) => (a[field] > b[field] ? 1 : -1);
};

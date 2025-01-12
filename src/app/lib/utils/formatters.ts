const formatPhoneNumber = (value: string) => {
  return value
    .replace(/[^0-9]/g, '')
    .replace(
      /(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/,
      (_, p1, p2, p3) => `${p1}-${p2}-${p3}`
    );
};

const formatNumber = (value: string) => {
  return value
    .replace(/[^0-9]/g, '')
    .replace(/^0/g, '')
    .replace(/^$/g, '0');
};

export { formatPhoneNumber, formatNumber };

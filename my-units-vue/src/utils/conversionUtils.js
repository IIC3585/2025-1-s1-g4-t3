export function convertUnit(value, from, to) {
  const units = {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001
  };
  return (value * units[from]) / units[to];
}

export default {
  m: 'Meters',
  km: 'Kilometers',
  cm: 'Centimeters',
  mm: 'Millimeters'
};

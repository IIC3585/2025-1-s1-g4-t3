import { unitCategories } from './unitsData';

export function convertUnit(value, fromUnitKey, toUnitKey, categoryKey) {
    if (isNaN(parseFloat(value))) return ''; // Si no es un número, retorna vacío

    const category = unitCategories[categoryKey];
    if (!category) return 'Categoría inválida';

    if (categoryKey === 'temperature') {
        return convertTemperature(parseFloat(value), fromUnitKey, toUnitKey);
    }

    const fromUnit = category.units[fromUnitKey];
    const toUnit = category.units[toUnitKey];

    if (!fromUnit || !toUnit) return 'Unidad inválida';

    const valueInBaseUnit = parseFloat(value) * fromUnit.toBase;

    const result = valueInBaseUnit / toUnit.toBase;

    return parseFloat(result.toFixed(5));
}

function convertTemperature(value, from, to) {
    if (from === to) return value;

    let celsiusValue;
    if (from === 'fahrenheit') {
        celsiusValue = (value - 32) * 5 / 9;
    } else if (from === 'kelvin') {
        celsiusValue = value - 273.15;
    } else {
        celsiusValue = value;
    }

    if (to === 'fahrenheit') {
        return (celsiusValue * 9 / 5) + 32;
    } else if (to === 'kelvin') {
        return celsiusValue + 273.15;
    } else { 
        return celsiusValue;
    }
}
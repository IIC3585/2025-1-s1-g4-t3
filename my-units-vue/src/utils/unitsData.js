export const units = {
    length: {
        name: 'Longitud',
        baseUnit: 'meter',
        units: {
            meter: { name: 'Metro', symbol: 'm', toBase: 1 },
            kilometer: { name: 'Kilómetro', symbol: 'km', toBase: 1000 },
            centimeter: { name: 'Centímetro', symbol: 'cm', toBase: 0.01 },
            millimeter: { name: 'Milímetro', symbol: 'mm', toBase: 0.001 },
            mile: { name: 'Milla', symbol: 'mi', toBase: 1609.34 },
            yard: { name: 'Yarda', symbol: 'yd', toBase: 0.9144 },
            foot: { name: 'Pie', symbol: 'ft', toBase: 0.3048 },
            inch: { name: 'Pulgada', symbol: 'in', toBase: 0.0254 },
        }
    },
    area: {
        name: 'Área',
        baseUnit: 'squareMeter',
        units: {
            squareMeter: { name: 'Metro Cuadrado', symbol: 'm²', toBase: 1 },
            squareKilometer: { name: 'Kilómetro Cuadrado', symbol: 'km²', toBase: 1000000 },
            hectare: { name: 'Hectárea', symbol: 'ha', toBase: 10000 },
            squareFoot: { name: 'Pie Cuadrado', symbol: 'ft²', toBase: 0.092903 },
            acre: { name: 'Acre', symbol: 'acre', toBase: 4046.86 },
        }
    },
    volume: {
        name: 'Volumen',
        baseUnit: 'liter',
        units: {
            liter: { name: 'Litro', symbol: 'L', toBase: 1 },
            milliliter: { name: 'Mililitro', symbol: 'mL', toBase: 0.001 },
            cubicMeter: { name: 'Metro Cúbico', symbol: 'm³', toBase: 1000 },
            gallon: { name: 'Galón (US)', symbol: 'gal', toBase: 3.78541 },
            pint: { name: 'Pinta (US)', symbol: 'pt', toBase: 0.473176 },
        }
    },
    weight: {
        name: 'Peso (Masa)',
        baseUnit: 'kilogram',
        units: {
            kilogram: { name: 'Kilogramo', symbol: 'kg', toBase: 1 },
            gram: { name: 'Gramo', symbol: 'g', toBase: 0.001 },
            milligram: { name: 'Miligramo', symbol: 'mg', toBase: 0.000001 },
            pound: { name: 'Libra', symbol: 'lb', toBase: 0.453592 },
            ounce: { name: 'Onza', symbol: 'oz', toBase: 0.0283495 },
        }
    },
    temperature: {
        name: 'Temperatura',
        units: {
            celsius: { name: 'Celsius', symbol: '°C' },
            fahrenheit: { name: 'Fahrenheit', symbol: '°F' },
            kelvin: { name: 'Kelvin', symbol: 'K' },
        }
    }
};
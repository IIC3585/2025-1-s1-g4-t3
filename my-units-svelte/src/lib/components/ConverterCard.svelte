<script>
    import { unitCategories } from '$lib/utils/unitsData.js'; 
    import { convertUnit }     from '$lib/utils/conversionUtils.js';
    import UnitSelector       from './UnitSelector.svelte'; 
    import { addToHistory }    from '../stores/appStore.js'; 

    export let categoryKey;

    let prevCategoryKey;
    let category, units, unitKeys;
    let valueA    = '';
    let valueB    = '';
    let unitA_key;
    let unitB_key;
    let lastChanged = null;
    let debounceTimer;

    $: if (categoryKey && categoryKey !== prevCategoryKey) {
        category    = unitCategories[categoryKey];
        units       = category.units;
        unitKeys    = Object.keys(units);
        unitA_key   = unitKeys[0];
        unitB_key   = unitKeys.length > 1 ? unitKeys[1] : unitKeys[0];
        valueA      = '';
        valueB      = '';
        lastChanged = null;
        prevCategoryKey = categoryKey;
    }

    function handleInputA(e) {
        valueA      = e.target.value;
        lastChanged = 'A';
        if (valueA === '') valueB = '';
    }
    function handleUnitAChange() { lastChanged = 'A'; }
    function handleUnitBChange() { lastChanged = 'A'; }

    function swapUnits() {
        if (valueA === '') {
        [unitA_key, unitB_key] = [unitB_key, unitA_key];
        return;
        }
        const originalValue = valueA;
        [unitA_key, unitB_key] = [unitB_key, unitA_key];
        const result = convertUnit(originalValue, unitA_key, unitB_key, categoryKey);
        valueB = (typeof result === 'number') ? result : '';
        recordConversion(originalValue, unitA_key, valueB, unitB_key);
    }

    $: if (lastChanged === 'A' && valueA !== '') {
        const r = convertUnit(valueA, unitA_key, unitB_key, categoryKey);
        valueB = (typeof r === 'number') ? r : '';
        recordConversion(valueA, unitA_key, valueB, unitB_key);
    }

    function recordConversion(valFrom, unitFromKey, valTo, unitToKey) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
        if (valFrom && unitFromKey && valTo && unitToKey && category) {
            addToHistory({
            id: Date.now(),
            categoryName: category.name,
            from: `${valFrom} ${units[unitFromKey].symbol}`,
            to:   `${valTo}   ${units[unitToKey].symbol}`
            });
        }
        }, 500);
    }
</script>

<div class="converter-card">
    <h3>{category.name}</h3>

    <div class="conversion-row">
        <div class="input-group">
        <label for="{categoryKey}-valA">Valor:</label>
        <input
            type="number"
            id="{categoryKey}-valA"
            bind:value={valueA}
            on:input={handleInputA}
            placeholder="Ingresa valor"
        />
        </div>
        <div class="input-group">
        <label for="{categoryKey}-unitA">De:</label>
        <UnitSelector
            bind:selectedUnitKey={unitA_key}
            units={units}
            id="{categoryKey}-unitA"
            on:change={handleUnitAChange}
        />
        </div>
    </div>

    <button class="swap-button" on:click={swapUnits} title="Intercambiar unidades y valores">⇅</button>

    <div class="conversion-row">
        <div class="input-group">
        <label for="{categoryKey}-valB">Resultado:</label>
        <input
            type="number"
            id="{categoryKey}-valB"
            bind:value={valueB}
            placeholder="Resultado"
            readonly
        />
        </div>
        <div class="input-group">
        <label for="{categoryKey}-unitB">A:</label>
        <UnitSelector
            bind:selectedUnitKey={unitB_key}
            units={units}
            id="{categoryKey}-unitB"
            on:change={handleUnitBChange}
        />
        </div>
    </div>
</div>

<style>
    .converter-card {
        background-color: var(--card-bg, white);
        border: 1px solid var(--border-color, #ddd);
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 2px 10px var(--shadow-color, rgba(0,0,0,0.05));
    }
    h3 {
        margin-top: 0;
        color: var(--primary-color, #007bff);
        text-align: center;
        margin-bottom: 1.5rem;
    }
    .conversion-row {
        display: flex;
        gap: 1rem;
        align-items: flex-end;
        margin-bottom: 1rem;
    }
    .input-group {
        display: flex;
        flex-direction: column;
        flex: 1; 
    }
    label {
        margin-bottom: 0.3rem;
        font-size: 0.9rem;
        color: var(--text-secondary-color, #555);
    }
    input[type="number"] {
        padding: 0.6rem;
        border: 1px solid var(--border-color, #ccc);
        border-radius: 4px;
        font-size: 1rem;
        width: 100%; 
        box-sizing: border-box; 
        background-color: var(--input-bg, white);
        color: var(--text-color, #333);
    }
    .swap-button {
        display: block;
        margin: 0.5rem auto 1rem;
        padding: 0.5rem;
        font-size: 1.5rem; 
        background-color: var(--secondary-color, #6c757d);
        color: white;
        border: none;
        border-radius: 50%; 
        width: 40px;
        height: 40px;
        line-height: 1; 
        cursor: pointer;
        transition: transform 0.2s ease-in-out;
    }
    .swap-button:hover {
        transform: rotate(180deg);
        background-color: var(--secondary-hover-color, #5a6268);
    }

    @media (max-width: 600px) {
        .conversion-row {
            flex-direction: column;
            align-items: stretch; 
        }
        .input-group {
            margin-bottom: 0.8rem; 
        }
         .input-group:last-child {
            margin-bottom: 0;
        }
        select {
            width: 100%; 
        }
    }
</style>
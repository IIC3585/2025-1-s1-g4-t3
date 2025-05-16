<script>
    export let units;
    export let selectedUnitKey; 
    export let id = '';
</script>

<select bind:value={selectedUnitKey} {id}>
    {#each Object.entries(units) as [key, unitData]}
        <option value={key}>{unitData.name} ({unitData.symbol})</option>
    {/each}
</select>

<style>
    select {
        padding: 0.6rem;
        border: 1px solid var(--border-color, #ccc);
        border-radius: 4px;
        background-color: var(--input-bg, white);
        color: var(--text-color, #333);
        min-width: 150px;
        font-size: 1rem;
    }
</style>
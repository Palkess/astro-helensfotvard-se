<script lang="ts">
    let count = $state(0);
</script>

<div class="counter">
    <h2>Counter: {count}</h2>
    <button class="rounded-2xl border bg-green-700" onclick={() => count++}>Increment</button>
    <button class="rounded-2xl border bg-red-700" onclick={() => count--}>Decrement</button>
</div>

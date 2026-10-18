<script lang="ts">
  let { children } = $props();
  const content = $derived(children);
</script>

{@render content()}
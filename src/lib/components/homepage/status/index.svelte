<script lang="ts">
  import type { ClassValue } from "svelte/elements";

  interface Props {
    class?: ClassValue;
    status: "online" | "idle" | "dnd" | "offline";
  }

  const { status, class: className }: Props = $props();
  let colorClasses = $derived(status === "online" ? "bg-green-500" : status === "idle" ? "bg-yellow-500" : status === "dnd" ? "bg-red-500" : "border-4 border-muted-foreground bg-background");
</script>

<div class={className}>
  {#if status === "online"}
    <span
      class={[
        "absolute -top-1 left-0 inline-flex h-full w-full animate-ping rounded-full opacity-75",
        colorClasses,
      ]}
    ></span>
  {/if}
  <span class={["relative inline-flex size-6 rounded-full", colorClasses]} title={status}></span>
</div>

<script lang="ts">
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import ThemeToggle from "$lib/components/toggles/theme-toggle.svelte";
  import LanguageToggle from "$lib/components/toggles/language-toggle.svelte";
</script>

<ButtonGroup.Root
  orientation="vertical"
  aria-label="Toggles"
  class="fixed top-4 right-5 cursor-pointer h-fit"
>
  <ThemeToggle />
  <LanguageToggle />
</ButtonGroup.Root>

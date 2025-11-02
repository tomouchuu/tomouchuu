<script lang="ts">
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import ThemeToggle from "$lib/components/toggles/theme-toggle.svelte";
  import LanguageToggle from "$lib/components/toggles/language-toggle.svelte";
</script>

<ButtonGroup.Root
  orientation="horizontal"
  aria-label="Toggles"
  class="cursor-pointer"
>
  <ThemeToggle />
  <LanguageToggle />
</ButtonGroup.Root>

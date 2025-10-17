<script lang="ts">
  import { getLocale, setLocale } from '$lib/paraglide/runtime';
  import Button from "$lib/components/ui/button/button.svelte";

  let locale = getLocale();

  const toggleLanguage = () => {
    if (locale === "ja") {
      setLocale("en");
    } else {
      setLocale("ja");
    }
  };
</script>

<Button
  class="cursor-pointer"
  onclick={toggleLanguage}
  size="icon"
  variant="outline"
>
  {locale === "ja" ? "🇯🇵" : "🇬🇧"}
</Button>

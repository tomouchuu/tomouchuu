import { useColorMode } from "@kobalte/core";

import MoonIcon from "~/components/icons/moon";
import SunIcon from "~/components/icons/sun";

import { Button } from "~/components/ui/button";

export default function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        toggleColorMode();
      }}
      class="fixed top-4 right-4 cursor-pointer"
    >
      <SunIcon class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span class="sr-only">Toggle theme</span>
    </Button>
  );
}

import { ButtonGroup } from "@/components/ui/button-group";

import ThemeToggle from "./theme-toggle";
import LanguageToggle from "./language-toggle";

export function Toggles() {
  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="Toggles"
      className="fixed top-4 right-5 cursor-pointer h-fit"
    >
      <ThemeToggle />
      <LanguageToggle />
    </ButtonGroup>
  );
}

export default Toggles;

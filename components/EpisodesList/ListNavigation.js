import { initialFilter, initialSort } from "@/pages";
import { useAtom } from "jotai";
import SVGIcon from "../Icons";
import { ListOptions, ListOptionsButton } from "./ListNavigation.styled";

export default function ListNavigation() {
  const [ascending, setAscending] = useAtom(initialSort);
  const [filter, setFilter] = useAtom(initialFilter);

  return (
    <ListOptions>
      <ListOptionsButton
        type="button"
        variant="text"
        active={filter}
        onClick={() => setFilter(!filter)}
        aria-label={
          filter ? "alle Folgen anzeigen" : "nur mehrteilige Folgen anzeigen"
        }
      >
        Spezialfolgen
      </ListOptionsButton>
      <ListOptionsButton
        type="button"
        onClick={() => setAscending(!ascending)}
        aria-label={
          ascending
            ? "nach Datum absteigend sortieren"
            : "nach Datum aufsteigend sortieren"
        }
      >
        <SVGIcon
          variant={ascending ? "arrowDownThin" : "arrowUpThin"}
          width="25px"
        />
      </ListOptionsButton>
    </ListOptions>
  );
}

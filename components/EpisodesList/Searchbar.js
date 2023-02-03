import { atom, useAtom } from "jotai";
import { useState } from "react";
import SVGIcon from "../Icons";
import {
  SearchbarButton,
  SearchbarForm,
  SearchbarInput,
} from "./Searchbar.styled";

export const initialSearch = atom("");

export default function Searchbar() {
  const [, setSearch] = useAtom(initialSearch);
  const [showSearchbar, setShowSearchbar] = useState(false);

  return (
    <SearchbarForm showSearchbar={showSearchbar}>
      <SearchbarButton type="button" onClick={() => setShowSearchbar(true)}>
        <SVGIcon variant="magnify" width="20px" />
      </SearchbarButton>
      <SearchbarInput
        showSearchbar={showSearchbar}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <SearchbarButton
        type="button"
        onClick={() => setShowSearchbar(false)}
        showSearchbar={showSearchbar}
        variant="close"
      >
        <SVGIcon variant="close" width="20px" />
      </SearchbarButton>
    </SearchbarForm>
  );
}

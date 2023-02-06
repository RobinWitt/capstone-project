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
  const [search, setSearch] = useAtom(initialSearch);
  const [showSearchbar, setShowSearchbar] = useState(false);

  function handleCloseSearchbar() {
    setShowSearchbar(false);
    setSearch("");
  }

  return (
    <SearchbarForm showSearchbar={showSearchbar}>
      <SearchbarButton
        type="button"
        onClick={() => setShowSearchbar(true)}
        aria-label="open searchbar"
      >
        <SVGIcon variant="magnify" width="25px" />
      </SearchbarButton>
      <SearchbarInput
        showSearchbar={showSearchbar}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type="text"
        maxLength="15"
        pattern="[A-Za-zÄäÖÖÜüß0-9]{15}"
        aria-label="type text or number to search"
      />
      <SearchbarButton
        type="button"
        onClick={handleCloseSearchbar}
        showSearchbar={showSearchbar}
        variant="close"
        aria-label="close searchbar"
      >
        <SVGIcon variant="close" width="25px" />
      </SearchbarButton>
    </SearchbarForm>
  );
}

import { ListOptions, ListOptionsButton } from "./ListNavigation.styled";

export default function ListNavigation() {
  return (
    <ListOptions>
      <ListOptionsButton>Spezialfolgen</ListOptionsButton>
      <ListOptionsButton>{`neu -> alt`}</ListOptionsButton>
      <ListOptionsButton>{`alt <- neu`}</ListOptionsButton>
    </ListOptions>
  );
}

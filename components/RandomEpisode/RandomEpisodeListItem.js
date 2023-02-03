import SVGIcon from "../Icons";
import {
  RandomEpisodeLink,
  RandomEpisodeList,
  RandomEpisodeListItem,
} from "./RandomEpisode.styled";

export default function RandomEpisode() {
  return (
    <RandomEpisodeList>
      <RandomEpisodeListItem>
        <RandomEpisodeLink href={"/random"}>
          Öffnen
          <SVGIcon variant="questionMark" width="35px" color="darkgreen" />
        </RandomEpisodeLink>
      </RandomEpisodeListItem>
    </RandomEpisodeList>
  );
}

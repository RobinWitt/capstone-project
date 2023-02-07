import {
  OverviewList,
  OverviewListItem,
} from "../EpisodesList/EpisodesList.styled";
import SVGIcon from "../Icons";
import { RandomEpisodeLink } from "./RandomEpisode.styled";

export default function RandomEpisode() {
  return (
    <OverviewList>
      <OverviewListItem>
        <RandomEpisodeLink href={"/random"}>
          Öffnen
          <SVGIcon variant="questionMark" width="35px" color="darkgreen" />
        </RandomEpisodeLink>
      </OverviewListItem>
    </OverviewList>
  );
}

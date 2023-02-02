import SVGIcon from "../Icons";
import { useRouter } from "next/router";
import { EpisodeHeader, EpisodeNavButton } from "../Episode/Episode.styled";

export default function RandomCardHeader({ onSetRandom, onShowDetails }) {
  const router = useRouter();

  return (
    <EpisodeHeader>
      <EpisodeNavButton type="button" onClick={router.back}>
        <SVGIcon variant="returnIcon" width="50px" color="darkgreen" />
      </EpisodeNavButton>
      <EpisodeNavButton onClick={onSetRandom}>
        <SVGIcon variant="refresh" width="50px" />
      </EpisodeNavButton>
      <EpisodeNavButton type="button" onClick={onShowDetails}>
        <SVGIcon variant="forwardIcon" width="50px" color="darkgreen" />
      </EpisodeNavButton>
    </EpisodeHeader>
  );
}

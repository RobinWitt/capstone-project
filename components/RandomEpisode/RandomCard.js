import { useRouter } from "next/router";
import {
  EpisodeImage,
  EpisodeNavButton,
  StyledEpisodeCard,
} from "../Episode/Episode.styled";
import { getCoverURL } from "../Episode/EpisodeFunctions";
import SVGIcon from "../Icons";
import {
  RandomEpisodeHeader,
  RandomEpisodeNavigation,
} from "./RandomEpisode.styled";

export default function RandomCard({ coverlink, onSetRandom, onShowDetails }) {
  const router = useRouter();

  return (
    <StyledEpisodeCard>
      <RandomEpisodeHeader>
        <EpisodeNavButton
          type="button"
          onClick={router.back}
          aria-label="zur vorherigen Seite"
        >
          <SVGIcon variant="returnIcon" width="50px" color="darkgreen" />
        </EpisodeNavButton>
        <h2>zufällige Folge</h2>
      </RandomEpisodeHeader>
      <EpisodeImage
        src={getCoverURL(coverlink)}
        alt="Cover der zufälligen Folge"
        width={400}
        height={400}
        priority
      />
      <RandomEpisodeNavigation>
        <EpisodeNavButton
          onClick={onSetRandom}
          aria-label="neue zufällige Folge"
        >
          <SVGIcon variant="refresh" width="50px" color="darkred" />
          <p>andere Folge</p>
        </EpisodeNavButton>
        <EpisodeNavButton
          type="button"
          onClick={onShowDetails}
          aria-label="Detailseite anzeigen"
        >
          <SVGIcon variant="check" width="50px" color="darkgreen" />
          <p>Details anzeigen</p>
        </EpisodeNavButton>
      </RandomEpisodeNavigation>
    </StyledEpisodeCard>
  );
}

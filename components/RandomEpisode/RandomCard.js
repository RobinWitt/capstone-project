import { EpisodeImage, StyledEpisodeCard } from "../Episode/Episode.styled";
import { getCoverURL } from "../Episode/EpisodeFunctions";

export default function RandomCard({ coverlink, children }) {
  return (
    <StyledEpisodeCard>
      {children}
      <EpisodeImage
        src={getCoverURL(coverlink)}
        alt="Cover der zufälligen Folge"
        width={400}
        height={400}
        priority
      />
    </StyledEpisodeCard>
  );
}

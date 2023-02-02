import { useState } from "react";
import { getFormattedDate } from "../Episode/EpisodeFunctions";
import SVGIcon from "../Icons";
import {
  FavButton,
  EpisodeLink,
  OverviewListItem,
  OverviewCard,
  OverviewImage,
  Preview,
  PreviewImage,
  PreviewDate,
} from "./EpisodesList.styled";

export default function EpisodeListItem({
  episodeNumber,
  title,
  href,
  parts,
  onHandleFavorites,
  isFaved,
  cover,
  releasedate,
}) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <OverviewListItem>
      <OverviewCard>
        <EpisodeLink href={href}>
          <p>
            #{episodeNumber} ...{title}{" "}
            {parts?.length > 0 ? "(Spezialfolge)" : ""}
          </p>
        </EpisodeLink>
        <FavButton
          type="button"
          onClick={() => {
            setShowPreview(!showPreview);
          }}
        >
          <SVGIcon
            variant={showPreview ? "chevronUp" : "chevronDown"}
            width="25px"
          />
        </FavButton>
        <FavButton type="button" onClick={onHandleFavorites}>
          <SVGIcon
            variant={isFaved ? "favoriteFilled" : "favoriteEmpty"}
            width="25px"
          />
        </FavButton>
      </OverviewCard>
      {showPreview && (
        <Preview>
          <PreviewImage src={cover} alt="bla" width={400} height={400} />
          <PreviewDate>{getFormattedDate(releasedate)}</PreviewDate>
        </Preview>
      )}
    </OverviewListItem>
  );
}

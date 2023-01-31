export function getCoverURL(links) {
  if (links) {
    const { cover_kosmos, cover_itunes, cover } = links;
    if (cover_kosmos) {
      return cover_kosmos;
    } else if (cover_itunes) {
      return cover_itunes;
    } else if (cover) {
      return cover;
    } else {
      return false;
    }
  }
}

export function getFormattedDate(date) {
  if (date) {
    const splitDate = date.split("-");
    const formattedDate =
      splitDate[2] + "." + splitDate[1] + "." + splitDate[0];
    return formattedDate;
  } else {
    return false;
  }
}

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

// https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property/26759127#26759127

export function sortFirstToLast(episodes) {
  return episodes.slice().sort(function (a, b) {
    return (
      new Date(a.veröffentlichungsdatum) - new Date(b.veröffentlichungsdatum)
    );
  });
}

export function sortLastToFirst(episodes) {
  return episodes.slice().sort(function (a, b) {
    return (
      new Date(b.veröffentlichungsdatum) - new Date(a.veröffentlichungsdatum)
    );
  });
}

export function sortEpisodesByDate(episodes, ascending) {
  if (ascending) {
    return episodes.slice().sort(function (a, b) {
      return (
        new Date(a.veröffentlichungsdatum) - new Date(b.veröffentlichungsdatum)
      );
    });
  }
  return episodes.slice().sort(function (a, b) {
    return (
      new Date(b.veröffentlichungsdatum) - new Date(a.veröffentlichungsdatum)
    );
  });
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

export function getMostRecentEpisode(episodes) {
  return episodes
    .slice()
    .sort(function (a, b) {
      return (
        new Date(a.veröffentlichungsdatum) - new Date(b.veröffentlichungsdatum)
      );
    })
    .at(-1);
}

// https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-3.php
export function isEpisodeReleased(episode) {
  const { veröffentlichungsdatum: releasedate } = episode;
  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  const year = today.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }
  const currentDate = year + "-" + month + "-" + day;

  if (releasedate <= currentDate) {
    return true;
  }
  return false;
}

export function filterEpisodes(episodes, filter) {
  if (filter) {
    return episodes.filter(({ teile }) => teile.length > 0);
  }
  return episodes;
}

export function filterEpisodesByNumber(episodes, episodeNumber) {
  if (episodeNumber) {
    const [filteredEpisodes] = episodes.filter(
      ({ nummer: number }) => number === parseInt(episodeNumber)
    );
    return filteredEpisodes;
  }
}

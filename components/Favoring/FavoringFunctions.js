export function checkFavorites(favorites, number) {
  return favorites.includes(number);
}

export function toggleFavorites(favorites, number) {
  if (favorites.includes(number)) {
    return favorites.filter((favorite) => favorite != number);
  } else {
    return [...favorites, number];
  }
}

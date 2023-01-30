export function checkFavorites(favorites, number) {
  return favorites.includes(number);
}

export function handleFavorites(favorites, number) {
  const isFaved = checkFavorites(favorites, number);
  if (isFaved) {
    return favorites.filter((favorite) => favorite != number);
  } else {
    return [...favorites, number];
  }
}

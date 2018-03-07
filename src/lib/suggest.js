// @flow
type Query = string;

type Predicate<T> = (T) => string;

function suggest<T>(
  query: Query,
  data: Array<T>,
  predicate: Predicate<T>,
): Array<T> {
  const q = query.trim();
  if (q === '') {
    return [];
  }
  return data.filter((item) =>
    new RegExp(`${q}`, 'i').test(predicate(item)),
  );
}

export default suggest;

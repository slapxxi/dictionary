// @flow
type Query = string;

type Data = Array<any>;

type Predicate = (any) => string;

function suggest(query: Query, data: Data, predicate: Predicate) {
  const q = query.trim();
  if (q === '') {
    return [];
  }
  return data.filter((item) =>
    new RegExp(`${q}`, 'i').test(predicate(item)),
  );
}

export default suggest;

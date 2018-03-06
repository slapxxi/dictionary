// @flow
type Query = string;

type Data = Array<any>;

function suggest(query: Query, data: Data) {
  return data.filter((item) =>
    new RegExp(`${query}`, 'i').test(item.text),
  );
}

export default suggest;

import reducer from './reducers';
import { view, changeIndex, learn } from './actions';

const mockState = {
  index: 0,
  entries: [{ id: 0, viewCount: 0 }, { id: 1, viewCount: 0 }],
};

describe('when changing index', () => {
  it('changes index', () => {
    const store = reducer(mockState, changeIndex(1));
    expect(store).toMatchSnapshot();
  });

  it('does not change index if beyond limits', () => {
    const store = reducer(mockState, changeIndex(2));
    expect(store).toMatchSnapshot();
  });
});

describe('when viewed', () => {
  it('increases view count of item with matching id', () => {
    const store = reducer(mockState, view(0));
    expect(store).toMatchSnapshot();
  });

  it('ignores view count non matching items', () => {
    const store = reducer(mockState, view(2));
    expect(store).toMatchSnapshot();
  });
});

describe('when learning', () => {
  it('learns matching word', () => {
    const store = reducer(mockState, learn(0));
    expect(store).toMatchSnapshot();
  });

  it('ignores non matching words', () => {
    const store = reducer(mockState, learn(2));
    expect(store).toMatchSnapshot();
  });
});

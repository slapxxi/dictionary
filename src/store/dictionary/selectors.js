function nonViewedCount(state) {
  return state.dictionary.entries.filter((e) => e.viewCount === 0)
    .length;
}

export { nonViewedCount };

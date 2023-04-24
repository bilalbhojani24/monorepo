export const getCiDataBySlug = (slug) => (state) =>
  state.integrations.ciData[slug] || null;

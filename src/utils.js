export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
export const isStudio = () => {
  try { return new URLSearchParams(window.location.search).has("studio"); } catch { return false; }
};

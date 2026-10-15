export const parseStat = (raw) => {
  const match = /^(\d+)(.*)$/.exec(String(raw));
  return match ? { number: Number(match[1]), suffix: match[2] } : { number: null, suffix: String(raw) };
};

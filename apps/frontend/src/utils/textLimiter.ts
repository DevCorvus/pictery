export function textLimiter(text: string, limit = 20): string {
  if (text.length > limit) {
    return text.slice(0, limit).concat('...');
  } else {
    return text;
  }
}

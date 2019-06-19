export const urljoin = (strings: Array<string>, ...values: Array<string>) => {
  const result = [];
  for (let i = 0; i < strings.length - 1; i++) {
    result.push(strings[i], encodeURIComponent(values[i]));
  }
  result.push(strings[strings.length - 1]);
  return result.join("");
};

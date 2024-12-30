export function safeJsonParse<T>(str: string) {
  try {
    const jsonValue: T = JSON.parse(str);

    return jsonValue;
  } catch {
    return undefined;
  }
}

export function JSONBeautify(str: string) {
  const obj = safeJsonParse(str);

  if (obj) {
    return JSON.stringify(obj, null, 2);
  }

  return str;
}

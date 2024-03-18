export function shuffleArray<T>(arr: T[]) {
  const copyArr = [...arr];
  const result: T[] = [];
  while (copyArr.length > 0) {
    const randomElement = Math.random() * copyArr.length;
    result.push(copyArr.splice(randomElement, 1)[0]);
  }
  return result;
}

export default shuffleArray;

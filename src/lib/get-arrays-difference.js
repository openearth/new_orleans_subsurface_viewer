export default function arrayDiff(arrayA, arrayB) {
  return arrayA.filter(x => !arrayB.includes(x));
}

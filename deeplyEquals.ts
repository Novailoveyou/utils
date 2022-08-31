// space & time complexity: O(n)
export const deeplyEquals = (a: any, b: any): boolean => {
  const checkIfPrimitive = (value: any): boolean =>
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'bigint' ||
    typeof value === 'boolean' ||
    typeof value === 'undefined' ||
    typeof value === 'symbol' ||
    value === null

  const aIsPrimitive = checkIfPrimitive(a)
  const bIsPrimitive = checkIfPrimitive(b)

  if (aIsPrimitive && bIsPrimitive) {
    const bothNaN =
      typeof a !== 'string' && typeof b !== 'string' && isNaN(a) && isNaN(b)
    if (bothNaN) return true

    return a === b
  }

  return JSON.stringify(a) === JSON.stringify(b) // deeplyEquals({a: 1, b: 2}, {b: 2, a: 1}) // false

  // slow and more generic
  // const aIsArray = Array.isArray(a)
  // const bIsArray = Array.isArray(b)

  // if (aIsArray && bIsArray) {
  //   if (a.length !== b.length) return false

  //   if (a.some((item, idx) => !deeplyEquals(item, b[idx]))) return false

  //   return true
  // }

  // const aIsObject = typeof a === 'object' && !aIsPrimitive
  // const bIsObject = typeof b === 'object' && !bIsPrimitive

  // if (aIsObject && bIsObject) {
  //   // TODO: handle Map & Set & Date & WeakMap & WeakSet
  //   const aKeys = Object.keys(a)
  //   const bKeys = Object.keys(b)

  //   if (!deeplyEquals(aKeys, bKeys)) return false

  //   if (aKeys.some(key => !deeplyEquals(a[key], b[key]))) return false

  //   return true
  // }

  // return false
}

export const deeplyEqualsTest = () => {
  const array = new Array(100000).fill('a')

  // TODO: test more cases & edge cases & use a test library peraphs
  return {
    true: [
      deeplyEquals(1, 1),
      deeplyEquals('a', 'a'),
      deeplyEquals(NaN, NaN),
      deeplyEquals([], []),
      deeplyEquals([1], [1]),
      deeplyEquals(
        [
          [1, 2],
          [3, 4]
        ],
        [
          [1, 2],
          [3, 4]
        ]
      ),
      deeplyEquals({}, {}),
      deeplyEquals({ a: 1 }, { a: 1 }),
      deeplyEquals({ a: 1, obj: { b: 2 } }, { a: 1, obj: { b: 2 } }),
      deeplyEquals(null, null),
      deeplyEquals(undefined, undefined),
      deeplyEquals(array, array)
    ],
    false: [
      deeplyEquals(1, 0),
      deeplyEquals('a', 'b'),
      deeplyEquals(NaN, 10),
      deeplyEquals(NaN, 'NaN'),
      deeplyEquals([], [1]),
      deeplyEquals([10], [1])
    ]
  }
}

console.log(deeplyEqualsTest())

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

  const aIsArray = Array.isArray(a)
  const bIsArray = Array.isArray(b)

  if (aIsArray && bIsArray) {
    if (a.length !== b.length) return false

    if (a.some((item, idx) => !deeplyEquals(item, b[idx]))) return false

    return true
  }

  const aIsObject = typeof a === 'object' && !aIsPrimitive
  const bIsObject = typeof b === 'object' && !bIsPrimitive

  if (aIsObject && bIsObject) {
    // TODO: handle Map & Set & Date & WeakMap & WeakSet
    const aKeys = Object.keys(a)
    const bKeys = Object.keys(b)

    if (!deeplyEquals(aKeys, bKeys)) return false

    if (aKeys.some(key => !deeplyEquals(a[key], b[key]))) return false

    return true
  }

  return false
}

export const deeplyEqualsTest = () => {
  const obj1 = {}

  const obj2 = {}

  const obj3 = {
    a: 1,
    b: {
      a: '123'
    },
    c: [1, 2, 4]
  }

  const obj4 = {
    a: 1,
    b: {
      a: '123',
      b: null
    },
    c: [1, NaN, 3]
  }

  const obj5 = {
    a: 1,
    b: {
      a: '123',
      b: null
    },
    c: [1, NaN, 3]
  }

  // TODO: test more cases & edge cases & use a test library peraphs
  return {
    true: [
      deeplyEquals('123', '123'),
      deeplyEquals(NaN, NaN),
      deeplyEquals(obj1, obj2),
      deeplyEquals(obj4, obj5)
    ],
    false: [
      deeplyEquals(obj3, obj4),
      deeplyEquals(123, '123'),
      deeplyEquals(obj1, NaN),
      deeplyEquals(obj1, null),
      deeplyEquals(NaN, null)
    ]
  }
}

console.log(deeplyEqualsTest())

export const normalize = (s) => s.replace(/\s+/g, ' ').trim()

export const textEq = (expected) => ($el) =>
    expect(normalize($el.text())).to.eq(expected)

export const textMatch = (re) => ($el) =>
    expect(normalize($el.text())).to.match(re)

export const textContains = (expected) => ($el) =>
    expect(normalize($el.text())).to.contain(expected)
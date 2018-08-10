

const getType = require('./getType')

it('check get arg type', () => {

  expect(getType( -1 )).toBe('integer')

  expect(getType( 0 )).toBe('integer')

  expect(getType( {aa:'bb'} )).toBe('object')

  expect(getType( [] )).toBe('array')

  expect(getType( null )).toBe('object')

  expect(getType(  )).toBe('undefined')

  expect(getType( undefined )).toBe('undefined')
})
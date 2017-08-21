const expect = require('expect');
const {generateMessage, generateLocationMsg} = require('./message');


describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'alex';
    const text = 'test text';
    const result = generateMessage(from, text);
    expect(result.from).toBe(from);
    expect(result.text).toBe(text);
    expect(result.createdAt).toBeA('number');
  })
});

describe('generateLocationMsg', () => {
  it('should generate correct location object', () => {
    const lat = 1, long = 2;
    const result = generateLocationMsg('alex', lat, long);
    expect(result.createdAt).toBeA('number');
    expect(result).toInclude({
      from: 'alex',
      url: `https://www.google.com/maps?q=${lat},${long}`
    });
  });
});
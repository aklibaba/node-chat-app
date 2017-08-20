const expect = require('expect');
const {generateMessage} = require('./message');


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
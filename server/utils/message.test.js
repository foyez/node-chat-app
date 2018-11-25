const expect = require('expect')
const { generateMessage } = require('./message')

const message = [{
  from: 'Foyez',
  text: 'Hi there',
  createdAt: 123
}]

describe('generateMessage', () => {
  it ('should generate correct message object', () => {
    const from = 'Foyez'
    const text = 'Hi there'
    const message = generateMessage (from, text)

    expect(typeof message.createdAt).toBe('number')
    expect(message).toMatchObject({ from, text })
  })
})
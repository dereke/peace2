describe('my test', () => {
  it('passes', () => {})
  it('fails', () => {throw new Error('oops I failed')})
  it('takes a long time', done => {
    setTimeout(done, 5000)
  })
})

it('should demonstrate the mock command 1', async () => {
  let mock = await browser.mock('**/objects/7', { fetchResponse: false })
  mock.respond({ "test": "passed" }).on('continue', async (requestId) => {
    console.log('1=================', requestId)
  })
  await browser.url('https://api.restful-api.dev/objects/7') 
  await browser.pause(1000)
  mock.respond({ "test2": "passed" }).on('continue', async (requestId) => {
    console.log('2=================', requestId)
  })
  await browser.url('https://api.restful-api.dev/objects/7') 
  await mock.restore() // await browser.mockRestoreAll() 
})

it('should demonstrate the mock command 2', async () => {
  const mock = await browser.mock('**/objects/7', { fetchResponse: false })
  mock.respond({ "test3": "passed" }).on('continue', async (requestId) => {
    console.log('3=================', requestId)
  })
  await browser.url('https://api.restful-api.dev/objects/7') 
  await browser.pause(1000)
  await browser.mockRestoreAll()
  await browser.url('https://api.restful-api.dev/objects/7')
  await browser.pause(1000)
})
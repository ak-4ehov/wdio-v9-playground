import { When } from '@cucumber/cucumber'

When('should demonstrate the mock.respond command', async () => {
  let mock = await browser.mock('**/objects/7', { fetchResponse: false })
  mock.respond({ "test": "passed" }).on('continue', async (requestId) => {
    console.log('1=================', requestId)
  })
  await browser.url('https://api.restful-api.dev/objects/7') // shows WebdriverIO logo instead of Google
  await browser.pause(1000)
  mock.respond({ "test2": "passed" }).on('continue', async (requestId) => {
    console.log('2=================', requestId)
  })
  await browser.url('https://api.restful-api.dev/objects/7') // shows WebdriverIO logo instead of Google
  await browser.pause(1000)
  await mock.restore()
})

When('should demonstrate the mock.respond does not work', async () => {
  const mock = await browser.mock('**/objects/7', { fetchResponse: false })
  mock.respond({ "test3": "failed" }).on('continue', async (requestId) => {
    console.log('3=================', requestId)
  })
  await browser.url('https://api.restful-api.dev/objects/7') // shows WebdriverIO logo instead of Google
  await browser.pause(1000)
  await mock.restore()
  await browser.url('https://api.restful-api.dev/objects/7')
  await browser.pause(1000)
})
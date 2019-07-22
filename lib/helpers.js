module.exports = {
  click: async function (page, selector) {
    try {
      page.waitForSelector(selector)
      page.click(selector)
    } catch (error) {
      throw new Error(`Could not click on selector: ${selector}. Error: ${error.message}`)
    }
  },

  typeText: async function (page, text, selector) {
    try {
      await page.waitForSelector(selector)
      await page.type(selector, text)
    } catch (error) {
      throw new Error(`Could not type text into selector: ${selector}. Error: ${error.message}`)
    }
  },

  loadUrl: async function (page, url) {
    await page.goto(url, {waitUntil: 'networkidle0'})
  },

  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector)
      return await page.$eval(selector, e => e.innerHTML)
    } catch (error) {
      throw new Error(`Cannot get text from selector: ${selector}. Error: ${error.message}`)
    }
  },

  getCount: async function (page, selector) {
    try {
      await page.waitForSelector(selector)
      return await page.$$eval(selector, items => items.length)
    } catch (error) {
      throw new Error(`Cannot get count of selector: ${selector}. Error: ${error.message}`)
    }
  },

  waitForText: async function (page, selector, text) {
    try {
      await page.waitForSelector(selector)
      await page.waitForFunction(
        `document.querySelector("${selector}").innerText.includes("${text}")`
      )
    } catch (error) {
      throw new Error(`Text: ${text} not found for selector ${selector}. Error: ${error.message}`)
    }
  },

  pressKey: async function (page, key) {
    try {
      await page.keyboard.press(key)
    } catch (error) {
      throw new Error(`Could not press key: ${key} on the keyboard`)
    }
  },

  shouldExist: async function (page, selector) {
    try {
      await page.waitForSelector(selector, {visible: true})
    } catch (error) {
      throw new Error(`Selector: ${selector} does not exist`)
    }
  },

  shouldNotExist: async function (page, selector) {
    try {
      await page.waitFor(() => !document.querySelector(selector))
    } catch (error) {
      throw new Error(`Selector: ${selector} is visible, but should not`)
    }
  }
}

import playwright, { type Browser } from 'playwright'
import parseCities from './parsers/cities.ts'
import { parseRows, parseRowsCheerio } from './parsers/rows.ts'
import { fileExists } from './utils/fileExists.ts'
import { writeFile, appendFile } from 'fs/promises'

const FILE_PATH = './times.csv'
const HEADER =
  'city,date,month,day,weekday,hijri_day,tong_saharlik,quyosh,peshin,asr,shom_iftor,xufton'
const main = async () => {
  const browser: Browser = await playwright.chromium.launch({ headless: true })
  const page = await browser.newPage()

  await page.goto('https://islom.uz/lotin')
  const cities = await parseCities(page)
  const needsHeader = !(await fileExists('./times.csv'))

  if (needsHeader) {
    // File doesn't exist, so create it and write the header
    await writeFile(FILE_PATH, HEADER, 'utf8')
  }

  for (const city of cities) {
    // const page = await browser.newPage()
    // await page.goto('https://islom.uz/lotin')
    for (let i = 1; i < 13; i++) {
      console.log(`${city.city}: month ${i}`)
      // await page.goto(`https://islom.uz/vaqtlar/${city.id}/${i}`)
      const days = await parseRowsCheerio(city.id, i)
      const rows = days.map(
        (day) =>
          `${city.city},${day.date},${day.month},${day.day},${day.weekday},${day.hijri_day},${day.tong_saharlik},${day.quyosh},${day.peshin},${day.asr},${day.shom_iftor},${day.xufton}`
      )
      // console.log({ city, month: i, days })
      await appendFile(FILE_PATH, '\n' + rows.join('\n'))
    }
    // await page.close()
  }
  await browser.close()
}

main()

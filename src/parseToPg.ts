import playwright, { type Browser } from 'playwright'
import parseCities from './parsers/cities.ts'
import { parseRowsCheerio } from './parsers/rows.ts'
import { db } from './db/db.ts'
import { prayerTimes } from './db/schema.ts'

const main = async () => {
  const browser: Browser = await playwright.chromium.launch({ headless: true })
  const page = await browser.newPage()

  await page.goto('https://islom.uz/lotin')
  const cities = await parseCities(page)
  await page.close()
  await browser.close()
  for (const city of cities) {
    const rows = []
    for (let i = 1; i < 13; i++) {
      console.log(`${city.city}: month ${i}`)
      const days = await parseRowsCheerio(city.id, i)
      for (const day of days) {
        if (!day.date) {
          console.error(
            `Skipping invalid date for ${city.city}, month ${i}, day ${day.day}`
          )
          continue
        }
        rows.push({
          city: city.city,
          date: day.date,
          month: day.month,
          day: day.day,
          weekday: day.weekday,
          uniqueDate: `${city.city}-${day.date}`,
          hijriDay: day.hijri_day,
          tongSaharlik: day.tong_saharlik,
          quyosh: day.quyosh,
          peshin: day.peshin,
          asr: day.asr,
          shomIftor: day.shom_iftor,
          xufton: day.xufton,
        })
      }
    }
    await db.insert(prayerTimes).values(rows).onConflictDoNothing()
  }
}

main()

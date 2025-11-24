import * as cheerio from 'cheerio'
import ky from 'ky'
import type { Page } from 'playwright'

export async function parseRows(page: Page, month: number) {
  const days = await page.$$eval('table.table-bordered tbody tr', (rows) => {
    const days = rows.map((row) => {
      const cells = row.querySelectorAll('td')
      return {
        day: Number(cells[1]?.innerText?.trim()),
        hijri_day: Number(cells[0]?.innerText?.trim()),
        weekday: cells[2]?.innerText?.trim() || '',
        tong_saharlik: cells[3]?.innerText?.trim() || '',
        quyosh: cells[4]?.innerText?.trim() || '',
        peshin: cells[5]?.innerText?.trim() || '',
        asr: cells[6]?.innerText?.trim() || '',
        shom_iftor: cells[7]?.innerText?.trim() || '',
        xufton: cells[8]?.innerText?.trim() || '',
      }
    })
    return days
  })
  const daysWithDate = days.map((day) => ({
    ...day,
    month,
    date: new Date(2025, month - 1, day.day).toISOString().split('T')[0],
  }))
  return daysWithDate
}

const weekdayMap: Record<string, string> = {
  душанба: 'Dushanba',
  сешанба: 'Seshanba',
  чоршанба: 'Chorshanba',
  пайшанба: 'Payshanba',
  жума: 'Juma',
  шанба: 'Shanba',
  якшанба: 'Yakshanba',
}

export async function parseRowsCheerio(cityId: number, month: number) {
  const content = await ky
    .get(`https://islom.uz/vaqtlar/${cityId}/${month}`)
    .text()
  const $ = cheerio.load(content)

  // Use Cheerio's selection and map methods
  // Note: Cheerio's map() returns a Cheerio object, so we must call .get() at the end to get a plain array
  const days = $('table.table-bordered tbody tr')
    .map((_, row) => {
      const cells = $(row).find('td')

      // Helper to get text by index safely
      const getText = (idx: number) => $(cells[idx]).text().trim()
      const rawWeekday = getText(2)
      const weekday = weekdayMap[rawWeekday.toLowerCase()] || rawWeekday || ''

      return {
        day: Number(getText(1)),
        hijri_day: Number(getText(0)),
        weekday,
        tong_saharlik: getText(3) || '',
        quyosh: getText(4) || '',
        peshin: getText(5) || '',
        asr: getText(6) || '',
        shom_iftor: getText(7) || '',
        xufton: getText(8) || '',
      }
    })
    .get() // Converts the Cheerio object to a standard JavaScript array

  // Date post-processing
  const daysWithDate = days.map((day) => ({
    ...day,
    month,
    // Using 2025 as per original snippet
    date: new Date(2025, month - 1, day.day).toISOString().split('T')[0],
  }))

  return daysWithDate
}

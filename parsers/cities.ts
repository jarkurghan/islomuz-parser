import type { Page } from 'playwright'

export default async function parseCities(
  page: Page
): Promise<{ city: string; id: number }[]> {
  await page.goto('https://islom.uz/vaqtlar/1/1')
  const cities = await page.evaluate(() => {
    const options: NodeListOf<HTMLOptionElement> = document.querySelectorAll(
      'select#basic option'
    )
    return Array.from(options)
      .map((option: HTMLOptionElement) => ({
        city: option.text,
        id: Number(option.value.split('/')[2]),
      }))
      .filter((option) => option.id)
  })
  return cities
}

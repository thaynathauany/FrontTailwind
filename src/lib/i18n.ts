export async function loadMessages(locale: 'pt' | 'es') {
  const messages = await import(`../i18n/${locale}.json`)
  return messages.default
}
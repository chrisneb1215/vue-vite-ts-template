// ✅ Updated List of Social Media Crawlers (Including Messenger, IG, X)
const crawlerPatterns = [
    'facebookexternalhit', // ✅ Messenger & Facebook
    'Instagram', // ✅ Instagram
    'Twitterbot', // ✅ X (formerly Twitter)
    'WhatsApp', // ✅ WhatsApp
    'TelegramBot', // ✅ Telegram
    'Viber', // ✅ Viber
    'Discordbot', // ✅ Discord
    'LinkedInBot', // ✅ LinkedIn
    'Pinterest', // ✅ Pinterest
    'Applebot', // ✅ Apple Preview (iMessage, Safari Preview)
    'Slackbot', // ✅ Slack
    'Googlebot', // ✅ Google
    'Bingbot', // ✅ Bing
    'DuckDuckBot', // ✅ DuckDuckGo
    'Yahoo! Slurp', // ✅ Yahoo
    'YandexBot', // ✅ Yandex
    'Baiduspider', // ✅ Baidu
    'bot', // ✅ General bots
    'crawl', // ✅ General crawlers
    'spider' // ✅ General spiders
]

export const checkIsCrawler = (userAgent = '') => {
    if (!userAgent) {
        return false
    }

    return crawlerPatterns.some((pattern) => userAgent.toLowerCase().includes(pattern.toLowerCase()))
}




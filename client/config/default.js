import { version } from '../package.json'

export default {
  server: {
    host: 'https://data.jsdelivr.com',
    docsHost: 'https://www.jsdelivr.com',
    port: 4454,
    debugToken: '',
    userAgent: `data.jsdelivr.com/${version} (https://github.com/jsdelivr/data.jsdelivr.com)`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': '*',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Cross-Origin-Resource-Policy': 'cross-origin',
      'Timing-Allow-Origin': '*',
      Vary: 'Accept-Encoding',
    },
  },
  db: {
    type: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'jsdelivr-stats',
    },
  },
  v1: {
    cdn: {
      sourceUrl: 'https://cdn.jsdelivr.net',
    },
    npm: {
      sourceUrl: ['https://registry.npmjs.org'],
    },
    gh: {
      apiToken: '',
      sourceUrl: 'https://api.github.com',
    },
    maxAgeStatic: 365 * 24 * 60 * 60,
    maxStaleStatic: 24 * 60 * 60,
    maxAgeOneWeek: 7 * 24 * 60 * 60,
    maxStaleOneWeek: 24 * 60 * 60,
    maxAgeShort: 5 * 60,
    maxStaleShort: 60 * 60,
    maxStaleError: 24 * 60 * 60,
  },
}

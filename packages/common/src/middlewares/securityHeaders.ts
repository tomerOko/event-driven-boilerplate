import helmet from 'helmet';

const ga = 'https://www.google-analytics.com';
const gas = 'https://ssl.google-analytics.com';
const gtm = 'https://www.googletagmanager.com';

const or = 'https://*.openreplay.com';
const ors = 'https://openreplay.smartbull.co.il';

const self = "'self'";
const none = "'none'";

export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'default-src': [self],
      'base-uri': [self],
      'block-all-mixed-content': [],
      'font-src': [self, 'https:', 'data:'],
      'form-action': [self],
      'frame-ancestors': [self],
      'img-src': [self, 'data:', 'https:', 'nonce-12345'],
      'object-src': [none],
      'worker-src': [self, 'blob:', or, ors],
      'script-src': [self, ga, gas, gtm, 'wss:', or, ors],
      'script-src-attr': ["'none'"],
      'style-src': [self, 'https:', 'http', "'unsafe-inline'", or, ors, 'https://unpkg.com/tailwindcss@%5E2/dist/'],
      'upgrade-insecure-requests': [],
      'connect-src': [self, ga, gas, gtm, 'wss:', or, ors],
      'frame-src': [self, ga, gas, gtm, or, ors],
      'manifest-src': [self],
      'child-src': [self, ga, gas, gtm, or, ors],
      'media-src': [self, ga, gas, gtm, or, ors],
      'navigate-to': [self],
      'report-to': [self],
      'report-uri': [self],
    },
  },
  crossOriginEmbedderPolicy: false,
});

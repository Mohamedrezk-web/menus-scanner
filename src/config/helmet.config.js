import helmet from 'helmet';

const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'img-src': ["'self'", 'data:', 'http://localhost:3000'],
    },
  },
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  crossOriginEmbedderPolicy: false,
};
const configureHelmet = () => helmet(helmetConfig);

export default configureHelmet;

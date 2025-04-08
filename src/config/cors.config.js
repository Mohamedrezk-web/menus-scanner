import cors from 'cors';

const corsOptions = {
  origin: '*',
  allowHeaders: [
    'Content-Type',
    'Upgrade-Insecure-Requests',
    'X-Custom-Header',
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  exposeHeaders: ['X-Kuma-Revision', 'Content-Length'],
  maxAge: 600,
  credentials: true,
};

const configureCors = () => cors(corsOptions);

export default configureCors;

import express from 'express';

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  return res
    .status(200)
    .json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;

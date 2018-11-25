import Express from 'express';

const router = Express.Router();

router.get('/health', (req, res) =>
    res.send('OK')
);

export default router;

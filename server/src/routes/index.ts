
import { Router } from 'express';

import { login, signup, tokenVerify } from '../controllers/auth';
import { readAllHistoric } from '../controllers/historic';
import { createMarket, readAllMarket } from '../controllers/market';
import validateJWT from '../middleware/validateJwt';
import { createHistoric } from './../controllers/historic';

const router: Router = Router();

router.post('/auth/login', login);

router.get('/auth/verify', tokenVerify);

router.post('/auth/register', signup);

router.post('/market', createMarket);

router.get('/market', readAllMarket);

router.get('/historic', readAllHistoric);

router.post('/historic', createHistoric);

export default router;

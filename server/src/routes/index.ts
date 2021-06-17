
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

router.post('/market', validateJWT, createMarket);

router.get('/market', validateJWT, readAllMarket);

router.get('/historic', validateJWT, readAllHistoric);

router.post('/historic', validateJWT, createHistoric);

export default router;

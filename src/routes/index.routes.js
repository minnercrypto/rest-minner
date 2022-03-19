import { Router } from 'express';
import * as indexCtrl from '../controllers/index.controller';
import { isNotAuthenticated } from "../helpers/auth";

const router = Router();

router.get('/', isNotAuthenticated, indexCtrl.renderIndex);

router.get('/privacy', isNotAuthenticated, indexCtrl.renderPrivacy);

router.get('/legal', isNotAuthenticated, indexCtrl.renderLegal);

router.get('/cookies', isNotAuthenticated, indexCtrl.renderCookies);

export default router; 
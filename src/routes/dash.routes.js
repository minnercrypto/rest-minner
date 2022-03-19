import { Router } from 'express';
import * as dashCtrl from '../controllers/dash.controller';
import { isAuthenticated } from "../helpers/auth";

const router = Router();

router.get('/dashboard', isAuthenticated, dashCtrl.dashboard);

router.get('/balance', isAuthenticated, dashCtrl.balance);

router.get('/referral', isAuthenticated, dashCtrl.referral);

router.get('/reward', isAuthenticated, dashCtrl.reward);

router.get('/market', isAuthenticated, dashCtrl.market);

router.get('/profile', isAuthenticated, dashCtrl.profile);

router.put('/profile/:id', isAuthenticated, dashCtrl.profileUpdate);

export default router;
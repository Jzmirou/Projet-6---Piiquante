import {Router} from "express"
import * as sauceCtrl from  "../controllers/sauceCtrl.js"
import { auth } from "../middlewares/auth.js";
import { multerConfig } from "../middlewares/multerConfig.js";

export const router = Router()

router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multerConfig, sauceCtrl.addSauce);
router.put('/:id', auth, multerConfig, sauceCtrl.updateSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);
import {Router} from "express"
import * as userCtrl from  "../controllers/userCtrl.js"

export const router = Router()

router.post("/signup", userCtrl.signUp)
router.post("/login", userCtrl.login)
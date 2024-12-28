import {Router,Response,Request} from 'express'
const router:Router=Router()
import adminAuth from '../controller/adminAuth'
import ManageUsers from '../controller/manageUser'
import {noCache} from '../middleware/authmiddleware'
const adminAuthentication= new adminAuth()
router.get('/',noCache,adminAuthentication.getlogin)
router.post('/login',noCache,adminAuthentication.postLogin)

router.get('/dashboard',noCache,adminAuthentication.getDashboard)
router.post('/logout',noCache,adminAuthentication.logout)

const manageUser=new ManageUsers()

router.patch(`/edit/:id`,manageUser.updateUser)
router.delete(`/delete/:id`,manageUser.deleteUser)


export default router
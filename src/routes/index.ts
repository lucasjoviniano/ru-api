import { Router } from 'express'
import router from './campi'

const routes = Router();

routes.use('/', router)

export default routes
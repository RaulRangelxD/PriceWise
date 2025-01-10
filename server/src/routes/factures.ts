import { Router } from 'express'
import {
  getAllFactures,
  getFactureById,
  getFacturesByUserId,
  getAllFacturesByCompanyId,
  getAllFacturesByCompanyIdAndPagination,
  postFacture,
  patchFactureTotalAmount,
  deleteFacture,
} from '../controllers/factures.js'

export const facturesRouter = Router()

facturesRouter.get('/', getAllFactures)
facturesRouter.get('/userid/:user_id', getFacturesByUserId)
facturesRouter.get('/companyid/:company_id', getAllFacturesByCompanyId)
facturesRouter.get('/companyid/pag/:company_id', getAllFacturesByCompanyIdAndPagination)
facturesRouter.get('/id/:id', getFactureById)

facturesRouter.post('/', postFacture)

facturesRouter.patch('/id/:id/totalAmount', patchFactureTotalAmount)

facturesRouter.delete('/id/:id', deleteFacture)

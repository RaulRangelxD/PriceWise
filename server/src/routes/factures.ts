import { Router } from 'express'
import {
  getAllFactures,
  getFactureById,
  getFacturesByUserId,
  getAllFacturesByUserIdAndPagination,
  getAllFacturesByCompanyId,
  getAllFacturesByCompanyIdAndPagination,
  getFacturesByDateRange,
  getFacturesByDateRangeAndCompanyId,
  postFacture,
  patchFactureTotalAmount,
  deleteFacture,
} from '../controllers/factures.js'

export const facturesRouter = Router()

facturesRouter.get('/', getAllFactures)
facturesRouter.get('/userid/:user_id', getFacturesByUserId)
facturesRouter.get('/userid/pag/:userid', getAllFacturesByUserIdAndPagination)
facturesRouter.get('/companyid/:company_id', getAllFacturesByCompanyId)
facturesRouter.get('/companyid/pag/:companyid', getAllFacturesByCompanyIdAndPagination)
facturesRouter.get('/id/:id', getFactureById)
facturesRouter.get('/dateRange', getFacturesByDateRange)
facturesRouter.get('/dateRangeAndCompanyId', getFacturesByDateRangeAndCompanyId)

facturesRouter.post('/', postFacture)

facturesRouter.patch('/id/:id/totalAmount', patchFactureTotalAmount)

facturesRouter.delete('/id/:id', deleteFacture)

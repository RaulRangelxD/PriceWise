import { Router } from 'express';
import { getAllCompanies, getAllCompaniesByUserId, getAllCompaniesByUserIdAndPagination, getCompanyById, postCompany, patchCompany, deleteCompany } from '../controllers/companies.js';
export const companiesRouter = Router();
const x = () => {
    console.log('probe');
};
companiesRouter.get('/', getAllCompanies);
companiesRouter.get('/userid/:userid', getAllCompaniesByUserId);
companiesRouter.get('/userid/pag/:userid', getAllCompaniesByUserIdAndPagination);
companiesRouter.get('/id/:id', getCompanyById);
companiesRouter.post('/', postCompany);
companiesRouter.patch('/id/:id', patchCompany);
companiesRouter.delete('/id/:id', deleteCompany);
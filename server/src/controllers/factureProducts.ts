import { getAllFactureProductsModel, getFactureProductsByFactureIdModel, getFactureProductsByProductIdModel, postFactureProductModel, deleteFactureProductModel } from '../models/factureProducts.js'
import { defaultResponse } from '../utils/defaultRes.js'
import { Request, Response } from 'express'

export const getAllFactureProducts = async (req: Request, res: Response) => {
  try {
    const result = await getAllFactureProductsModel()
    defaultResponse({
      res,
      status: 200,
      message: 'Facture products retrieved successfully',
      data: result.rows,
    })
  } catch (e) {
    console.error('Error retrieving facture products from database', e)
    defaultResponse({
      res,
      status: 500,
      message: 'Error retrieving facture products',
    })
  }
}

export const getFactureProductsByFactureId = async (req: Request<{ facture_id: string }>, res: Response) => {
  const { facture_id } = req.params
  try {
    const result = await getFactureProductsByFactureIdModel(facture_id)
    defaultResponse({
      res,
      status: 200,
      message: 'Facture products retrieved successfully',
      data: result.rows,
    })
  } catch (e) {
    console.error('Error retrieving facture products by facture ID', e)
    defaultResponse({
      res,
      status: 500,
      message: 'Error retrieving facture products',
    })
  }
}

export const getFactureProductsByProductId = async (req: Request<{ product_id: string }>, res: Response) => {
  const { product_id } = req.params
  try {
    const result = await getFactureProductsByProductIdModel(product_id)
    defaultResponse({
      res,
      status: 200,
      message: 'Facture products retrieved successfully',
      data: result.rows,
    })
  } catch (e) {
    console.error('Error retrieving facture products by product ID', e)
    defaultResponse({
      res,
      status: 500,
      message: 'Error retrieving facture products',
    })
  }
}

export const postFactureProduct = async (req: Request, res: Response) => {
  const { factureId, productId, quantity, totalPrice } = req.body

  if (!factureId || !productId || quantity === undefined || totalPrice === undefined) {
    defaultResponse({
      res,
      status: 400,
      message: 'Missing required fields',
    })
    return
  }

  try {
    await postFactureProductModel(factureId, productId, quantity, totalPrice)
    defaultResponse({
      res,
      status: 201,
      message: 'Facture product created successfully',
    })
  } catch (e) {
    console.error('Error creating facture product in database', e)
    defaultResponse({
      res,
      status: 500,
      message: 'Error creating facture product',
    })
  }
}

export const deleteFactureProduct = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params

  try {
    await deleteFactureProductModel(id)
    defaultResponse({
      res,
      status: 200,
      message: 'Facture product deleted successfully',
    })
  } catch (e) {
    console.error('Error deleting facture product in database', e)
    defaultResponse({
      res,
      status: 500,
      message: 'Error deleting facture product',
    })
  }
}

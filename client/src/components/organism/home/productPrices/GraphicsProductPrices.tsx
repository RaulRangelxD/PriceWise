import { ProductPriceData } from '@/lib/types'
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export const GraphicsProductPrices = ({ productsData }: { productsData: ProductPriceData[] }) => {
  const chartData = productsData.map((product, index) => {
    const prevProduct = productsData[index + 1]
    const priceDifference = prevProduct ? Number(product.price) - Number(prevProduct.price) : 0
    const percentageDifference = prevProduct ? ((Number(product.price) - Number(prevProduct.price)) / Number(prevProduct.price)) * 100 : 0

    return {
      name: `Product ${product.id}`,
      Difference: priceDifference.toFixed(2),
      Percentage: percentageDifference.toFixed(2),
    }
  })

  return (
    <ResponsiveContainer className='m-2 bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25 rounded-xl p-2' width='100%' height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='Difference' stroke='#8884d8' />
        <Line type='monotone' dataKey='Percentage' stroke='#82ca9d' />
      </LineChart>
    </ResponsiveContainer>
  )
}

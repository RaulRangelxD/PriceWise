import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'
import { ProductPriceData } from '@/lib/types'

export const GraphicsProductPrices = ({ productsData }: { productsData: ProductPriceData[] }) => {
  const productsDataReverse = [...productsData].reverse()
  const chartData = productsDataReverse.map((product, index) => {
    const prevProduct = productsDataReverse[index - 1]
    const priceDifference = prevProduct ? Number(product.price) - Number(prevProduct.price) : 0
    const percentageDifference = prevProduct ? ((Number(product.price) - Number(prevProduct.price)) / Number(prevProduct.price)) * 100 : 0

    return {
      name: product.price || `Product ${index + 1}`,
      Price: Number(product.price),
      Difference: priceDifference.toFixed(2),
      Percentage: percentageDifference.toFixed(2),
    }
  })

  const CustomToolTip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const { Price, Difference, Percentage } = payload[0].payload as {
        Price: number
        Difference: string
        Percentage: string
      }

      return (
        <div className='bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50 p-2 rounded-xl shadow-md'>
          <p className='font-bold'>Price: {Price}</p>
          <p>Difference: {Difference}</p>
          <p>Percentage: {Percentage}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer className='m-2 bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25 rounded-xl p-2' width='100%' height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='Difference' label={{ value: 'Products', position: 'insideBottom', offset: -5 }} />
        <YAxis label={{ value: 'Price', angle: -90, position: 'insideLeft' }} />
        <Tooltip content={<CustomToolTip />} />
        <Line type='linear' dataKey='Price' stroke='#22C55E' />
      </LineChart>
    </ResponsiveContainer>
  )
}

import React, { useState, useEffect, useCallback } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps, LabelList } from 'recharts'
import { useAuth } from '@/context/AuthProvider'
import { getFacturesByDateRange, getFacturesByDateRangeAndCompanyId } from '@/api/factures'
import { FactureData } from '@/lib/types'
import { DateInput } from '@/components/atoms/inputs/DateInput'
import { DefaultButton } from '@/components/atoms/buttons/Button'

export const GraphicsFactures = ({ lastYear, companyIdInParams }: { lastYear: boolean; companyIdInParams?: number }) => {
  const { userInContext } = useAuth()
  const [facturesData, setFacturesData] = useState<FactureData[]>([])
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const userId = userInContext ? userInContext.id : null
  const [dataFetched, setDataFetched] = useState(false)

  const fetchFacturesData = useCallback(
    async (startDate: string, endDate: string) => {
      if (userId && startDate && endDate) {
        try {
          if (!companyIdInParams) {
            const data = await getFacturesByDateRange(userId, startDate, endDate)
            setFacturesData(data)
            return
          }
          const data = await getFacturesByDateRangeAndCompanyId(String(companyIdInParams), startDate, endDate)
          setFacturesData(data)
        } catch (error) {
          console.error('Error fetching factures data:', error)
        }
      }
    },
    [companyIdInParams, userId]
  )

  useEffect(() => {
    if (lastYear && !dataFetched) {
      const currentDate = new Date()
      const lastYearStartDate = new Date(currentDate.getFullYear() - 1, 0, 1)
      const lastYearEndDate = currentDate

      setStartDate(lastYearStartDate.toISOString().split('T')[0])
      setEndDate(lastYearEndDate.toISOString().split('T')[0])

      fetchFacturesData(lastYearStartDate.toISOString().split('T')[0], lastYearEndDate.toISOString().split('T')[0])
      setDataFetched(true)
    }
  }, [lastYear, dataFetched, fetchFacturesData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchFacturesData(startDate, endDate)
  }

  const chartData = formatFacturesForChart(facturesData)

  const CustomToolTip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const { Total } = payload[0].payload as { Total: number }

      return (
        <div className='bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50 p-2 rounded-xl shadow-md'>
          <p className='font-bold'>Total Amount: ${Total}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='mb-4 flex flex-row flex-wrap sm:flex-nowrap gap-4'>
        <DateInput placeholder='Start Date' value={startDate} onChange={setStartDate} required />
        <DateInput placeholder='End Date' value={endDate} onChange={setEndDate} required />
        <DefaultButton type='submit' className='min-w-28'>
          Get Data
        </DefaultButton>
      </form>

      <ResponsiveContainer className='m-0 sm:m-2 largebox-border-shadow' width='100%' height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' label={{ value: 'Months', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'Total Amount', angle: -90, position: 'insideLeft' }} />
          <Tooltip content={<CustomToolTip />} />
          <Line type='linear' dataKey='Total' stroke='#1398F6'>
            <LabelList dataKey='Total' position='top' formatter={(value: number) => `$${value.toFixed(2)}`} />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const formatFacturesForChart = (facturesData: FactureData[]) => {
  const monthlyTotals = facturesData.reduce((acc: Record<string, number>, facture) => {
    const monthYear = new Date(facture.date).toLocaleString('default', { month: 'short', year: 'numeric' })
    const totalAmount = Number(facture.total_amount)

    acc[monthYear] = (acc[monthYear] || 0) + totalAmount

    return acc
  }, {})

  return Object.entries(monthlyTotals).map(([month, total]) => ({
    name: month,
    Total: total,
  }))
}

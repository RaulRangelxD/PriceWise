'use client'

import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import Loading from '@/app/Loading'
import { FactureData } from '@/lib/types'
import { getFactureById } from '@/api/factures'
import { Facture } from '@/components/template/home/facture/Facture'

export default function FactureId() {
  const params = useParams<{ factureid: string }>()

  const [factureData, setFactureData] = useState<FactureData | null>(null)

  const getData = useCallback(async () => {
    try {
      const factureDataResult = await getFactureById(Number(params.factureid))
      setFactureData(factureDataResult)
    } catch (error) {
      console.error('Error fetching info:', error)
    }
  }, [params.factureid])

  useEffect(() => {
    getData()
  }, [getData])

  return !factureData ? <Loading msg='Loading data' /> : <Facture factureIdInParams={params.factureid} factureData={factureData} getData={getData} />
}

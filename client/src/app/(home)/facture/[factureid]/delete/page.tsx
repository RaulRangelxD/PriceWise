'use client'

import { DeleteFactureForm } from '@/components/organism/home/facture/DeleteFactureForm'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { FactureData } from '@/lib/types'
import { getFactureById } from '@/api/factures'
import Loading from '@/app/Loading'

export default function DeleteFacture() {
  const params = useParams<{ factureid: string }>()

  const [factureData, setFactureData] = useState<FactureData | null>(null)

  const getData = useCallback(async () => {
    try {
      const facturesDataResult = await getFactureById(Number(params.factureid))
      setFactureData(facturesDataResult)
    } catch (error) {
      console.error('Error fetching info:', error)
    }
  }, [params.factureid])

  useEffect(() => {
    getData()
  }, [getData])

  return !factureData ? <Loading msg='Loading data' /> : <DeleteFactureForm factureId={factureData.id} />
}

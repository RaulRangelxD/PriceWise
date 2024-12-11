'use client'

import { EditCompanyForm } from '@/components/organism/home/company/EditCompanyForm'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { CompanyData } from '@/lib/types'
import { getCompanyById } from '@/api/companies'
import Loading from '@/app/Loading'

export default function EditCompany() {
  const params = useParams<{ id: string }>()

  const [companyData, setCompanyData] = useState<CompanyData | null>(null)

  const getData = useCallback(async () => {
    try {
      const companiesDataResult = await getCompanyById(params.id)
      setCompanyData(companiesDataResult)
    } catch (error) {
      console.error('Error fetching info:', error)
    }
  }, [params.id])

  useEffect(() => {
    getData()
  }, [getData])

  return !companyData ? <Loading msg='Loading data' /> : <EditCompanyForm companyData={companyData} getData={getData} />
}

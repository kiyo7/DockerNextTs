//lib
import Link from 'next/link'
import React, { Suspense } from 'react'

//hooks
import { useDownloadUrl } from '../../hooks/useDownloadUrl'
import { useQueryOrganizations } from '../../hooks/query/useQueryOrganizations'

//components
import { PrimaryButton } from '../atoms/PrimaryButton'
import { SImage } from '../atoms/SImage'
import { Spinner } from '../atoms/Spinner'

export const OrganizationCard: React.FC = () => {
  const { data } = useQueryOrganizations()

  const { fullUrl: logoUrl } = useDownloadUrl(data?.logo, 'groupLogo')

  return (
    <>
      <div className="card z-0 my-8 w-72 bg-base-100 shadow-xl md:w-96">
        <figure>
          <Suspense fallback={<Spinner />}>
            <SImage img={logoUrl ? logoUrl : undefined} width={200} height={200} alt="groupLogo" />
          </Suspense>
        </figure>
        <div className="card-body">
          <h2 className="card-title ">
            <span className="mt-3 font-sans text-3xl font-medium">{data?.groupname}</span>
          </h2>
          <div className="card-actions justify-end hover:cursor-pointer hover:opacity-75">
            <Link href={`/management/${data?.id}`}>
              <a>
                <PrimaryButton buttonText={'管理画面へ'} buttonColor="accent" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

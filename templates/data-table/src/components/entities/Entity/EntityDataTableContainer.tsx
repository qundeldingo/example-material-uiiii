import React from 'react'
import {
  EntitiesQuery,
  IError,
  useEntityQuery,
} from '../../../generated/graphql'
import {
  ErrorBoundary,
  FilterProps,
  QueryBoundary,
  useFilter,
} from '@iteria-app/component-templates'
import { useNavigate } from 'react-router-dom'

interface IViewProps {
  data: EntitiesQuery
  error: IError | null
  loading: boolean
  onClickRow: (state: number) => void
  filterProps: FilterProps
}

interface IEnitityListContainerProps {
  View: React.FC<IViewProps>
}

const EntityListContainer: React.FC<IEnitityListContainerProps> = ({
  View,
}) => {
  const filterProps = useFilter()
  const navigate = useNavigate()

  const [data]: {
    data: EntitiesQuery
    fetching: boolean
    error: IError | null
  }[] = useEntityQuery({
    variables: {
      where: filterProps.filter,
      limit: filterProps.pageSize + filterProps.pageSize,
      offset: filterProps.offset,
      order_by: filterProps.sort,
    },
  })

  return (
    <ErrorBoundary>
      <QueryBoundary queryResponse={data}>
        <View
          data={data?.data?.Entity}
          error={data?.error}
          loading={data?.fetching}
          onClickRow={(id) => {
            navigate(id?.toString())
          }}
          filterProps={filterProps}
        />
      </QueryBoundary>
    </ErrorBoundary>
  )
}

export default EntityListContainer

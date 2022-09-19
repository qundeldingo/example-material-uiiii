import React from 'react'
import { Grid } from '@mui/material'
import EntityCardListItem from './EntityCardListItem'
import { EntitiesQuery } from '../../../generated/graphql'

export interface EntityCardListProps {
  data: EntitiesQuery
  loading: boolean
}

const EntityCardListView: React.FC<EntityCardListProps> = ({ data, loading }) => {
  return (
    <Grid
      container
      width={'100%'}
      sx={{ overflow: 'hidden', marginTop: '20px' }}
    >
      {data?.Entity?.map(
        (entity) => (
          <EntityCardListItem data={entity} key={entity.id} />
        )
      )}
    </Grid>
  )
}

export default EntityCardListView

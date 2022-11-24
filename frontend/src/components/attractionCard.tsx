import React from 'react'
import { useDispatch } from 'react-redux'
import { Card, Button, CardContent, CardActions } from '@mui/material'
import { cancelAttraction } from '../store/reducers/attractions'
import { SelectableAttraction } from '../types'

const AttractionCard = (props: { attraction: SelectableAttraction, visibility: boolean, index: number }): React.ReactElement => {
  const dispatch = useDispatch()

  return (
    <Card
      sx={{
        display: props.visibility ? 'flex' : 'none',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      }}
    >
      <CardContent>
        <p>{props.attraction.name}</p>
        <p>({props.attraction.location.latitude}, {props.attraction.location.longitude})</p>
        <p>rating: {props.attraction.rating}</p>
        <p>URL: {props.attraction.pictureURL}</p>
      </CardContent>
      {
        props.attraction.isSelected &&
        <CardActions>
          <Button
            variant="contained"
            onClick={() => dispatch(cancelAttraction(props.index))}
          >
            取消
          </Button>
        </CardActions>
      }
    </Card>
  )
}

AttractionCard.defaultProps = {
  visibility: true
}

export default AttractionCard

import React, { Dispatch, useState } from 'react'
import { Card, CardHeader, CardContent, Typography, Button, Box, Checkbox, FormControlLabel, IconButton, Rating, CardActions } from '@mui/material'
import { Settings, Close, CircleOutlined, Circle } from '@mui/icons-material'
import { Transportation, Setting } from '../types'
import { useDispatch } from 'react-redux'
import { setSetting } from '../store/reducers/attractions'

interface SingleCheckBoxProps {
  title: string
  options: React.ReactNode[]
  checkedIndex: number
  setCheckedIndex: (index: number) => void
}

const SingleCheckBox = ({ title, options, checkedIndex, setCheckedIndex }: SingleCheckBoxProps): React.ReactElement => {
  const check = (index: number): void => {
    if (index !== checkedIndex) {
      setCheckedIndex(index)
    }
  }

  return (
    <Box>
      <Typography variant="subtitle2" color='gray' >{title}</Typography>
      {options.map((option, i) => (
        <FormControlLabel
          checked={i === checkedIndex}
          control={<Checkbox onClick={() => check(i)} icon={<CircleOutlined />} checkedIcon={<Circle sx={{ color: 'primary.dark' }} />} />}
          label={option}
          key={i}
        />
      ))}
    </Box>
  )
}

interface StarLabelProps {
  name: string
}

const StarLabel = ({ name }: StarLabelProps): React.ReactElement => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Typography>{name}</Typography>
    <Rating defaultValue={1} max={1} size='small' readOnly />
  </Box>
)

interface SettingBoxProps {
  checkedIndices: number[]
  setCheckedIndices: Dispatch<number[]>
  closeSettingBox: VoidFunction
}

const transportation: Transportation[] = ['driving', 'bicycling', 'transit', 'walking']
const minRating: number[] = [4.7, 4.5, 4.0, 3.5, 3.0, 0]
const minComments: number[] = [10000, 5000, 2500, 1500, 500, 0]

const SettingBox = ({ checkedIndices, setCheckedIndices, closeSettingBox }: SettingBoxProps): React.ReactElement => {
  const [disabledButton, setDisabledButton] = useState<boolean>(true)
  const dispatch = useDispatch()

  const RecommendationOptions: SingleCheckBoxProps[] = [
    {
      title: '分數',
      options: [...['4.7+', '4.5+', '4.0+', '3.5+', '3.0+'].map((name, i) => <StarLabel name={name} key={i} />), '不限'],
      checkedIndex: checkedIndices[0],
      setCheckedIndex: (index: number): void => {
        const newCheckedIndices = [...checkedIndices]
        newCheckedIndices[0] = index
        setCheckedIndices(newCheckedIndices)
        setDisabledButton(false)
      }
    },
    {
      title: '評論數',
      options: ['10,000+', '5,000+', '2,500+', '1,500+', '500+', '不限'],
      checkedIndex: checkedIndices[1],
      setCheckedIndex: (index: number): void => {
        const newCheckedIndices = [...checkedIndices]
        newCheckedIndices[1] = index
        setCheckedIndices(newCheckedIndices)
        setDisabledButton(false)
      }
    }
  ]

  const ScheduleOptions: SingleCheckBoxProps[] = [
    {
      title: '出發日',
      options: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
      checkedIndex: checkedIndices[2],
      setCheckedIndex: (index: number): void => {
        const newCheckedIndices = [...checkedIndices]
        newCheckedIndices[2] = index
        setCheckedIndices(newCheckedIndices)
        setDisabledButton(false)
      }
    },
    {
      title: '交通方式',
      options: ['汽車', '機車', '大眾運輸', '步行'],
      checkedIndex: checkedIndices[3],
      setCheckedIndex: (index: number): void => {
        const newCheckedIndices = [...checkedIndices]
        newCheckedIndices[3] = index
        setCheckedIndices(newCheckedIndices)
        setDisabledButton(false)
      }
    }
  ]

  const saveSettings = (): void => {
    const setting: Setting = {
      transportation: transportation[checkedIndices[3]],
      departureDay: checkedIndices[2],
      minRating: minRating[checkedIndices[0]],
      minComments: minComments[checkedIndices[1]]
    }
    dispatch(setSetting({
      setting,
      checkedIndices
    }))
    setDisabledButton(true)
  }

  return (
    <Card>
      <CardHeader
        avatar={<Settings color="action" />}
        title="選項"
        action={<IconButton onClick={() => closeSettingBox()}><Close /></IconButton>}
        titleTypographyProps={{
          color: 'gray',
          variant: 'h5'
        }}
      />
      <CardContent>
        <Typography variant="h6" color='gray' >景點篩選條件</Typography>
        {RecommendationOptions.map((item, i) => (
          <SingleCheckBox
            title={item.title}
            options={item.options}
            checkedIndex={item.checkedIndex}
            setCheckedIndex={item.setCheckedIndex}
            key={i}
          />
        ))}
        <Typography variant="h6" color='gray' >行程設定</Typography>
        {ScheduleOptions.map((item, i) => (
          <SingleCheckBox
            title={item.title}
            options={item.options}
            checkedIndex={item.checkedIndex}
            setCheckedIndex={item.setCheckedIndex}
            key={i}
          />
        ))}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'primary.dark',
            color: 'white'
          }}
          onClick={saveSettings}
          disabled={disabledButton}
        >
          保存
        </Button>
      </CardActions>
    </Card>
  )
}

export default SettingBox

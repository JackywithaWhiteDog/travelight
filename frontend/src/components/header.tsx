import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  Popover
} from '@mui/material'
import { Settings } from '@mui/icons-material'
import SettingBox from './settingBox'
import logo from '../assets/logo.svg'
import { useSelector } from 'react-redux'
import { StoreState } from '../store'
import { Link } from 'react-router-dom'

interface HeaderProps {
  showSettings: boolean
}

const Header = (props: HeaderProps): React.ReactElement => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [checkedIndices, setCheckedIndices] = useState<number[]>([5, 5, (new Date()).getDay(), 2])
  const prevCheckedIndices = useSelector((state: StoreState) => state.attractions.checkedSettingIndices)

  const openSettingBox = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const closeSettingBox = (): void => {
    setAnchorEl(null)
    // Reset settings if closing setting box without saving changes
    setCheckedIndices([...prevCheckedIndices])
  }

  const open = Boolean(anchorEl)

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'primary.dark'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link to='/'>
          <img src={logo} height={40} />
        </Link>
        {props.showSettings && (
          <>
            <Button
              variant="outlined"
              startIcon={<Settings />}
              onClick={openSettingBox}
              sx={{
                color: 'primary.light',
                borderColor: 'primary.light'
              }}
            >
              選項
            </Button>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={closeSettingBox}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <SettingBox
                checkedIndices={checkedIndices}
                setCheckedIndices={setCheckedIndices}
                closeSettingBox={closeSettingBox}
              />
            </Popover>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header

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

const Header = (): React.ReactElement => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const openSettingBox = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const closeSettingBox = (): void => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <img src={logo} height={40} />
        <Button
          color='warning'
          variant="outlined"
          startIcon={<Settings />}
          onClick={openSettingBox}
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
          <SettingBox />
        </Popover>
      </Toolbar>
    </AppBar>
  )
}

export default Header

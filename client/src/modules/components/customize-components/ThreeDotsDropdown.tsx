import React, { ReactNode } from 'react';
import { LogoutIcon, ThreeDotsIcon } from '@/icons';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import { MenuProps } from '@mui/material/Menu/Menu';
import { IMenuItem } from '@/types/generalType';

interface IThreeDotsDropdown extends Omit<MenuProps, 'open'> {
  items: Array<IMenuItem>;
  onChooseItem: (key: any) => void;
}

const ThreeDotsDropdown: React.FC<IThreeDotsDropdown> = (props) => {
  const { items, onChooseItem, title, ...res } = props;
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Tooltip title={title || 'Open settings'}>
        <IconButton onClick={handleOpenUserMenu}>
          <ThreeDotsIcon style={{ width: '16px' }} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        {...res}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {items.map((i) => (
          <MenuItem
            key={i.key}
            onClick={() => {
              onChooseItem(i.key);
              handleCloseUserMenu();
            }}
          >
            {i.icon ? (
              <span className={'flex gap-5 items-center'}>
                {i.icon}
                {i.label}
              </span>
            ) : (
              <p>{i.label}</p>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ThreeDotsDropdown;

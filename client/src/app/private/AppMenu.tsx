import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { LogoutIcon, PenOutlinedIcon, SettingOutlinedIcon, VaniCoinIcon } from '@/icons';
import { headerAppHeight, THEME_MODE } from '@/types/enums';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/auth';
import { ChangeEvent, memo, MouseEvent, useCallback, useMemo, useState } from 'react';
import { handleLogout } from '@/services/base.service';
import ThemModeSwitch from '@/modules/components/ThemModeSwich/ThemModeSwitch';
import { Divider } from '@mui/material';
import BaseMenu from '@/modules/components/BaseMenu';
import { useDisplayDataContext } from '@/contexts/displayData';
import { IMenuItem } from '@/types/generalType';
import { ROUTE_PATH } from '../routerProvider';

const menuIconClass = 'w-[20px] h-[24px]';

function AppMenu() {
  const [isOpenNavBar, toggleOpenStatusNavBar] = useState<null | HTMLElement>(null);
  const [isOpenUserNavBar, toggleOpenStatusUserNavBar] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    toggleOpenStatusNavBar(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    toggleOpenStatusUserNavBar(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    toggleOpenStatusNavBar(null);
  };

  const handleCloseUserMenu = () => {
    toggleOpenStatusUserNavBar(null);
  };

  // ------------------------

  const navigate = useNavigate();
  const { setAuth, canShowManagementPage, user } = useAuthContext();
  const { confirm } = useDisplayDataContext();
  const { isDarkTheme, setDisplayData } = useDisplayDataContext();

  const accountSettingMenuOptions = useMemo(() => {
    return [
      {
        key: ROUTE_PATH.PROFILE,
        label: (
          <span className={'flex gap-5 items-center'}>
            <PenOutlinedIcon className={menuIconClass} />
            Edit profile
          </span>
        ),
      },
      {
        key: 'sign-out',
        label: (
          <span className={'flex gap-5 items-center'}>
            <LogoutIcon className={menuIconClass} />
            Sign out
          </span>
        ),
      },
    ];
  }, [canShowManagementPage]);

  const handleChooseAction = useCallback(
    (key: string) => {
      if (key === 'Sign-out') {
        confirm({
          content: 'Sign out',
          onOk() {
            if (setAuth) {
              setAuth({ accessToken: undefined, refreshToken: undefined });
            }
            handleLogout();
          },
        });
        handleCloseUserMenu();
        return;
      }
      handleCloseUserMenu();
      navigate(key);
    },
    [navigate, confirm, setAuth],
  );

  const handleToggleThemeMode = useCallback(
    (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const theme = checked ? THEME_MODE.LIGHT : THEME_MODE.DARK;
      if (theme === THEME_MODE.DARK) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      setDisplayData({ theme });
    },
    [setDisplayData],
  );

  const renderPages = useMemo<IMenuItem[]>(
    () => [
      { label: 'Quiz', key: ROUTE_PATH.HOME },
      { label: 'My profile', key: ROUTE_PATH.PROFILE },
    ],
    [],
  );

  return (
    <AppBar style={{ zIndex: 10, position: 'fixed', top: 0, boxShadow: 'none' }}>
      <div className={'px-7'}>
        <Toolbar disableGutters sx={{ height: headerAppHeight }}>
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: 'none', md: 'flex' },
              height: '100%',
              marginRight: '1rem',
            }}
          >
            <Tooltip title={'Home'}>
              <Link to={ROUTE_PATH.HOME} className={'w-fit h-full'}>
                <img
                  className={'w-auto h-full cursor-pointer'}
                  alt={'logo'}
                  src={'/image/logo.png'}
                />
              </Link>
            </Tooltip>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              sx={{ px: '1rem', borderRadius: 4 }}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <img
                style={{ maxHeight: headerAppHeight }}
                className={'left-5 w-auto h-full aspect-square cursor-pointer h-full'}
                alt={'logo'}
                src={'/image/logo/logo.png'}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={isOpenNavBar}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(isOpenNavBar)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem
                  key={page.key}
                  onClick={() => {
                    navigate(page.key);
                    handleCloseNavMenu();
                  }}
                >
                  <p className={'text-center font-bold'}>{page.label}</p>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <BaseMenu items={renderPages} />
          </Box>
          <Box>
            <p className={'font-bold uppercase flex gap-2 items-center dark:text-white text-info'}>
              <span>
                <VaniCoinIcon className={'w-[30px] h-[30px]'} />
              </span>
              {user?.info?.coin}$
            </p>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Change them mode">
              <ThemModeSwitch
                sx={{ m: 1 }}
                checked={!isDarkTheme}
                onChange={handleToggleThemeMode}
              />
            </Tooltip>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <SettingOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={isOpenUserNavBar}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(isOpenUserNavBar)}
              onClose={handleCloseUserMenu}
            >
              {accountSettingMenuOptions.map((setting) => (
                <MenuItem
                  key={setting.key}
                  onClick={() => {
                    handleChooseAction(setting.key);
                  }}
                >
                  <p className={'text-center'}>{setting.label}</p>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </div>
      <Divider />
    </AppBar>
  );
}
export default memo(AppMenu);

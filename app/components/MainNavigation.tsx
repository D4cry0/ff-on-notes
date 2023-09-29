import React from 'react';
import { NavLink, useLocation } from '@remix-run/react';

import pkg from '@material-tailwind/react';
const { Menu, MenuHandler, Button, Avatar, MenuList, MenuItem, Typography, Navbar, IconButton, Collapse } = pkg;

// profile menu component
const profileMenuItems = [
  {
    label: 'Home',
    icon: 'fa-solid fa-house',
    url: '/',
  },
  {
    label: 'My Notes',
    icon: 'fa-solid fa-gear',
    url: '/notes',
  },
  {
    label: 'My Profile',
    icon: 'fa-solid fa-user',
    url: '/',
  },
  {
    label: 'Sign Out',
    icon: 'fa-solid fa-power-off',
    url: '/',
  },
];
 
function ProfileMenu() {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement='bottom-end'>
      <MenuHandler>
        <Button
          variant='text'
          color='blue-gray'
          className='flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto'
        >
          <Avatar
            variant='circular'
            size='lg'
            alt='FF On Notes'
            className=' '
            src='/ff-on-notes-square.png'
          />
          <i
            className={`fa-solid fa-chevron-down h-3 w-3 transition-transform ${
              isMenuOpen ? 'rotate-180' : ''
            }`}
          ></i>
        </Button>
      </MenuHandler>
      <MenuList className='p-1'>
        {profileMenuItems.map(({ label, icon, url }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <NavLink to={url} key={label}>
              <MenuItem
                
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                    : ''
                }`}
              >
              
                <i className={`${icon} ${isLastItem ? 'text-red-500' : ''}`}></i>
                
                <Typography
                  as='span'
                  variant='small'
                  className='font-normal'
                  color={isLastItem ? 'red' : 'inherit'}
                >
                  {label}
                </Typography>
              </MenuItem>
            </NavLink>
          );
        })}
      </MenuList>
    </Menu>
  );
}
 
// nav list component
const navListItems = [
  {
    label: "Notes",
    icon: 'fa-solid fa-note-sticky',
    url: '/notes',
  },
  // {
  //   label: "Blocks",
  //   icon: 'fa-solid fa-cube',
  // },
  // {
  //   label: "Docs",
  //   icon: 'fa-solid fa-cube',
  // },
];
 
function NavList() {

  // TODO: Need to show notes count

  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, url }, key) => (
        <NavLink to={url} key={label}>
          <Typography
            key={label}
            as="a"
            href="#"
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            <MenuItem className="flex flex-row items-center gap-2 lg:rounded-full">
              <i className={`${icon}`}></i>
              <span>{label}</span>
            </MenuItem>
          </Typography>
        </NavLink>
      ))}
    </ul>
  );
}

const MainNavigation = () => {

  const [isNavOpen, setIsNavOpen] = React.useState(false);
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);

  return (
    // <nav id='main-navigation'>
    //   <ul>
    //     <li className='nav-item'>
    //       <NavLink to='/'>Home</NavLink>
    //     </li>
    //     <li className='nav-item'>
    //       <NavLink to='/notes'>My Notes</NavLink>
    //     </li>
    //   </ul>
    // </nav>

    <Navbar className="mx-auto max-w-screen-xl p-2 rounded-none lg:pl-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <div>
          <ProfileMenu />
        </div>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <i className="fa-solid fa-bars"></i>
        </IconButton>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
    
  );
}

export default MainNavigation;
/*
 * @Author: Fangyu Kung
 * @Date: 2024-03-16 01:05:55
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-29 12:03:02
 * @FilePath: /csc8019_team_project_frontend/src/common/aside/AsideItems.jsx
 */
import * as React from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DvrIcon from '@mui/icons-material/Dvr';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LayersIcon from '@mui/icons-material/Layers';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

const menuItems = [
  {
    menuId: 'modules',
    primary: 'Modules',
    icon: <ViewModuleIcon />,
    link: '/modules',
  },
  {
    menuId: 'timetable',
    primary: 'Time Table',
    icon: <CalendarMonthIcon />,
    link: '/timetable',
  },
  {
    menuId: 'studentlist',
    primary: 'Student List',
    icon: <ListAltIcon />,
    link: '/studentlist',
  },
  {
    menuId: 'bookingandabsence',
    primary: 'Booking & Absence',
    icon: <PeopleIcon />,
    link: '/bookingandabsence',
  },
  {
    menuId: 'extensions',
    primary: 'Extensions',
    icon: <SendTimeExtensionIcon />,
    link: '/extensions',
  },
  {
    menuId: 'courseoperations',
    primary: 'CourseInfo & Operations',
    icon: <LayersIcon />,
    link: '/courseoperations',
  },
  {
    menuId: 'academichistory',
    primary: 'Academic History',
    icon: <DvrIcon />,
    link: '/academichistory',
  },
  {
    menuId: 'users',
    primary: 'User',
    icon: <AccountCircleIcon />,
    link: '/user',
  },
  {
    menuId: 'logout',
    primary: 'Log out',
    icon: <ExitToAppIcon />,
    link: '/',
  },
];

const MenuItems = () => {
  return (
    <>
      {menuItems.map((items) => {
        return (
          <MenuList key={items.menuId}>
            <MenuItem href={items.link} component="a">
              <ListItemIcon>{items.icon}</ListItemIcon>
              <ListItemText>{items.primary}</ListItemText>
            </MenuItem>
          </MenuList>
        );
      })}
    </>
  );
};

export default MenuItems;

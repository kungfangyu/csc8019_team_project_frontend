/*
 * @Author: Fangyu Kung
 * @Date: 2024-03-15 14:01:15
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-01 23:18:32
 * @FilePath: /csc8019_team_project_frontend/src/page/students/modules/ModuleList.jsx
 */
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider } from '@mui/material/styles';
import { getStudentModules } from '../../../api/modules';
import Copyright from '../../../common/Copyright';
import Aside from '../../../common/aside/Aside';
import AsideItems from '../../../common/aside/AsideItems';
import Nav from '../../../common/aside/Nav';
import ModuleCard from '../../../components/modules/ModuleCard';
import { SIGNIN_URL } from '../../../data/data';
import { parseJwt } from '../../../helpers/jwt';
import theme from '../../../style/theme';

const ModuleList = () => {
  const [moduleData, setModuleData] = useState([]);
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const fetchStudentModules = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const parseToken = parseJwt(token);
        const response = await getStudentModules(parseToken.userID);
        const results = response;
        setModuleData(results);
      } else {
        window.location.href = SIGNIN_URL;
      }
    } catch (error) {
      console.error('Error fetching student modules:', error);
    }
  }, []);

  useEffect(() => {
    fetchStudentModules();
  }, [fetchStudentModules]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Nav open={open} toggleDrawer={toggleDrawer} title={'Module List'} />
        <Aside variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <AsideItems />
        </Aside>
        <Box
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container
            sx={{
              mt: 4,
              mb: 4,
            }}
          >
            <ModuleCard moduleData={moduleData} />
          </Container>

          <Copyright sx={{ pt: 4, pb: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ModuleList;

/*
 * @Author: Fangyu Kung
 * @Date: 2024-05-01 13:45:32
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-06 02:20:53
 * @FilePath: /csc8019_team_project_frontend/src/components/StudentListTable.jsx
 */
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';

import { Button } from '@mui/material';
import { getStatusColor } from '../helpers/helperFunction';
import { StyledTableCell, StyledTableRow } from '../style/tableStyle';
import PopupEditTutor from './PopupEditTutor';

const StudentListTable = ({ studentList }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const handlePopupTutor = () => {
    setPopupOpen(true);
  };

  const handlePopupTutorClose = () => {
    setPopupOpen(false);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Student ID</StyledTableCell>
              <StyledTableCell align="left">Student Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Grade</StyledTableCell>
              <StyledTableCell align="left">Tutor</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              {/* <StyledTableCell align="right">Details</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((row) => (
              <StyledTableRow key={row.studentId}>
                <StyledTableCell component="th" scope="row">
                  {row.studentId}
                </StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left">{row.email}</StyledTableCell>
                <StyledTableCell align="left">{row.grade}</StyledTableCell>
                <StyledTableCell align="left">
                  <Button onClick={handlePopupTutor}>{row.tutor}</Button>
                </StyledTableCell>

                <StyledTableCell align="left">
                  <Chip
                    label={row.status}
                    color={getStatusColor(row.status)}
                    // onClick={() => handlePopupEdit(row.id, row.status)}
                  />
                </StyledTableCell>
                {/* <StyledTableCell align="right">
                  <Link
                    href={`modules/${row.studentId}/details`}
                    underline="none"
                  >
                    <RemoveRedEyeIcon />
                  </Link>
                </StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PopupEditTutor
        open={popupOpen}
        handlePopupEditClose={() => setPopupOpen(false)}
      />
    </>
  );
};

export default StudentListTable;

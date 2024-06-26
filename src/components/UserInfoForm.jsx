import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { PhotoCamera } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import { MenuItem, Select } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';

import {
  getUserEmergencyData,
  getUserPrimaryData,
  updateUserPrimaryData,
} from '../api/user';
import { SIGNIN_URL } from '../data/data';
import { parseJwt } from '../helpers/jwt';
import { FormGrid } from '../style/formStyle';

const titleSelect = ['Miss', 'Mrs', 'Mr', 'Dr.', 'Prof'];

const UserInfoForm = () => {
  //Contact Information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [dysonEmail, setDysonEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [userId, setUserId] = useState('');

  //Emergency Contact
  const [eTitle, setETitle] = useState([]);
  const [emergencyContact, setEmergencyContact] = useState([]);

  const fetchPrimaryData = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const parseToken = parseJwt(token);
        const response = await getUserPrimaryData(parseToken.userID);
        setUserId(parseToken.userID);
        const {
          firstName,
          lastName,
          personalEmail,
          dysonEmail,
          phone,
          middleNames,
          postcode,
          address,
        } = response;
        setFirstName(firstName);
        setLastName(lastName);
        setDysonEmail(dysonEmail);
        setPersonalEmail(personalEmail);
        setPhone(phone);
        setMiddleName(middleNames);
        setAddress(address);
        setPostcode(postcode);
      } else {
        window.location.href = SIGNIN_URL;
      }
    } catch (error) {
      console.error('Error fetchPrimaryData:', error);
    }
  }, []);

  const fetchEmergencyData = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const parseToken = parseJwt(token);
        const response = await getUserEmergencyData(parseToken.userID);
        setEmergencyContact(response);
      } else {
        window.location.href = SIGNIN_URL;
      }
    } catch (error) {
      console.error('Error fetchPrimaryData:', error);
    }
  }, []);

  const updatePrimaryInfo = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('accessToken');
        const parseToken = parseJwt(token);
        const primaryData = {
          firstName: firstName,
          lastName: lastName,
          personalEmail: personalEmail,
          dysonEmail: dysonEmail,
          phone: phone,
          middleNames: middleName,
          postcode: postcode,
          address: address,
        };
        console.log(primaryData);
        await updateUserPrimaryData(parseToken.userID, primaryData);
        fetchPrimaryData();
      } catch (error) {
        console.log('Error updating primary info:', error);
      }
    },
    [
      firstName,
      lastName,
      personalEmail,
      dysonEmail,
      phone,
      middleName,
      postcode,
      address,
      fetchPrimaryData,
    ],
  );

  useEffect(() => {
    fetchPrimaryData();
    fetchEmergencyData();
  }, [fetchPrimaryData, fetchEmergencyData]);

  const handleEmergencyTitleChange = (event) => {
    setETitle(event.target.value);
  };

  return (
    <>
      <Container>
        <h2>Update Information</h2>
      </Container>
      <Container
        sx={{
          mt: 4,
          mb: 4,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <FormGrid item xs={12} md={12} mr={2}>
          <Grid justifyItems="center" display="grid">
            <Avatar
              alt="User Name"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 100, height: 100, mb: 2 }}
            />
          </Grid>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            // onChange={(e) => handleFileUpload(e.target.files)}
          />

          <Button
            role={undefined}
            variant="contained"
            tabIndex={-1}
            onClick={() => document.getElementById('fileInput').click()}
            endIcon={<PhotoCamera />}
          >
            Update
          </Button>
        </FormGrid>

        <Grid container spacing={1}>
          <FormGrid item xs={12} md={4}>
            <FormLabel htmlFor="first-name" required>
              First name
            </FormLabel>
            <OutlinedInput
              id="first-name"
              name="first-name"
              value={firstName}
              type="text"
              placeholder="John"
              autoComplete="first name"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGrid>
          <FormGrid item xs={12} md={4}>
            <FormLabel htmlFor="middle-name">Middle name (optional)</FormLabel>
            <OutlinedInput
              id="middle-name"
              name="middle-name"
              type="text"
              value={middleName}
              placeholder=""
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </FormGrid>
          <FormGrid item xs={12} md={4}>
            <FormLabel htmlFor="last-name" required>
              Last name
            </FormLabel>
            <OutlinedInput
              id="last-name"
              value={lastName}
              name="last-name"
              type="text"
              placeholder="Snow"
              autoComplete="last name"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormGrid>

          <FormGrid item xs={12} md={4}>
            <FormLabel htmlFor="email">Dyson Email</FormLabel>
            <OutlinedInput
              id="dyson-email"
              name="dyson-email"
              type="email"
              value={dysonEmail}
              required
              disabled
            />
          </FormGrid>
          <FormGrid item xs={12} md={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <OutlinedInput
              id="email"
              name="email"
              type="email"
              value={personalEmail}
              onChange={(e) => setPersonalEmail(e.target.value)}
              required
            />
          </FormGrid>
          <FormGrid item xs={12} md={4}>
            <FormLabel htmlFor="phone" required>
              Phone
            </FormLabel>
            <OutlinedInput
              id="phone"
              name="phone"
              type="text"
              value={phone}
              placeholder="+44 07123456789"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </FormGrid>

          <FormGrid item xs={7}>
            <FormLabel htmlFor="address" required>
              Address
            </FormLabel>
            <OutlinedInput
              id="address"
              name="address"
              value={address}
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </FormGrid>
          <FormGrid item xs={5}>
            <FormLabel htmlFor="zip" required>
              Zip / Postal code
            </FormLabel>
            <OutlinedInput
              id="zip"
              name="zip"
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              required
            />
          </FormGrid>
        </Grid>
      </Container>
      <Box sx={{ textAlign: 'center' }}>
        <Button
          // onClick={updatePrimaryInfo}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={(e) => updatePrimaryInfo(e)}
          size="large"
        >
          Update
        </Button>
      </Box>

      {/*  Emergency Contact Start-------------------------------------*/}
      <Container>
        <h2>Emergency Contact</h2>
      </Container>
      <Container
        sx={{
          mt: 4,
          mb: 4,
        }}
      >
        {emergencyContact.map((contact, index) => {
          return (
            <Box key={index}>
              <h4>Contact {index + 1}</h4>
              <Grid container spacing={1} mt={2}>
                <FormGrid item xs={12} md={4}>
                  <FormLabel htmlFor="e-first-name" required>
                    First name
                  </FormLabel>
                  <OutlinedInput
                    id="e-first-name"
                    name="e-first-name"
                    type="name"
                    placeholder=""
                    value={contact.firstName}
                    required
                  />
                </FormGrid>
                <FormGrid item xs={12} md={4}>
                  <FormLabel htmlFor="e-last-name">Last name</FormLabel>
                  <OutlinedInput
                    id="e-last-name"
                    name="e-last-name"
                    type="e-last-name"
                    value={contact.lastName}
                    placeholder=""
                    required
                  />
                </FormGrid>
                <FormGrid item xs={12} md={4}>
                  <FormLabel htmlFor="e-title">Title</FormLabel>
                  <Select
                    displayEmpty
                    value={contact.title}
                    onChange={handleEmergencyTitleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (!selected) {
                        return <em>Title</em>;
                      }
                      return contact.title;
                    }}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem disabled value="">
                      <em>Title</em>
                    </MenuItem>
                    {titleSelect.map((title) => (
                      <MenuItem key={title} value={eTitle}>
                        {title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormGrid>
                <FormGrid item xs={12} md={4}>
                  <FormLabel htmlFor="relation">Relation</FormLabel>
                  <OutlinedInput
                    id="relation"
                    value={contact.relation}
                    name="relation"
                    type=""
                    required
                  />
                </FormGrid>
                <FormGrid item xs={12} md={4}>
                  <FormLabel htmlFor="e-email" required>
                    Email
                  </FormLabel>
                  <OutlinedInput
                    id="e-email"
                    name="e-email"
                    type="email"
                    value={contact.email}
                    placeholder="personal@email.com"
                    required
                  />
                </FormGrid>
                <FormGrid item xs={12} md={4}>
                  <FormLabel htmlFor="e-phone" required>
                    Phone
                  </FormLabel>
                  <OutlinedInput
                    id="e-phone"
                    name="e-phone"
                    type="phone"
                    value={contact.phone}
                    placeholder="+44 07123456789"
                    autoComplete="+44 07123456789"
                    required
                  />
                </FormGrid>

                <FormGrid item xs={8}>
                  <FormLabel htmlFor="e-address" required>
                    Address
                  </FormLabel>
                  <OutlinedInput
                    id="e-address"
                    name="e-address"
                    type="e-address"
                    value={contact.address}
                    placeholder=""
                    required
                  />
                </FormGrid>
                <FormGrid item xs={4}>
                  <FormLabel htmlFor="e-zip" required>
                    Zip / Postal code
                  </FormLabel>
                  <OutlinedInput
                    id="e-zip"
                    name="e-zip"
                    type="e-zip"
                    value={contact.postcode}
                    placeholder=""
                    required
                  />
                </FormGrid>
              </Grid>
            </Box>
          );
        })}
      </Container>
      <Box sx={{ textAlign: 'center' }}>
        <Button variant="contained" endIcon={<SendIcon />} size="large">
          Update
        </Button>
      </Box>
      {/*  Emergency Contact End-------------------------------------*/}
    </>
  );
};

export default UserInfoForm;

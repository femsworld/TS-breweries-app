import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import SearchAppBar from './SearchAppBar';
import { useFetch } from './hooks/useFetch';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress, Alert } from '@mui/material';
import { error } from 'console';
import { Box, List, ListItem, Typography } from '@mui/material';



export interface BreweryPage {
  id: string
  name: string
  brewery_type: string
  address_1: string
  address_2: null
  address_3: null
  city: string
  state_province: string
  postal_code: string
  country: string
  longitude: string
  latitude: string
  phone: string
  website_url: string
  state: string
  street: string
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Details = () => {
  const { id } = useParams();
  const [detailsPage, setDetailsPage] = useState<BreweryPage | null>(null)

  const url = "https://api.openbrewerydb.org/v1/breweries/" + id;

  // const { breweries, loading, error } = useFetch({ url });
  // console.log("This is breweries", breweries)

  useEffect(() => {
    fetch(url).then(result => {
      if(!result.ok) {
        return Error("Oh no")
      }
      return result.json()
    })
    .then(data => setDetailsPage(data))
  }, [url])

  return (
    <>
      <SearchAppBar />
      <h1 className='detailsPage'>Detail Page</h1>
      <div>
        <ul>
        <li>ID: {detailsPage?.id}</li>
        <li>Name: {detailsPage?.name}</li>
        <li>Brewery Type: {detailsPage?.brewery_type}</li>
        <li>Address 1: {detailsPage?.address_1}</li>
        <li>Address 2: {detailsPage?.address_2}</li>
        <li>Address 3: {detailsPage?.address_3}</li>
        <li>City: {detailsPage?.city}</li>
        <li>State Province: {detailsPage?.state_province}</li>
        <li>Postal Code: {detailsPage?.postal_code}</li>
        <li>Country: {detailsPage?.country}</li>
        <li>Longitude: {detailsPage?.longitude}</li>
        <li>Latitude: {detailsPage?.latitude}</li>
        <li>Phone: {detailsPage?.phone}</li>
        <li>Website: {detailsPage?.website_url}</li>
        <li>State: {detailsPage?.state}</li>
        <li>Street: {detailsPage?.street}</li>
        </ul>
      </div>
    </>
  );
};

export default Details;

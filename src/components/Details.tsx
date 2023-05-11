import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import SearchAppBar from './SearchAppBar';

import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

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
      <div>
      <h1 className='detailsPage'>Detail Page</h1>
      <span> <Link to={`/`}> <button>Return Home</button> </Link> </span>
      </div>
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

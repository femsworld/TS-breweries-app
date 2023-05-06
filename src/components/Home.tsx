import React, { useEffect, useState } from 'react'
import SearchAppBar from './SearchAppBar'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export interface Brewery {
    id: string
    name: string
    brewery_type: string
    city: string
    country: string
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

const Home = () => {
    const [breweries, setBreweries] = useState<Brewery[]>([])
    const [search, setSearch] = useState("")
    // console.log("Component is rendered")
    useEffect(() => {
        fetch("https://api.openbrewerydb.org/v1/breweries/").then(
            data => data.json()
        ).then( 
            (data: Brewery[]) => {
                // setBreweries(data.filter(c => c.name.common.includes(search)))
                setBreweries(data.filter(c => c.name.includes(search)))
            })
        return () => {
           // clearTimeout()
        }
    }, [search])
    /* useEffect --> setCountries --> rerendered */

    /** this function will wait for a while till be affected --> debounce */
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    return (
        <div>
            <SearchAppBar/>
            {/* <input type="text"
                placeholder='Search for brewery'
                value={search}
                onChange={(e) => handleSearch(e)}
            />
            {breweries.map(item => (
                <div>
                <div key={item.id}>{item.id}</div>
                <div key={item.name}>{item.name}</div>
                <div key={item.brewery_type}>{item.brewery_type}</div>
                <div key={item.city}>{item.city}</div>
                <div key={item.country}>{item.country}</div>
                </div>
            ))} */}
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">ID</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Brewery Type</StyledTableCell>
            <StyledTableCell align="right">City</StyledTableCell>
            <StyledTableCell align="right">Country</StyledTableCell>
            <StyledTableCell align="right">Details</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {breweries.map(item => (
            <StyledTableRow key={item.name}>
              <StyledTableCell component="th" scope="row">
                {item.name}
              </StyledTableCell>
              <StyledTableCell align="right" key={item.id}>{item.id}</StyledTableCell>
              <StyledTableCell align="right"key={item.name}>{item.name}</StyledTableCell>
              <StyledTableCell align="right"key={item.brewery_type}>{item.brewery_type}</StyledTableCell>
              <StyledTableCell align="right"key={item.city}>{item.city}</StyledTableCell>
              <StyledTableCell align="right"key={item.country}>{item.country}</StyledTableCell>
              <StyledTableCell align="right">
                <button>Detail</button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}

export default Home

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
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';

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
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const Home = () => {
    const [searchString, setSearchString] = useState("")
    const [currentRecords, setCurrentRecords] = useState<Brewery[]>([]);
    const [breweries, setBreweries] = useState<Brewery[]>([])
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
   handleFetch(value)
  };

  const getSearchResult = (search: string) => {
      setSearchString(search)
  };
  
       const handleFetch = (page: number) => {
      console.log("before fetch", page);
      axios
        .get(`https://api.openbrewerydb.org/v1/breweries?page=${page}&per_page=${perPage}`)
        .then((response) => {
          setBreweries(response.data);
          setCurrentRecords(response.data);
          setPage(page); // Update the page state here
          setLoading(false)
          console.log("after fetch", page);
        })
        .catch((error) => {
          setLoading(false)
          setError(error.message)
        });
    };

    useEffect(() => { 
        if(searchString.length > 0) {
        setCurrentRecords(breweries.filter((c) => c.city.toLowerCase().includes(searchString.toLowerCase())));
      } else {
        handleFetch(page)
      }
    }, [searchString]);

    return (
      <>
        <div>
          <div>
            <SearchAppBar getSearchResult={getSearchResult}/>
          </div>
          <TableContainer className='TableContainer' component={Paper}>
      <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Brewery Type</StyledTableCell>
            <StyledTableCell align="center">City</StyledTableCell>
            <StyledTableCell align="center">Country</StyledTableCell>
            <StyledTableCell align="center">Details</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {!loading && error && <p>{error}</p>}
            {loading && <p>Loading ...</p>}
            {!loading && !error && currentRecords.map((item, index) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="center" key={item.id}>{item.id}</StyledTableCell>
              <StyledTableCell align="center"key={item.name}>{item.name}</StyledTableCell>
              <StyledTableCell align="center"key={item.brewery_type}>{item.brewery_type}</StyledTableCell>
              <StyledTableCell align="center"key={item.city}>{item.city}</StyledTableCell>
              <StyledTableCell align="center"key={item.country}>{item.country}</StyledTableCell>
              <StyledTableCell align="center"> <Link to={`/details/${item.id}`}>
                <button>Detail</button>
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Typography>Page: {page} </Typography>
      <Pagination 
        count={10} 
        page={page}
        onChange={handleChange}
      />
        </div>
        </>
    )
}

export default Home

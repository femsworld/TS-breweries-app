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
    const [searchResult, setSearchResult] = useState("")
    // const [currentRecords, setCurrentRecords] = useState<any[]>(['']);
    const [breweries, setBreweries] = useState<Brewery[]>([])
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
   
  // const handleChange = (event: React.ChangeEvent<unknown> | null, newPage: number) => {
  //   setPage(newPage);
  // }; 

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    handleFetch(value)
  };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   setPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const getSearchResult = (search: string) => {
    setPage(1)
    setSearchResult(search)
    }
    const handleFetch = (page: number) => {
      console.log("I am on this", page)
      axios.get(`https://api.openbrewerydb.org/v1/breweries?page=${page}&per_page=${perPage}`)
      .then((response) => setBreweries(response.data))
    }
    
    useEffect(() => { 
      handleFetch(page)
        // axios.get(`https://api.openbrewerydb.org/v1/breweries?page=${page}&per_page=${perPage}`)
        // .then((response) => setBreweries(response.data))

        // console.log("I am on this", page)
      
      // fetch(`https://api.openbrewerydb.org/v1/breweries?page=${page}&per_page=${perPage}`).then(
      //       res => res.json()
      //   ).then( 
      //       (data: Brewery[]) => {
      //           // setBreweries(data.filter(c => c.name.includes(searchResult)))
      //           setBreweries(data)
      //           // console.log("Fetched data", data)
      //       })
        // return () => {
        // }
    }, []);
    // console.log("Fetched data", breweries)
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
          {breweries.map((item, index) => (
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
          <Stack spacing={2}>
      <Pagination 
        count={10} 
        page={page}
        onChange={handleChange}
      />
    </Stack>
    {/* <TablePagination
      component="div"
      count={100}
      page={page - 1}
      onPageChange={setCurrent}
      rowsPerPage={perPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    /> */}
    {/* <Pagination 
        onClick={handleChange} 
        currentPage={page}
        numOfPages={10}
        maxVisible={10}
      /> */}
        </div>
        </>
    )
}

export default Home

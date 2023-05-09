import React, { useEffect, useState } from 'react'
import SearchAppBar from './SearchAppBar'
import Details from './Details';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

export interface Brewery {
    id: string
    name: string
    brewery_type: string
    city: string
    country: string
}

let newList: any[];
let indexOfLastRecord: number;
let indexOfFirstRecord: number;


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
    const [searchResult, setSearchResult] = useState("")
    const [currentRecords, setCurrentRecords] = useState<any[]>(['']);
    const [breweries, setBreweries] = useState<Brewery[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [nPages, setNPages] = useState<number>(1);
    const [totalVisiblePageNumbers] = useState<number>(5);
    const [recordsPerPage] = useState<number>(5);
    const [sortingOrder, setSortingOrder] = useState<string>('');
    const [sortingIconPosition, setSortingIconPosition] = useState<string>('sort');

    const getSearchResult = (search: string) => {
      setCurrentPage(1)
      setSearchResult(search)
      }

      const setCurrent = (curr: number) => setCurrentPage(curr);

      const sort = (args: string) => {
      setSortingOrder(args)
      setSortingIconPosition(args === 'asc' ? 'caret-down' : 'caret-up')
  }
      
  // useEffect(() => {
  //       fetch("https://api.openbrewerydb.org/v1/breweries/").then(
  //           data => data.json()
  //       ).then( 
  //           (data: Brewery[]) => {
  //               setBreweries(data.filter(c => c.name.includes(searchResult)))
  //           })
  //       return () => {
  //          // clearTimeout()
  //       }
  //   }, [searchResult])

    useEffect(() => {
      newList = [];
      indexOfLastRecord  = currentPage * recordsPerPage;
      indexOfFirstRecord  = indexOfLastRecord - recordsPerPage;
      const getBreweryList = (breweries: any[]) => {
        if(sortingOrder === 'asc') {
          newList = breweries.sort(
            (p1, p2) =>
            (p1.name.toUpperCase() > p2.name.toUpperCase()) ? 1 : (p1.name.toUpperCase() < p2.name.toUpperCase()) ? -1 : 0
          )
          const currentRecords = newList.slice(indexOfFirstRecord, indexOfLastRecord);
          const nPages = breweries && breweries.length && Math.ceil(breweries.length / recordsPerPage);
          setCurrentRecords(Array.isArray(currentRecords) ? currentRecords : [])
          setNPages(nPages)
        } else if (sortingOrder === 'desc') {
          newList = breweries.sort(
            (p1, p2) =>
            (p1.name.common.toUpperCase() < p2.name.common.toUpperCase()) ? 1 : (p1.name.common.toUpperCase() > p2.name.common.toUpperCase()) ? -1 : 0
          )
          const currentRecords = newList.slice(indexOfFirstRecord, indexOfLastRecord);
          const nPages = breweries && breweries.length && Math.ceil(breweries.length / recordsPerPage);
          setCurrentRecords(Array.isArray(currentRecords) ? currentRecords : [])
          setNPages(nPages)
        } else {
          const currentRecords = breweries && breweries.length && breweries.slice(indexOfFirstRecord, indexOfLastRecord);
          const nPages = breweries && breweries.length && Math.ceil(breweries.length / recordsPerPage);
          setCurrentRecords(Array.isArray(currentRecords) ? currentRecords : [])
          setNPages(nPages)
        }
      }
      // const filteredData = (data: any[]) => {
      //   const newArray =  _.filter(data, (item) => item.name.toLowerCase().startsWith(searchResult.toLowerCase()))
      //       return newArray
      //     }
      //     const data = searchResult ? filteredData(breweries) : breweries
      
      fetch("https://api.openbrewerydb.org/v1/breweries/").then(
            data => data.json()
        ).then( 
            (data: Brewery[]) => {
                setBreweries(data.filter(c => c.name.includes(searchResult)))
            })
        return () => {
           // clearTimeout()
        }
        // getBreweryList(data)

    }, [searchResult, breweries, sortingOrder, currentPage, recordsPerPage]);


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
    <Pagination
            onClick={setCurrent}
            currentPage={currentPage}
            numOfPages={nPages}
            maxVisible={totalVisiblePageNumbers}
          />
        </div>
        </>
    )
}

export default Home

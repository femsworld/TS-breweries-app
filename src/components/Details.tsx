import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SearchAppBar from './SearchAppBar';

const Details = () => {
    const {id} = useParams();
    console.log(id)
    const [detailsPage, setDetailsPage] = useState([]);

  const url = "https://api.openbrewerydb.org/v1/breweries/"+id;
  // fetch(url)
  //     .then(res => {
  //       if (!res.ok) {
  //         return Error("Oh no");
  //       }
  //       return res.json();
  //     })
  //     .then(data => setDetailsPage(data));
  useEffect(() => {
    fetch(url)
      .then(res => {
        if (!res.ok) {
          return Error("Oh no");
        }
        return res.json();
      })
      .then(data => setDetailsPage(data));
  }, [url]);

  return (
    <>
    <SearchAppBar/>
    {console.log(detailsPage)}
    <div>
      Details
      </div>
      </>
  )
}

export default Details
import React, { useEffect, useState } from 'react'
import Home from './Home'
import { Brewery } from './Home'

interface SearchData {
    searchItem: (search: string) => void
}

const searchBrewery = (props: SearchData) => {
    // const [breweries, setBreweries] = useState<Brewery[]>([])
    const [search, setSearch] = useState("")
    
    useEffect(() => {
        props.searchItem(search)
    }, [search]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
  return (
    <div>searchBrewery</div>
  )
}

export default searchBrewery


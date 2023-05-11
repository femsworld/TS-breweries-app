import React, { useEffect, useState } from 'react'

interface SearchData {
    searchItem: (search: string) => void
}

const searchBrewery = (props: SearchData) => {
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


import React, { useEffect, useState } from 'react'

interface Brewery {
    id: string
    name: string
    brewery_type: string
    city: string
    country: string
}

const Home = () => {
    const [breweries, setBreweries] = useState<Brewery[]>([])
    const [search, setSearch] = useState("")
    console.log("Component is rendered")
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
            <input type="text"
                placeholder='Search for brewery'
                value={search}
                onChange={(e) => handleSearch(e)}
            />
            
{/*             <button></button> */}
            {breweries.map(item => (
                <p key={item.name}>{item.name}</p>
            ))}
        </div>
    )
}

export default Home

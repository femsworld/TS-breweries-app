// import React, { useEffect, useState } from 'react'

// interface ChildComponentProps {
//     data: any[];
//   }
  

// const loadingPage = (ChildComponent: () => JSX.Element, url: string) => {
//   return () => {
//     const [data, setData] = useState<any[]>([]);
//         useEffect(() => {
//             fetch(url).then(
//                 result => result.json() ).
//                 then(
//                     result => setData(result))
//         },  [])
//         return(
//             <div>
//             <ChildComponent data={data} />
//             </div>
//         ) 
//   }
// }

// export default loadingPage
import React from 'react'

const loadingPage = () => {
  return (
    <div>loadingPage</div>
  )
}

export default loadingPage
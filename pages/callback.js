import { useEffect } from "react"

const Callback = ({code}) => {
  // console.log(code)
  // fetch('/api/hello', {
  //   method: 'POST',
  //   body: JSON.stringify(
  //     {
  //       code
  //     }
  //   ),
  //   headers: { 'Content-Type': 'application/json' }
  // })

  useEffect(()=>{
    console.log(code)
    fetch('/api/token', {
      method: 'POST',
      body: JSON.stringify(
        {
          code
        }
      ),
      headers: { 'Content-Type': 'application/json' }
    })
  },[])
  
  return (
    <h1>Callback page</h1>
  )
}

export const getServerSideProps = ({query}) => {
  
  console.log(query.code)
  
  // fR7uoBxVMFk5bjkHIkRdaI2GNLXnN8v2Fk7I7JNQTa6BI
  return {
    props: {
      code: query.code
    }
  }
}

export default Callback
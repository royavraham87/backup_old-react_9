import React, { useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {
  const My_Server = 'http://127.0.0.1:8000/'
  const [products, setproducts] = useState([])
  const [desc, setdesc] = useState("")
  const [price, setprice] = useState(0)
  const [refresh, setrefresh] = useState(false)

  useEffect(() => {
    //get the information from the server
    axios.get(My_Server+"products").then(res => setproducts(res.data))
  }, [refresh])

  const add_data=()=>{
    axios.post(My_Server+ "addproduct",{desc,price})
    setrefresh(!refresh)
  }

  const del_data=(id)=>{
    console.log(id)
    axios.post(My_Server+ "delproduct/"+id)
    setrefresh(!refresh)
  }

  return (
    <div>
      <h1>number of items {products.length}</h1>
      {products.map(prod => <div>
        Desc:{prod.desc},
        Price:{prod.price}
        <button onClick={()=>del_data(prod.id)}>Del</button>
      </div>)}
      Desc:<input onChange={(e)=>setdesc(e.target.value)}/>
      price:<input onChange={(e)=>setprice(e.target.value)}/>
      
      <br/>
      {/* POST- send data to the server */}
        <button onClick={()=>add_data}>Add</button>
        
    </div>
  )
}

export default App

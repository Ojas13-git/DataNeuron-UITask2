import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Table = () => {
    const [data, setData] = useState([])
    const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    useEffect(()=> {
        axios.get('http://localhost:3000/users')
        .then(res=>setData(res.data))
        .catch(er=>console.log(er));
    },[])

    const handleSubmit
  return (
    <div className='container'>
        <div className='form-div'>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter Name' onChange={e=>setName(e.target.value)}/>
                <input type="text" placeholder='Enter Email' onChange={e=>setEmail(e.target.value)}/>
                <button>Add</button>
            </form>
        </div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((user,index)=> (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button>edit</button>
                                <button>delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table

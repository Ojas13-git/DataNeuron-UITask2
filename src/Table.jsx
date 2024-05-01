// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// const Table = () => {
//     const [data, setData] = useState([])
//     const [name,setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [uname,usetName] = useState('')
//     const [uemail, usetEmail] = useState('')
//     const [editId, setEditID] = useState(-1);
//     useEffect(()=> {
//         axios.get('http://localhost:3000/users/')
//         .then(res=>setData(res.data))
//         .catch(er=>console.log(er));
//     },[])

//     const handleSubmit =(event)=> {
//         event.preventDefault();
//         const id = data[data.length - 1].id + 1;
//         axios.post('http://localhost:3000/users/', {id:id,name:name, email:email})
//         .then(res=>{
//             window.location.reload()
//         })
//         .catch(er=>console.log(er));
//     }

//     const handleEdit = (id) => {
//         axios.get('http://localhost:3000/users/' + id)
//         .then(res=>{
//             console.log(res.data);
//             usetName(res.data.name)
//             usetEmail(res.data.email)
//     })
//         .catch(er=>console.log(er));
//         setEditID(id)
//     }

//     const handleDelete = (id) => {
//         axios.delete('http://localhost:3000/users/' + id)
//         .then(res => {
//             window.location.reload();
//         })
//         .catch(er => console.log(er))
//     }

//     const handleUpdate = () => {
//         axios.put('http://localhost:3000/users/' + editId, {id: editId, name: uname, email: uemail})
//         .then(res => {
//             console.log(res);
//             window.location.reload();
//             setEditID(-1);
//         }).catch(err=> console.log(err))
//     }
//   return (
//     <div className='container'>
//         <div className='form-div'>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" placeholder='Enter Name'  onChange={e=>setName(e.target.value)}/>
//                 <input type="text" placeholder='Enter Email'  onChange={e=>setEmail(e.target.value)}/>
//                 <button>Add</button>
//             </form>
//         </div>
//         <table>
//             <thead>
//                 <tr>
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Action</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                     data.map((user,index)=> (
//                         user.id === editId ?
//                         <tr>
//                             <td>{user.id}</td>
//                             <td><input type="text" value={uname} onChange={e => usetName(e.target.value)}/></td>
//                             <td><input type="text" value={uemail} onChange={e=> usetEmail(e.target.value)}/></td>
//                             <td><button onClick={handleUpdate}>Update</button></td>
//                         </tr>
//                         :
//                         <tr key={index}>
//                             <td>{user.id}</td>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td>
//                                 <button onClick={()=>handleEdit(user.id)}>edit</button>
//                                 <button onClick={() => handleDelete(user.id)}>delete</button>
//                             </td>
//                         </tr>
//                     ))
//                 }
//             </tbody>
//         </table>
//     </div>
//   )
// }

// export default Table

//http://localhost:3000/users/
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Table = () => {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [uname, setUName] = useState('');
    const [uemail, setUEmail] = useState('');
    const [editId, setEditID] = useState(-1);
    const [addCount, setAddCount] = useState(0);
    const [updateCount, setUpdateCount] = useState(0);
    const [addExecTime, setAddExecTime] = useState('');
    const [updateExecTime, setUpdateExecTime] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/users/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const id = data[data.length - 1].id + 1;
        const startTime = new Date();
        axios.post('http://localhost:3000/users/', { id: id, name: name, email: email })
            .then(res => {
                const endTime = new Date();
                setAddExecTime((endTime - startTime) / 1000 + " seconds");
                setAddCount(addCount + 1);
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        axios.get('http://localhost:3000/users/' + id)
            .then(res => {
                console.log(res.data);
                setUName(res.data.name);
                setUEmail(res.data.email);
            })
            .catch(err => console.log(err));
        setEditID(id);
    };

    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/users/' + id)
            .then(res => {
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    const handleUpdate = () => {
        const startTime = new Date();
        axios.put('http://localhost:3000/users/' + editId, { id: editId, name: uname, email: uemail })
            .then(res => {
                const endTime = new Date();
                setUpdateExecTime((endTime - startTime) / 1000 + " seconds");
                setUpdateCount(updateCount + 1);
                window.location.reload();
                setEditID(-1);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='container'>
            <div className='form-div'>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Enter Name' onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder='Enter Email' onChange={e => setEmail(e.target.value)} />
                    <button>Add</button>
                </form>
            </div>
            <p>Add API Call Count: {addCount}</p>
            <p>Add API Execution Time: {addExecTime}</p>
            <p>Update API Call Count: {updateCount}</p>
            <p>Update API Execution Time: {updateExecTime}</p>
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
                    {data.map((user, index) => (
                        user.id === editId ?
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td><input type="text" value={uname} onChange={e => setUName(e.target.value)} /></td>
                                <td><input type="text" value={uemail} onChange={e => setUEmail(e.target.value)} /></td>
                                <td><button onClick={handleUpdate}>Update</button></td>
                            </tr>
                            :
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => handleEdit(user.id)}>edit</button>
                                    <button onClick={() => handleDelete(user.id)}>delete</button>
                                </td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

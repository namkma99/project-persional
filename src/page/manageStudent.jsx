import {db} from '../firebaseConfig'
import React, { useEffect, useState } from 'react'
import  {MockData}  from '../api/mockData';
import FormComponent from '../component/form.component/form.component';
import LayoutComponent from '../component/layout.Component/layout.Component'
import SearchComponent from '../component/search.component/search.component'
import NavComponent from '../component/nav.component/nav.component';
import { ref,  onValue, remove} from "firebase/database";
import './style.scss'
import { Link } from 'react-router-dom';
const ManageStudentPage = () => {
  const [students, setStudents] = useState([])
  const data = ['toan', 'van', 'anh']
  const [subjects, setSubjects] = useState([])
  const title = 'ADMIN MANAGE STUDENT'
  const [search, setSearch] = useState('')
  useEffect(() => {
    if(!search) {
      const starCountRef = ref(db, 'students/');
          onValue(starCountRef, (snapshot) => {
              const data = snapshot.val();
              console.log("data", data)
              const arr = [];
              Object.keys(data).map(item => arr.push(data[item]))
              setStudents(arr)
          });
    } else {
      const searchItem = students.filter(item => (item.name.toLowerCase() === search.toLowerCase()))
      setStudents(searchItem)
    }
  }, [search])

  const handleDelete = async (id) => {
    await remove(ref(db, `/students/${id}`))
    console.log("iddd", students)
  }

  const handleSearchForm = (searchItem) => {
    setSearch(searchItem)
  }

  return (
    <LayoutComponent title={title}>
      <NavComponent subjects={subjects}/>
      <div>
        <SearchComponent placeholder={"search to student"} handleSearchForm={handleSearchForm}/>
      </div>
        {students && students.length > 0 ? 
        <div>
        <table className='table'> 
          <thead className='thead'>
            <tr>
              <th width='10%'>STT</th>
              <th width='20%'>Name</th>
              <th width='20%'>Email</th>
              <th width='20%'>Phone</th>
              <th width='30%'>Action</th>
            </tr>
          </thead>
          <tbody className='tbody'>
            {students && students.map((item, index) => (
              <tr key={index}>
                <td width='10%'>{index + 1}</td>
                <td width='20%'>
                {item.name}
                </td>
                <td width='20%'>
                {item.email}
                </td>
                <td width='20%'>
                {item.type}
                </td>
                <td width='30%'>
                  <Link className='edit' to={`edit/${item.fingerId}`}><i className="fa-solid fa-pen"></i></Link>
                  <button className='delete' onClick={()=>handleDelete(item.fingerId)}><i className="fa-solid fa-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> : 
      <>No result</>  
      }
    </LayoutComponent>
  )
}

export default React.memo(ManageStudentPage)
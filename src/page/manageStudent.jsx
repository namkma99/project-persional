import React, { useEffect, useState } from 'react'
import  {MockData}  from '../api/mockData';
import FormComponent from '../component/form.component/form.component';
import LayoutComponent from '../component/layout.Component/layout.Component'
import NavComponent from '../component/nav.component/nav.component';
import './style.scss'
const ManageStudentPage = () => {
  // const [students, setStudents] = useState([])
  const data = ['toan', 'van', 'anh']
  const [subjects, setSubjects] = useState([])
  const title = 'ADMIN MANAGE STUDENT'
  const arr = []
  useEffect(() => {
    async function fetchData() {
      const mockData = await MockData['subjects']
      for(let data in mockData) {
        arr.push(mockData[`${data}`])
      }
      setSubjects(arr)
    }
    fetchData()
  }, [])

  console.log("subjects", subjects);
  return (
    <LayoutComponent title={title}>
      <NavComponent subjects={subjects}/>
      <FormComponent />
        <div>
          <table>
            <thead>
              <tr>
                <th>Day/Subject</th>
                {data && data.map((sub, index) => (
                  <th key={index}>{sub.name}</th>
                ))}
                {/* <th>Contact</th>
                <th>Country</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alfreds Futterkiste</td>
                <td>Maria Anders</td>
                <td>Germany</td>
              </tr>
              <tr>
                <td>Centro comercial Moctezuma</td>
                <td>Francisco Chang</td>
                <td>Mexico</td>
              </tr>
              <tr>
                <td>Ernst Handel</td>
                <td>Roland Mendel</td>
                <td>Austria</td>
              </tr>
              <tr>
                <td>Island Trading</td>
                <td>Helen Bennett</td>
                <td>UK</td>
              </tr>
              <tr>
                <td>Laughing Bacchus Winecellars</td>
                <td>Yoshi Tannamuri</td>
                <td>Canada</td>
              </tr>
              <tr>
                <td>Magazzini Alimentari Riuniti</td>
                <td>Giovanni Rovelli</td>
                <td>Italy</td>
              </tr>
            </tbody>
          </table>
        </div>
    </LayoutComponent>
  )
}

export default React.memo(ManageStudentPage)
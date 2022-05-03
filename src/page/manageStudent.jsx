import {db} from '../firebaseConfig'
import React, { useEffect, useState } from 'react'
import  {MockData}  from '../api/mockData';
import FormComponent from '../component/form.component/form.component';
import LayoutComponent from '../component/layout.Component/layout.Component'
import NavComponent from '../component/nav.component/nav.component';
import { ref,  onValue} from "firebase/database";
import './style.scss'
const ManageStudentPage = () => {
  const [students, setStudents] = useState([])
  const data = ['toan', 'van', 'anh']
  const [subjects, setSubjects] = useState([])
  const title = 'ADMIN MANAGE STUDENT'
  useEffect(() => {
    const starCountRef = ref(db, 'students/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const arr = [];
            Object.keys(data).map(item => arr.push(data[item]))
            arr.push(data);
            setStudents(arr)
        });
  }, [])

  console.log("subjects", students);
  return (
    <LayoutComponent title={title}>
      <NavComponent subjects={subjects}/>
      <div>
        
      </div>
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
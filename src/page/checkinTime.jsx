import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import LayoutComponent from '../component/layout.Component/layout.Component'
import { db } from '../firebaseConfig'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const CheckinTime = (props) => {
    const [subjects, setSubjects] = useState([])
    const [student, setStudents] = useState([])
    const [checkInTime, setCheckInTime] = useState([])
    const [value, setValue] = useState(1)
    // const [checkInValue,]
  useEffect(() => {
    const starCountRef = ref(db, 'subjects/');
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const arr = [];
        Object.keys(data).map(item => arr.push(data[item]))
        setSubjects(arr)
    });
    const starCountRef1 = ref(db, 'students/');
          onValue(starCountRef1, (snapshot) => {
              const data = snapshot.val();
              const arr = [];
              Object.keys(data).map(item => arr.push(data[item]))
              setStudents(arr)
          });
  }, [])
  
  useEffect( () => {
    if(subjects) {
        const arr = subjects && subjects.filter(item => item.id === Number(value))
        setCheckInTime(arr)
    }
  }, [subjects, value])
const listCheckIn = checkInTime[0]?.checkInTime 
  //   console.log("listCheckIn", listCheckIn.map(item => item[1]));
  console.log("subject", subjects)
  const handleChangeSelected = (val) => {
        setValue(val)
    }
    console.log("listSubject", listCheckIn);
  return (
    <LayoutComponent>
        <div>
            <select defaultValue={1} onChange={(e) => handleChangeSelected(e.target.value)}>
                <option value={1}>Toan</option>
                <option value={2}>Van</option>
                <option value={3}>Anh</option>
            </select>
        <table className='table' id='emp-table'> 
          <thead className='thead'>
              <tr>
                  <th></th>
                  <th>FingerId</th>
                  {listCheckIn && Object.entries(listCheckIn).map((v,k) => (
                      <th key={k}>{v[0]}</th>
                  ))}
              </tr>
          </thead>
          <tbody className='tbody'>
            {student && student.map((value, key) => (
            <tr key={key}>
                <td>{key}</td>
                <td>{value.fingerId}</td>
                {listCheckIn && Object.entries(listCheckIn).map((v,k) => (
                     <td key={v[1][value.fingerId]}>{v[1][value.fingerId] ? v[1][value.fingerId] : 'x'}</td>
                ))}
            </tr>
            ))}
          </tbody> 
        </table>
        <ReactHTMLTableToExcel 
            className='btn-export'
            table='emp-table'
            filename='Excel Test'
            sheet='Sheet'
            buttonText='Export Excel'
        />
        </div>
    </LayoutComponent>
  )
}

export default CheckinTime
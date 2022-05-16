
import React, { useEffect, useState } from 'react'
import LayoutComponent from '../component/layout.Component/layout.Component'
import { db } from '../firebaseConfig'
import { ref,  onValue, remove} from "firebase/database";
import CheckinTime from './checkinTime';
const ManageClassPage = () => {
  const [subjects, setSubjects] = useState([])
  useEffect(() => {
    // onSendMessage()
    const starCountRef = ref(db, 'subjects/');
          onValue(starCountRef, (snapshot) => {
              const data = snapshot.val();
              const arr = [];
              Object.keys(data).map(item => arr.push(data[item]))
              setSubjects(arr)
          });
  }, [])

  const listSubject = subjects.filter(item => item.id)
  const checkinTime = (item) => {
    // eslint-disable-next-line no-restricted-globals
    location.href = '/checkin'
  }
  return (
    <LayoutComponent>
        <div>
        <table className='table'> 
          <thead className='thead'>
            <tr>
              <th width='10%'>STT</th>
              <th width='20%'>Subject</th>
              <th width='10%'>DayOfWeek</th>
              <th width='15%'>StartDate</th>
              <th width='15%'>EndDate</th>
              <th width='30%'>Action</th>
            </tr>
          </thead>
          <tbody className='tbody'>
            {listSubject && listSubject.map((item, index) => (
              <tr key={index}>
                <td width='10%'>{index + 1}</td>
                <td width='10%'>
                {item.name}
                </td>
                <td width='20%'>
                {item.dayOfWeek}
                </td> 
                <td width='20%'>
                {item.startDate}
                </td>
                <td width='10%'>
                {item.endDate}
                </td>
                <td width='30%'>
                  {/* <Link className='edit' to={`edit/${item.fingerId}`}><i className="fa-solid fa-pen"></i></Link> */}
                  <span onClick={()=>checkinTime(item)}>Check in</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
    </LayoutComponent>
  )
}

export default ManageClassPage
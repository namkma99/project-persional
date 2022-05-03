import React, { useEffect, useState } from 'react'
import LayoutComponent from '../component/layout.Component/layout.Component'
import {db} from '../firebaseConfig'
import { set, ref,  onValue} from "firebase/database";
import './style.scss'
const CreateStudent = React.memo((props) => {
    const [students, setStudents] = useState({})
    const title = 'CREATE STUDENT'
    const [fingerId, setFingerId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    useEffect(() => {
        const starCountRef = ref(db, 'students/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setStudents(data)
        });
    }, [])
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const fingerIdInFirebase =  students[`${fingerId}`]
            console.log("fingerIdInFirebase", fingerIdInFirebase);
            if(!fingerIdInFirebase) {
                const data = {
                    name: name,
                    email: email,
                    type: phoneNumber,
                }
                console.log("data",{
                    ...data,
                    fingerId:fingerId
                });
                const response = await fetch('http://192.168.41.33/setRoom', {
                    method: 'POST',
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "access-control-allow-credentials" : false
                    },
                    body: JSON.stringify({
                        id: parseInt(fingerId),
                        name: name,
                        type: phoneNumber
                    })
                })
                await set(ref(db, `/students/${fingerId}`), {
                    ...data,
                    fingerId:fingerId,
                })
                setFingerId('')
                setName('')
                setEmail('')
                setPhoneNumber('')
                console.log("Create Success");
                return response;
            } else {
                console.log('error')
            }
        } catch (error) {
            console.log('error',error)
        }
    }
    
    return (
        <LayoutComponent title={title}>
            <form onSubmit={handleSubmit}className='form'>
                <div className='form-control'>
                    <label>FingerId</label>
                    <input type='text' value={fingerId} placeholder='Enter fingerId ...' onChange={(e)=>setFingerId(e.target.value)}/>
                </div>
                <div className='form-control'>
                    <label>Name</label>
                    <input type='text' value={name} placeholder='Enter name ...' onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className='form-control'>
                    <label>Email</label>
                    <input type='text' value={email} placeholder='Enter email ...' onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className='form-control'>
                    <label>Phone Number</label>
                    <input type='text' value={phoneNumber} placeholder='Enter phone number ...' onChange={(e)=>setPhoneNumber(e.target.value)} />
                </div>
                <div className='button'>
                    <button className='btn btn-outline ' type="submit" value="Submit">Cancel</button>
                    <button className='btn btn-primary' type="submit" value="Submit">Submit</button>
                </div>
            </form>
        </LayoutComponent>
    )
})

export default CreateStudent
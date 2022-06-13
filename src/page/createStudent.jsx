import React, { useEffect, useState } from 'react'
import LayoutComponent from '../component/layout.Component/layout.Component'
import {db} from '../firebaseConfig'
import { set, ref,  onValue, update} from "firebase/database";
import './style.scss'
import { useParams, useNavigate } from 'react-router-dom';
const CreateStudent = React.memo((props) => {
    let params = useParams();
    let navigate = useNavigate();
    const titleCreate = 'CREATE STUDENT'
    const titleEdit = 'EDIT STUDENT'
    const [create, setCreate] = useState(false)
    const [students, setStudents] = useState({})
    const [fingerId, setFingerId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [idx, setIdx] = useState('')
    useEffect(() => {
        const starCountRef = ref(db, 'students/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setStudents(data)
        });
        setIdx(params.id)
        if(idx) {
            const student = students[`${idx}`]
            if(student) {
                setCreate(false)
                console.log("student", student);
                setFingerId(student.fingerId)
                setName(student.name)
                setEmail(student.email)
                setPhoneNumber(student?.type)
            } else {
                
            }
        }else {
            setCreate(true)
            setFingerId("")
            setName("")
            setEmail("")
        }
    }, [idx])
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(create) {
            handleCreateStudent()
        } else {
            handleEditPage()
        }
    }

    const handleCreateStudent = async () => {
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
                const urlHome = 'http://192.168.41.33/setRoom'
                const myPhone = 'http://172.20.10.2/setRoom'
                const response = await fetch(myPhone, {
                    method: 'POST',
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "access-control-allow-credentials" : false
                    },
                    body: JSON.stringify({
                        id: parseInt(fingerId),
                        name: name,
                        email: email,
                        type: phoneNumber
                    })
                })
                await set(ref(db, `/students/${fingerId}`), {
                    ...data,
                    fingerId:fingerId,
                })
                .then(() => {
                    alert('Create Student Success!')
                })
                setFingerId('')
                setName('')
                setEmail('')
                setPhoneNumber('')
                console.log("Create Success");
                alert(`sinh viên: ${name} đã được thêm thành công`)
                return response;
            } else {
                console.log('error')
                alert(`created failed !`)
            }
        } catch (error) {
            console.log('error',error)
        }
    }

    const handleEditPage = async () => {
        console.log("userId", params)
        try{
            await update(ref(db, `/students/${fingerId}`), {
                fingerId:fingerId,
                name: name,
                email: email,
                type: phoneNumber,
            })
            console.log("Edit Success");
            return navigate('/')
        }
        catch(e) {
            console.log('error', e);
        }
    }
    
    const handleCancel = () => {
        return navigate('/')
    }
    return (
        <LayoutComponent title={create ? titleCreate : titleEdit}>
            <form onSubmit={handleSubmit}className='form'>
                <div className='form-control'>
                    <label>FingerId</label>
                    <input type='text' disabled={create ? false : true} value={fingerId} placeholder='Enter fingerId ...' onChange={(e)=>setFingerId(e.target.value)}/>
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
                    <button className='btn btn-outline' onClick={handleCancel}>Cancel</button>
                    <button className='btn btn-primary' type="submit" value="Submit">Submit</button>
                </div>
            </form>
        </LayoutComponent>
    )
})

export default CreateStudent
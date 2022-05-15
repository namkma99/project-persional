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
                
            </form>
        </LayoutComponent>
    )
})

export default CreateStudent
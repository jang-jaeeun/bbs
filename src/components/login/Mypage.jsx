import React, { useEffect, useState } from 'react';
import {Row, Col, Card, Button, InputGroup, Form} from 'react-bootstrap';
import { app } from '../../firebaseInit';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import ModalAddress from './ModalAddress';
import ModalPhoto from './ModalPhoto';

const Mypage = () => {
    const db = getFirestore(app);
    const uid = sessionStorage.getItem('uid');

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email : sessionStorage.getItem('email'),
        name : '장재은',
        phone : '010-1010-2020',
        address1 : '경기도 평택시 땡땡동',
        address2 : '땡땡 아파트 101동 101호'
    });

    const {name, phone, address1, address2} = form; // 비구조 할당

    const onChangeForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        if(name===''){
            alert("이름을 입력하세용");
            return;
        }
        // 정보저장
        if(!window.confirm('변경된 내용을 저장하겠습니까?')) return;
        console.log(form);
        setLoading(true);
        await setDoc(doc(db, `users/${uid}`), form);
        setLoading(false);
    }
    
    const callDB = async() => {
        setLoading(true);
        const res = await getDoc(doc(db, `users/${uid}`));
        if(res.data()){
            setForm(res.data());
        }
        setLoading(false);
    }

    useEffect(()=>{
        callDB();
    }, []);

    if(loading) <h1 className='text-center my-5'>로딩중...</h1>
    return (
        <div>
        <Row className='justify-content-center my-5'>
            <Col xs={12} md={10} lg ={8}>
                <Card>
                    <Card.Header>
                        <h3 className='text-center'>마이페이지</h3>
                    </Card.Header>
                    <Card.Body>
                        <div className='text-center'>
                            <ModalPhoto setLoading={setLoading} form={form} setForm={setForm}/>
                        </div>
                        <form onSubmit={onSubmit}>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>이름</InputGroup.Text>
                                <Form.Control name="name" value={name} onChange={onChangeForm}/>
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>전화</InputGroup.Text>
                                <Form.Control name="phone" value={phone} onChange={onChangeForm}/>
                            </InputGroup>
                            <InputGroup className='mb-1'>
                                <InputGroup.Text>주소</InputGroup.Text>
                                <Form.Control name="address1" value={address1} onChange={onChangeForm}/>
                                <ModalAddress form={form} setForm={setForm}/>
                            </InputGroup>
                            <Form.Control placeholder='상세주소' name="address2" value={address2} onChange={onChangeForm}/>
                            <div className='text-center mt-3'>
                                <Button className='px-5' type='submit'>저장</Button>
                                <Button className='ms-2 px-5' variant='secondary'>취소</Button>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        </div>
    )
}

export default Mypage
import React, { useState } from 'react'
import {Row, Col, Form, InputGroup, Card, Button} from 'react-bootstrap'
import InputGroupText from 'react-bootstrap/esm/InputGroupText'
import {app} from '../../firebaseInit'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Join = () => {
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const auth=getAuth(app);
    const [form, setForm] = useState({
        email:'blue@test.com',
        pass: '12341234'
    });
    const {email, pass} = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(email===""||pass ===""){
            alert("이메일과 비밀번호를 입력하세요"); 
        }else{
            //이메일가입
            setLoading(true);
            signInWithEmailAndPassword(auth, email, pass)
            .then(success=>{
                alert("로그인 성공");
                setLoading(false);
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('uid', success.user.uid);
                if(sessionStorage.getItem('target')){
                    navi(sessionStorage.getItem('target'));
                }else{
                }
                navi('/');
            })
            .catch(error=>{
                alert("에러:" + error.message);
                setLoading(false);
            });

        }
    }
    if(loading) return <h1 className='my-5'>로딩중입니다...</h1>

  return (
   <Row className='my-5 justify-content-center'>
        <Col md={6} lg={4}>
            <Card>
                <Card.Header>
                    <h3 className='text-center'>회원가입</h3>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                        <InputGroup.Text style={{width:100}} className='justify-content-center'>이메일
                        </InputGroup.Text>
                        <Form.Control name="email" value={email} onChange={onchange}/>
                        </InputGroup>
                        <InputGroup>
                        <InputGroup.Text style={{width:100}}className='justify-content-center'>비밀번호
                        </InputGroup.Text>
                        <Form.Control name="pass" type= "password" value={pass} onchange={onChange}/>
                        </InputGroup>
                        <div>
                            <Button className='w-100' type= "submit">회원가입</Button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </Col>
   </Row>
  )
}

export default Join

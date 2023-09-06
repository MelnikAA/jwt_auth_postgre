import { observer } from "mobx-react-lite";
import React, {FC, useContext, useState} from 'react';
import Button from "react-bootstrap/Button";
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {Context} from "../index";
import { REGISTRATION_ROUTE } from "../utils/consts";



const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const{store} = useContext(Context);
    return (
        <Container
        className = "d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight}}>
                <Card style={{width:600}} className="p-5">
                    <h2 className="m-auto">Авторизация</h2>
                    <Form className="d-flex flex-column">
                        <Form.Control
                            style={{marginTop:12}}
                            placeholder="Email"
                            onChange = {e =>setEmail(e.target.value)}
                            value = {email}>
                        </Form.Control>
                        <Form.Control
                            type="password"
                            style={{marginTop:12}}
                            placeholder="Пароль"
                            onChange = {e =>setPassword(e.target.value)}
                            value = {password}>
                        </Form.Control>
                        <Button className="mt-3" variant={"outline-success"} onClick={() => store.login(email, password)}>
                            Войти
                        </Button>
                        <Button className="mt-3 form-control" variant={"outline-primary"} onClick={() => store.registration(email, password)}>
                            Зарегестрироваться
                        </Button>
                        
                    </Form>
                </Card>
        </Container>
        
    )
}

export default observer(LoginForm);
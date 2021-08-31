import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Form, Header, Image, Message, Segment } from 'semantic-ui-react'
import UserService from "../services/UserService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/actions/authActions";
import { toast } from "react-toastify";

export default function Login() {

    const dispatch = useDispatch()

    const handleLogin = (user) => {
        dispatch(userLogin(user))
    }

    const history = useHistory();

    let userService = new UserService();
    const userLoginSchema = Yup.object().shape({
        email: Yup.string().required("Bu alan doldurulmak zorundadır").email("Geçerli bir email adresi giriniz"),
        password: Yup.string().required("Bu alan doldurulmak zorundadır")
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: userLoginSchema,
        onSubmit: (values) => {
            userService.login(values).then((result) => {
                handleLogin(result.data.data)
                history.push("/")
            }).catch((result) => {
                toast.error(result.response.data.message)
            })
        }
    })

    return (
        <div style={{ maxWidth: '50%' }}>
            <Form size="large" onSubmit={formik.handleSubmit}>
                <Segment>
                    <div>
                        <label><b>E-MAİL</b></label>
                        <Form.Input
                            fluid
                            style={{ marginTop: '1em' }}
                            icon="user"
                            iconPosition="left"
                            placeholder="E-mail adresi"
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {
                            formik.errors.email && formik.touched.email && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.email}
                                </div>
                            )
                        }
                    </div>
                    <div style={{ marginTop: "1em" }}>
                        <label><b>ŞİFRE</b></label>
                        <Form.Input
                            fluid
                            style={{ marginTop: '1em' }}
                            icon="lock"
                            iconPosition="left"
                            placeholder="Şifre"
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {
                            formik.errors.password && formik.touched.password && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.password}
                                </div>
                            )
                        }
                    </div>

                    <Button color="blue" fluid size="large" type="submit" style={{ marginTop: "1em" }}>
                        GİRİŞ
                    </Button>
                </Segment>
            </Form>
            <Message info>
                Kayıtlı değilmisin? <b><Link to={"/register"}>Şimdi Kaydol</Link></b>
            </Message>
        </div>
    );
}

import React, { useEffect } from "react";
import { useState } from "react";
import SchoolService from "../../services/SchoolService";
import { Card, Table, Button, Form, Grid } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function UpdateSchools({ cvId, updateCvValues }) {

    let [schools, setSchools] = useState([]);

    let schoolService = new SchoolService();
    useEffect(() => {
        let schoolService = new SchoolService();
        schoolService.getByCvId(cvId).then((result) => {
            setSchools(result.data.data);
        });
    }, [cvId]);

    let schoolAddSchema = Yup.object().shape({
        department: Yup.string().required("Bu alan zorunlu").min(2, "Minimum 2 karakter uzunlugunda olmalıdır"),
        endDate: Yup.date(),
        name: Yup.string().required("Bu alan zorunludur").min(2, "Minimum 2 karakter uzunlugunda olmalıdır"),
        startDate: Yup.date().required("Bu alan zorunludur")
    })

    const formik = useFormik({
        initialValues: {
            department: "",
            endDate: "",
            name: "",
            startDate: ""
        },
        validationSchema: schoolAddSchema,
        onSubmit: (values) => {
            values.cvId = cvId;
            schoolService.addScholl(values).then((result) => {
                toast.success(result.data.message)
                schoolService.getByCvId(cvId).then((result) => {
                    setSchools(result.data.data);
                })
                updateCvValues();
            }).catch((result) => {
                toast.error(result.response.data.message)
            })
        }
    })

    const handleDeleteScholl = (schoolId) => {
        schoolService.deleteSchool(schoolId).then((result) => {
            toast.success(result.data.message);
            schoolService.getByCvId(cvId).then((result) => {
                setSchools(result.data.data)
            })
            updateCvValues();
        }).catch((result) => {
            toast.error(result.response.data.message)
        })
    }


    return (
        <div>
            <Card fluid>
                <Card.Content header="OKULLAR" />
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>OKUL ADI</Table.HeaderCell>
                            <Table.HeaderCell>BÖLÜM</Table.HeaderCell>
                            <Table.HeaderCell>BAŞLANGIÇ TARİHİ</Table.HeaderCell>
                            <Table.HeaderCell>MEZUNİYET TARİHİ</Table.HeaderCell>
                            <Table.HeaderCell>SİL</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {schools?.map((school) => (
                            <Table.Row key={school.id}>
                                <Table.Cell>{school.name}</Table.Cell>
                                <Table.Cell>{school.department}</Table.Cell>
                                <Table.Cell>{school.startDate}</Table.Cell>
                                <Table.Cell>{school.endDate}</Table.Cell>
                                <Table.Cell>
                                    <Button color="red" icon="x" circular onClick={() => handleDeleteScholl(school.id)}>
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Card>
            <Card fluid>
                <Card.Content header="OKUL EKLE" />
                <Card.Content>
                    <Form onSubmit={formik.handleSubmit}>
                        <Grid stackable>
                            <Grid.Column width={8}>
                                <label><b>Okul Adı</b></label>
                                <Form.Input
                                    fluid
                                    placeholder="Okul Adı"
                                    type="text"
                                    name="name"
                                    style={{ marginTop: '1em' }}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <label><b>Başlangıç Tarihi</b></label>
                                <Form.Input
                                    fluid
                                    type="date"
                                    name="startDate"
                                    style={{ marginTop: '1em' }}
                                    value={formik.values.startDate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <label><b>Bölüm Adı</b></label>
                                <Form.Input
                                    fluid
                                    placeholder="Bölüm Adı"
                                    type="text"
                                    name="department"
                                    style={{ marginTop: '1em' }}
                                    value={formik.values.department}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <label><b>Mezuniyet Tarihi</b></label>
                                <Form.Input
                                    fluid
                                    type="date"
                                    name="endDate"
                                    style={{ marginTop: '1em' }}
                                    value={formik.values.endDate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </Grid.Column>
                        </Grid>
                        <div style={{ marginTop: "1em" }}>
                            <Button fluid color="green" type="submit">Ekle</Button>
                        </div>
                    </Form>
                </Card.Content>
            </Card>
        </div>
    );
}

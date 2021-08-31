import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ExperienceService from '../../services/ExperienceService'
import { Card, Table, Button, Form, Grid } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

export default function UpdateExperience({ cvId, updateCvValues }) {

    let [experiences, setExperiences] = useState([])

    let experienceService = new ExperienceService();
    useEffect(() => {
        let experienceService = new ExperienceService();
        experienceService.getByCvId(cvId).then((result) => {
            setExperiences(result.data.data)
        })
    }, [cvId])

    let experienceAddSchema = Yup.object().shape({
        companyName: Yup.string().required("Bu alan zorunludur").min(2, "En az 2 karakter uzunlugunda olmalıdır"),
        position: Yup.string().required("Bu alan zorunludur").min(2, "En az 2 karakter uzunlugunda olmalıdır"),
        startDate: Yup.date().required("Bu alan zorunludur"),
        endDate: Yup.date(),
    })

    const formik = useFormik({
        initialValues: {
            companyName: "",
            position: "",
            startDate: "",
            endDate: "",
        },
        validationSchema: experienceAddSchema,
        onSubmit: (values) => {
            values.cvId = cvId;
            experienceService.add(values).then((result) => {
                toast.success(result.data.message)
                experienceService.getByCvId(cvId).then((result) => {
                    setExperiences(result.data.data)
                })
                updateCvValues();
            }).catch((result) => {
                toast.error(result.response.data.message)
            })
        }
    })

    const handleDeleteExperience = (experienceId) => {
        experienceService.delete(experienceId).then((result) => {
            toast.success(result.data.message);
            experienceService.getByCvId(cvId).then((result) => {
                setExperiences(result.data.data)
            })
            updateCvValues();
        }).catch((result) => {
            toast.error(result.response.data.message)
        })
    }

    return (
        <div>
            <Card fluid>
                <Card.Content header="DENEYİMLER" />
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ŞİRKET ADI</Table.HeaderCell>
                            <Table.HeaderCell>POZİSYON</Table.HeaderCell>
                            <Table.HeaderCell>BAŞLANGIÇ TARİHİ</Table.HeaderCell>
                            <Table.HeaderCell>BİTİŞ TARİHİ</Table.HeaderCell>
                            <Table.HeaderCell>SİL</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {experiences?.map((experience) => (
                            <Table.Row key={experience.id}>
                                <Table.Cell>{experience.companyName}</Table.Cell>
                                <Table.Cell>{experience.position}</Table.Cell>
                                <Table.Cell>{experience.startDate}</Table.Cell>
                                <Table.Cell>{experience.endDate ? experience.endDate : <p>Devam ediyor</p>}</Table.Cell>
                                <Table.Cell>
                                    <Button color="red" icon="x" circular onClick={() => handleDeleteExperience(experience.id)}>
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Card>
            <Card fluid>
                <Card.Content header="DENEYİM EKLE" />
                <Card.Content>
                    <Form onSubmit={formik.handleSubmit}>
                        <Grid>
                            <Grid.Column width={8}>
                                <div>
                                    <label><b>Şirket Adı</b></label>
                                    <Form.Input
                                        fluid
                                        placeholder="Şirket Adı"
                                        type="text"
                                        name="companyName"
                                        style={{ marginTop: '1em', marginBottom: '1em' }}
                                        value={formik.values.companyName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.companyName && formik.touched.companyName && (
                                        <div className={"ui pointing red basic label"}>
                                            {formik.errors.companyName}
                                        </div>
                                    )}
                                </div>
                                <label><b>Başlangıç Tarihi</b></label>
                                <Form.Input
                                    fluid
                                    type="date"
                                    name="startDate"
                                    value={formik.values.startDate}
                                    style={{ marginTop: '1em', marginBottom: '1em' }}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.startDate && formik.touched.startDate && (
                                    <div className={"ui pointing red basic label"}>
                                        {formik.errors.startDate}
                                    </div>
                                )}
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <div>
                                    <label><b>Pozisyon</b></label>
                                    <Form.Input
                                        fluid
                                        placeholder="Pozisyon"
                                        type="text"
                                        name="position"
                                        style={{ marginTop: '1em', marginBottom: '1em' }}
                                        value={formik.values.position}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.position && formik.touched.position && (
                                        <div className={"ui pointing red basic label"}>
                                            {formik.errors.position}
                                        </div>
                                    )}
                                </div>
                                <label><b>Bitiş Tarihi</b></label>
                                <Form.Input
                                    fluid
                                    type="date"
                                    name="endDate"
                                    style={{ marginTop: '1em', marginBottom: '1em' }}
                                    value={formik.values.endDate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.endDate && formik.touched.endDate && (
                                    <div className={"ui pointing red basic label"}>
                                        {formik.errors.endDate}
                                    </div>
                                )}
                            </Grid.Column>
                        </Grid>
                        <div style={{ marginTop: "1em" }}>
                            <Button fluid color="green" type="submit">Ekle</Button>
                        </div>
                    </Form>
                </Card.Content>
            </Card>
        </div>
    )
}

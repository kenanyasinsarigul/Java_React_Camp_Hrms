import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import EmployerService from "../services/EmployerService";
import { Header, Table, Icon, Card, Button, Grid, GridColumn } from "semantic-ui-react";
import JobAdService from "../services/JobAdService";
import { Link } from "react-router-dom";

export default function EmployerDetail() {
    let { id } = useParams();

    const [employer, setEmployer] = useState({});
    const [jobAds, setJobAds] = useState([]);

    useEffect(() => {
        let employerService = new EmployerService();
        let jobAdService = new JobAdService();
        employerService
            .getEmployerById(id)
            .then((result) => setEmployer(result.data.data));
        jobAdService
            .getActiveAdsByCompanyId(id)
            .then((result) => setJobAds(result.data.data));
    }, [id]);

    return (
        <div>
            <Grid stackable>
                <GridColumn width={6}>
                    <Table celled>
                        <Table.Header>
                            <Table.Row >
                                <Table.HeaderCell>İŞ VEREN</Table.HeaderCell>
                                <Table.HeaderCell>BİLGİLERİ</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as="h4">
                                        <Header.Content style={{ float: 'left', marginLeft: '0.7em' }}>
                                            ŞİRKET ADI :
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>{employer.companyName}</Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>
                                    <Header as="h4">
                                        <Header.Content style={{ float: 'left', marginLeft: '0.7em' }}>
                                            WEB SİTESİ :
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>{employer.webSite}</Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>
                                    <Header as="h4">
                                        <Header.Content style={{ float: 'left', marginLeft: '0.7em' }}>
                                            E-MAİL :
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>{employer.email}</Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>
                                    <Header as="h4">
                                        <Header.Content style={{ float: 'left', marginLeft: '0.7em' }}>
                                            TELEFON :
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>{employer.phoneNumber}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </GridColumn>

                <GridColumn width={10}>
                    <Card fluid>
                        <Card.Content style={{ padding: '1em' }}>
                            <h4>BU ŞİRKETE AİT İŞ İLANLARI</h4>
                        </Card.Content>
                        <Card.Content>
                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>POZİSYON</Table.HeaderCell>
                                        <Table.HeaderCell>ŞEHİR</Table.HeaderCell>
                                        <Table.HeaderCell>AÇIK POZİSYON</Table.HeaderCell>
                                        <Table.HeaderCell>ÇALIŞMA YERİ</Table.HeaderCell>
                                        <Table.HeaderCell>ÇALIŞMA ZAMANI</Table.HeaderCell>
                                        <Table.HeaderCell>DETAY</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {jobAds.map((jobAd) => (
                                        <Table.Row key={jobAd.id}>
                                            <Table.Cell>{jobAd.jobPosition?.name}</Table.Cell>
                                            <Table.Cell>{jobAd.city?.name}</Table.Cell>
                                            <Table.Cell>{jobAd.openPositions}</Table.Cell>
                                            <Table.Cell>{jobAd.workPlace?.name}</Table.Cell>
                                            <Table.Cell>{jobAd.workTime?.name}</Table.Cell>
                                            <Table.Cell>
                                                <Button style={{ borderRadius: '25px' }} color="blue" animated as={Link} to={`/jobads/${jobAd.id}`}>
                                                    <Button.Content visible>GİT</Button.Content>
                                                    <Button.Content hidden>
                                                        <Icon name="arrow right" />
                                                    </Button.Content>
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Card.Content>
                        <Card.Content extra>
                            <Icon name="list" />
                            {jobAds?.length} Adet İş ilanı mevcut
                        </Card.Content>
                    </Card>
                </GridColumn>
            </Grid>
        </div>
    );
}

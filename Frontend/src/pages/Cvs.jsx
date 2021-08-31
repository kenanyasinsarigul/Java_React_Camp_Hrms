import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header, Image, Table, Button, Icon, Grid } from "semantic-ui-react";
import CvService from "../services/CvService";

export default function Cvs() {
    const [cvs, setCvs] = useState([]);

    useEffect(() => {
        let cvService = new CvService();
        cvService.getCvs().then((result) => setCvs(result.data.data));
    }, []);

    return (
        <div>
            <Grid stackable>
                <Grid.Column width={16}>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>#</Table.HeaderCell>
                                <Table.HeaderCell>ADAY</Table.HeaderCell>
                                <Table.HeaderCell>TEKNOLOJİLER</Table.HeaderCell>
                                <Table.HeaderCell>DİLLER</Table.HeaderCell>
                                <Table.HeaderCell>GİTHUB</Table.HeaderCell>
                                <Table.HeaderCell>LİNKEDİN</Table.HeaderCell>
                                <Table.HeaderCell>DETAYLAR</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {cvs.map((cv) => (
                                <Table.Row key={cv.id}>
                                    <Table.Cell>
                                        <Image src={cv.images[0].imageUrl} rounded size="mini" />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header as="h4">
                                            <Header.Content>
                                                {cv.candidate.firstName + " " + cv.candidate.lastName}
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {cv.technologies.map((tech) => (
                                            <p style={{ float: 'left' }} key={tech.id}>{tech.name} , </p>
                                        ))}
                                    </Table.Cell>

                                    <Table.Cell>
                                        {cv.languages.map((lang) => (
                                            <p style={{ float: 'left' }} key={lang.id}>{lang.name + " : " + lang.level} , </p>
                                        ))}
                                    </Table.Cell>

                                    <Table.Cell>
                                        <a href={cv.github} target={"_blank"} rel="noopener noreferrer">
                                            <Button style={{ borderRadius: '25px' }} secondary disabled={!cv.github}>
                                                <Icon name="github" /> Github
                                            </Button>
                                        </a>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <a href={cv.linkedin} target={"_blank"} rel="noopener noreferrer">
                                            <Button style={{ borderRadius: '25px' }} color="linkedin" disabled={!cv.linkedin}>
                                                <Icon name="linkedin" /> LinkedIn
                                            </Button>
                                        </a>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Button style={{ borderRadius: '25px' }} color='yellow' animated as={Link} to={`/cvs/${cv.candidate.id}`}>
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
                </Grid.Column>
            </Grid>
        </div>
    );
}

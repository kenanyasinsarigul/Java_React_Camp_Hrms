import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Grid, GridColumn } from "semantic-ui-react";
import EmployerService from "../services/EmployerService";
import CandidateService from "../services/CandidateService";
import CvService from "../services/CvService";

export default function Employers() {
    const [employers, setEmployers] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [cvs, setCvs] = useState([]);

    useEffect(() => {

        let employerService = new EmployerService();
        employerService
            .getEmployers()
            .then((result) => setEmployers(result.data.data));

        let candidateService = new CandidateService();
        candidateService
            .getMailVerifyedCandidates()
            .then((result) => setCandidates(result.data.data));

        let cvService = new CvService();
        cvService.getCvs().then((result) => {
            setCvs(result.data.data)
            console.log(result);
        });
    }, []);

    return (
        <div>

            <Grid divided stackable>

                {/* <Grid.Column width={4}>
          <Categories />
        </Grid.Column> */}

                <Grid.Column width={8}>
                    <Card fluid>
                        <Card.Header style={{ padding: '10px', backgroundColor: 'black', color: 'white', fontWeight: 'bold' }}><p style={{ textAlign: 'center' }}>ADAYLAR</p></Card.Header>
                    </Card>
                    <Card.Group>
                        {
                            candidates.map(candidate => (
                                <Card key={candidate.id} fluid>
                                    <Card.Content>
                                        <Card.Header style={{ padding: '10px', backgroundColor: 'skyblue' }}>{candidate.firstName + " " + candidate.lastName}</Card.Header>
                                        <Card.Meta style={{ margin: '10px' }}>{candidate.dateOfBirth}</Card.Meta>
                                        <Card.Description style={{ margin: '10px' }}>
                                            <p><b>E-Mail: </b>{candidate.email}</p>
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <div>
                                            <Button style={{ color: 'black', borderRadius: '25px' }} color="green" as={Link} to={`/cvs/${candidate.id}`}>
                                                ADAYIN CV'SİNİ İNCELE
                                            </Button>
                                        </div>
                                    </Card.Content>
                                </Card>
                            ))
                        }


                    </Card.Group>
                </Grid.Column>

                <Grid.Column width={8}>

                    <Card fluid>
                        <Card.Header style={{ padding: '10px', backgroundColor: 'black', color: 'white', fontWeight: 'bold' }}><p style={{ textAlign: 'center' }}>İŞ VERENLER</p></Card.Header>
                    </Card>

                    <Card.Group>

                        {employers.map((employer) => (

                            <Card fluid key={employer.id}>
                                <Card.Content>
                                    <Card.Header style={{ padding: '10px', backgroundColor: 'skyblue' }}>{employer.companyName}</Card.Header>
                                    <Card.Meta style={{ margin: '10px' }}>{employer.phoneNumber}</Card.Meta>
                                    <Card.Description style={{ margin: '10px' }}>
                                        <p><b>E-Mail: </b>{employer.email}</p>
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <div>
                                        <Button style={{ borderRadius: '25px' }} color="blue" as={Link} to={`/employers/${employer.id}`}>
                                            Detay
                                        </Button>
                                        <Button style={{ borderRadius: '25px' }} color="blue">
                                            <a style={{ color: 'white' }} href={"https://" + employer.webSite} target={"_blank"} rel="noopener noreferrer">Web</a>
                                        </Button>
                                    </div>
                                </Card.Content>
                            </Card>

                        ))}

                    </Card.Group>

                </Grid.Column>

            </Grid>

        </div>
    );
}

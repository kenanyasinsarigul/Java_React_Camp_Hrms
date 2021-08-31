import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Grid } from "semantic-ui-react";
import CandidateService from "../services/CandidateService";

export default function Candidates() {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        let candidateService = new CandidateService();
        candidateService
            .getMailVerifyedCandidates()
            .then((result) => setCandidates(result.data.data));
    }, []);

    return (
        <div>
            <Card.Group>
                {
                    candidates.map(candidate => (
                        <Card key={candidate.id} fluid>
                            <Card.Content>
                                <Card.Header style={{ padding: '10px', backgroundColor: 'skyblue' }}>{candidate.firstName + " " + candidate.lastName}</Card.Header>
                                <Card.Meta style={{ padding: '10px' }}>{candidate.dateOfBirth}</Card.Meta>
                                <Card.Description style={{ padding: '10px' }}>
                                    {candidate.email}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div>
                                    <Button fluid color="green" as={Link} to={`/cvs/${candidate.id}`}>
                                        KULLANICININ CV'SİNİ İNCELE
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    ))
                }
            </Card.Group>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CvService from "../services/CvService";
import { Card, Image, Table, Header, Button, Icon, Grid } from "semantic-ui-react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useSelector } from "react-redux";
import UptadeGithub from "../popupmodals/cv/UpdateGithub";
import UpdateLinkedin from "../popupmodals/cv/UpdateLinkedin";
import UpdateBiography from "../popupmodals/cv/UpdateBiography";
import UpdateSchools from "../popupmodals/cv/UpdateSchools";
import UpdateLanguage from "../popupmodals/cv/UpdateLanguage";
import UpdateTechnology from "../popupmodals/cv/UpdateTechnology";
import UpdateExperience from "../popupmodals/cv/UpdateExperience";
import UpdateImage from "../popupmodals/cv/UpdateImage";
import { toast } from "react-toastify";

export default function CvDetail() {

    const { authItem } = useSelector(state => state.auth)

    let { id } = useParams();

    let [cv, setCv] = useState({});

    let cvService = new CvService();

    useEffect(() => {
        let cvService = new CvService();
        cvService.getByCandidateId(id).then((result) => setCv(result.data.data));
    }, [id]);

    let myProfile = false;
    if (authItem[0].loggedIn === false) {
        myProfile = false
    } else if (authItem[0].loggedIn === true) {
        myProfile = parseInt(authItem[0].user.id) === parseInt(id);
    }

    const handleGithubDelete = (cvId) => {
        cvService.deleteGithub(cvId).then((result) => {
            toast.success(result.data.message)
            updateCvValues();
        }).catch((result) => {
            toast.error(result.response.data.message)
        })
    }

    const handleLinkedinDelete = (cvId) => {
        cvService.deleteLinkedin(cvId).then((result) => {
            toast.success(result.data.message)
            updateCvValues();
        }).catch((result) => {
            alert(result.response.data.message)
            toast.error(result.response.data.message)
        })
    }

    const updateCvValues = () => {
        cvService.getByCandidateId(id).then((result) => {
            setCv(result.data.data)
        })
    }

    return (
        <div>
            <Grid divided stackable>
                <Grid.Column width={8}>
                    <Card fluid>
                        <Card.Content>
                            {cv.images?.map((image) => (
                                <Image style={{ marginLeft: '3em', marginRight: '2em' }}
                                    floated="left"
                                    size="small"
                                    src={image?.imageUrl}
                                    circular
                                    key={image?.id}
                                />
                            ))}

                            <Card.Header style={{ marginTop: "2.5em", marginBottom: '1em', fontSize: '1.3em' }}>
                                KULLANICI BİLGİLERİ
                            </Card.Header>
                            {myProfile && <Popup trigger={<button className="ui button primary" style={{ borderRadius: '25px' }}>Resim Yükle</button>} modal>
                                <UpdateImage cvId={cv.id} updateCvValues={updateCvValues} />
                            </Popup>}
                            <Card.Description>
                                <Table celled >
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Header as="h4" image>
                                                    <Header.Content>AD :</Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>{cv.candidate?.firstName}</Table.Cell>
                                        </Table.Row>

                                        <Table.Row>
                                            <Table.Cell>
                                                <Header as="h4" image>
                                                    <Header.Content>SOYAD :</Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>{cv.candidate?.lastName}</Table.Cell>
                                        </Table.Row>

                                        <Table.Row>
                                            <Table.Cell>
                                                <Header as="h4" image>
                                                    <Header.Content>D / T :</Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>{cv.candidate?.dateOfBirth}</Table.Cell>
                                        </Table.Row>

                                        <Table.Row>
                                            <Table.Cell>
                                                <Header as="h4" image>
                                                    <Header.Content>E-MAİL :</Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>{cv.candidate?.email}</Table.Cell>
                                        </Table.Row>

                                        <Table.Row>
                                            <Table.Cell>
                                                <Header as="h3" image>
                                                    <Header.Content>
                                                        <a
                                                            href={cv.github}
                                                            target={"_blank"}
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Button style={{ borderRadius: '25px' }} secondary fluid disabled={!cv.github}>
                                                                <Icon name="github" /> Github
                                                            </Button>
                                                        </a>
                                                    </Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>{myProfile && <Popup trigger={<button className="ui button primary" style={{ borderRadius: '25px' }}> Güncelle </button>} modal>
                                                <UptadeGithub cvId={cv.id} updateCvValues={updateCvValues} />
                                            </Popup>}
                                                {myProfile && <Button color="red" circular icon="x" onClick={() => handleGithubDelete(cv.id)} disabled={!cv.github}>
                                                </Button>}</Table.Cell>
                                        </Table.Row>

                                        <Table.Row>
                                            <Table.Cell>
                                                <Header as="h4" image>
                                                    <Header.Content>
                                                        <a
                                                            href={cv.linkedin}
                                                            target={"_blank"}
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Button style={{ borderRadius: '25px' }} color="linkedin" disabled={!cv.linkedin}>
                                                                <Icon name="linkedin" /> LinkedIn
                                                            </Button>
                                                        </a>

                                                    </Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>                            {myProfile && <Popup trigger={<button className="ui button primary" style={{ borderRadius: '25px' }}> Güncelle </button>} modal>
                                                <UpdateLinkedin cvId={cv.id} updateCvValues={updateCvValues} />
                                            </Popup>}
                                                {myProfile && <Button color="red" icon="x" circular disabled={!cv.linkedin} onClick={() => handleLinkedinDelete(cv.id)}>
                                                </Button>}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra></Card.Content>
                    </Card>
                    <Card fluid >
                        <Card.Content>
                            <Card.Header style={{ textAlign: 'center' }}>
                                BİYOGRAFİ
                                {myProfile && <Popup trigger={<button className="ui button primary" style={{ margin: "0.7em", borderRadius: '25px' }}> Güncelle </button>} modal>
                                    <UpdateBiography cvId={cv.id} updateCvValues={updateCvValues} curentBiography={cv.biography} />
                                </Popup>}
                            </Card.Header>
                        </Card.Content >
                        <Card.Content style={{ textAlign: 'center' }} description={cv.biography} />
                    </Card>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header style={{ textAlign: 'center' }}>
                                YABANCI DİL
                                {myProfile && <Popup trigger={<button className="ui button primary" style={{ margin: "0.7em", borderRadius: '25px' }}> Güncelle </button>} modal>
                                    <UpdateLanguage cvId={cv.id} updateCvValues={updateCvValues} />
                                </Popup>}
                            </Card.Header>
                        </Card.Content>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>DİL ADI</Table.HeaderCell>
                                    <Table.HeaderCell>SEVİYE ( min:1 / max:5 )</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {cv.languages?.map((language) => (
                                    <Table.Row key={language.id}>
                                        <Table.Cell>{language.name}</Table.Cell>
                                        <Table.Cell>{language.level}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Card>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Card fluid >
                        <Card.Content>
                            <Card.Header style={{ textAlign: 'center' }}>
                                EĞİTİM BİLGİLERİ
                                {myProfile && <Popup trigger={<button className="ui button primary" style={{ margin: "0.7em", borderRadius: '25px' }}> Güncelle </button>} modal>
                                    <UpdateSchools cvId={cv.id} updateCvValues={updateCvValues} />
                                </Popup>}
                            </Card.Header>
                        </Card.Content>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>OKUL ADI</Table.HeaderCell>
                                    <Table.HeaderCell>BÖLÜM</Table.HeaderCell>
                                    <Table.HeaderCell>BAŞLANGIÇ TARİHİ</Table.HeaderCell>
                                    <Table.HeaderCell>MEZUNİYET TARİHİ</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {cv.schools?.map((school) => (
                                    <Table.Row key={school.id}>
                                        <Table.Cell>{school.name}</Table.Cell>
                                        <Table.Cell>{school.department}</Table.Cell>
                                        <Table.Cell>{school.startDate}</Table.Cell>
                                        <Table.Cell>{school.endDate ? school.endDate : <p>Devam Ediyor</p>}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Card>
                    <Card fluid >
                        <Card.Content>
                            <Card.Header style={{ textAlign: 'center' }}>
                                YETKİNLİK
                                {myProfile && <Popup trigger={<button className="ui button primary" style={{ margin: "0.7em", borderRadius: '25px' }}> Güncelle </button>} modal>
                                    <UpdateTechnology cvId={cv.id} updateCvValues={updateCvValues} />
                                </Popup>}
                            </Card.Header>
                        </Card.Content>
                        <Table celled style={{ padding: '2em' }}>
                            <Table.Body>
                                {cv.technologies?.map((technology) => (
                                    <Table.Row key={technology.id} style={{ float: 'left' }}>
                                        {technology.name} ,
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Card>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header style={{ textAlign: 'center' }}>
                                PROFESYONEL DENEYİM
                                {myProfile && <Popup trigger={<button className="ui button primary" style={{ margin: "0.7em", borderRadius: '25px' }}> Güncelle </button>} modal>
                                    <UpdateExperience cvId={cv.id} updateCvValues={updateCvValues} />
                                </Popup>}
                            </Card.Header>
                        </Card.Content>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>ŞİRKET ADI</Table.HeaderCell>
                                    <Table.HeaderCell>POZİSYON</Table.HeaderCell>
                                    <Table.HeaderCell>BAŞLANGIÇ TARİHİ</Table.HeaderCell>
                                    <Table.HeaderCell>BİTİŞ TARİHİ</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {cv.experiences?.map((experience) => (
                                    <Table.Row key={experience.id}>
                                        <Table.Cell>{experience.companyName}</Table.Cell>
                                        <Table.Cell>{experience.position}</Table.Cell>
                                        <Table.Cell>{experience.startDate}</Table.Cell>
                                        <Table.Cell>{experience.endDate ? experience.endDate : <p>Devam Ediyor</p>}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Card>
                </Grid.Column>
            </Grid>









        </div>
    );
}

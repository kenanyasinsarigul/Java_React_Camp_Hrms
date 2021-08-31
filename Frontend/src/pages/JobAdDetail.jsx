import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import JobAdService from "../services/JobAdService";
import { Header, Icon, Table, Button, Grid, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FavoriteService from "../services/FavoriteService";
import { toast } from "react-toastify";

export default function JobAdDetail() {
    let { id } = useParams();

    const { authItem } = useSelector(state => state.auth)

    const [jobAd, setJobAd] = useState({});
    let [favorites, setFavorites] = useState([]);

    useEffect(() => {
        let jobAdService = new JobAdService();
        let favoriteService = new FavoriteService();
        jobAdService.getByJobAdId(id).then((result) => setJobAd(result.data.data));
        if (authItem[0].loggedIn === true && authItem[0].user.userType === 1) {
            favoriteService.getByCandidateId(authItem[0].user.id).then((result) => {
                setFavorites(result.data.data.map((favoriteAd) => (
                    favoriteAd.jobAd.id
                )))
            })
        }
    }, [id, authItem]);

    const handleAddFavorites = (jobAdId) => {
        let favoriteService = new FavoriteService();
        favoriteService.addFavorite(authItem[0].user.id, jobAdId).then((result) => {
            toast.success(result.data.message)
            favorites.push(jobAdId)
            setFavorites([...favorites])
        }).catch((result) => {
            toast.error(result.response.data.message)
        })
    }

    return (
        <div>
            <Card fluid>
                <Card.Content header="AÇIKLAMA" />
                <Card.Content>
                    {jobAd.description}
                </Card.Content>
            </Card>
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Table celled stackable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>İŞ VEREN</Table.HeaderCell>
                                    <Table.HeaderCell>BİLGİLER</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row textAlign={"left"}>
                                    <Table.Cell>
                                        <Header as="h4" image>
                                            <Header.Content style={{ marginLeft: '0.7em' }}>
                                                ŞİRKET ADI :
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell><p style={{ marginLeft: '0.7em' }}>{jobAd.employer?.companyName}</p></Table.Cell>
                                </Table.Row>

                                <Table.Row textAlign={"left"}>
                                    <Table.Cell>
                                        <Header as="h4" image>
                                            <Header.Content style={{ marginLeft: '0.7em' }}>
                                                E-MAİL :
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell><p style={{ marginLeft: '0.7em' }}>{jobAd.employer?.email}</p></Table.Cell>
                                </Table.Row>

                                <Table.Row textAlign={"left"}>
                                    <Table.Cell>
                                        <Header as="h4" image>
                                            <Header.Content style={{ marginLeft: '0.7em' }}>
                                                TELEFON :
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell><p style={{ marginLeft: '0.7em' }}>{jobAd.employer?.phoneNumber}</p></Table.Cell>
                                </Table.Row>

                                <Table.Row textAlign={"left"}>
                                    <Table.Cell>
                                        <Header as="h4" image>
                                            <Header.Content style={{ marginLeft: '0.7em' }}>
                                                WEB SİTESİ :
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell><p style={{ marginLeft: '0.7em' }}>{jobAd.employer?.webSite}</p></Table.Cell>
                                </Table.Row>

                                <Table.Row textAlign={"left"}>
                                    <Table.Cell>
                                        <Header as="h4" image>
                                            <Header.Content style={{ marginLeft: '0.7em' }}>
                                                DETAY :
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button color='blue' style={{ borderRadius: '25px', marginLeft: '0.7em' }} animated as={Link} to={`/employers/${jobAd.employer?.id}`}>
                                            <Button.Content visible>GİT</Button.Content>
                                            <Button.Content hidden>
                                                <Icon name="arrow right" />
                                            </Button.Content>
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                        {authItem[0].loggedIn && authItem[0].user.userType === 1 &&
                            <Button fluid color={favorites.includes(jobAd.id) ? "red" : "green"} onClick={() => handleAddFavorites(jobAd.id)}>
                                <Icon name={favorites.includes(jobAd.id) ? "heart" : "heart outline"} />{favorites.includes(jobAd.id) ? "İlan Favorilerinizde" : "İlanı Favorilerine Ekle"}
                            </Button>
                        }
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Table celled fixed singleLine>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>İŞ İLANI</Table.HeaderCell>
                                    <Table.HeaderCell>DETAY</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: 'bold' }}>POZİSYON :</Table.Cell>
                                    <Table.Cell>{jobAd.jobPosition?.name}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: 'bold' }}>ŞEHİR :</Table.Cell>
                                    <Table.Cell>{jobAd.city?.name}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: 'bold' }}>ÇALIŞMA YERİ :</Table.Cell>
                                    <Table.Cell>{jobAd.workPlace?.name}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: 'bold' }}>ÇALIŞMA ZAMANI :</Table.Cell>
                                    <Table.Cell>{jobAd.workTime?.name}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: 'bold' }}>MİNİMUM MAAŞ :</Table.Cell>
                                    <Table.Cell>{jobAd.minSalary}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: 'bold' }}>MAKSİMUM MAAŞ :</Table.Cell>
                                    <Table.Cell>{jobAd.maxSalary}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: 'bold' }}>AÇIK POZİSYONLAR :</Table.Cell>
                                    <Table.Cell>{jobAd.openPositions}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: 'bold' }}>YAYINLANMA TARİHİ :</Table.Cell>
                                    <Table.Cell>{jobAd.createDate}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell style={{ fontWeight: 'bold' }}>SON BAŞVURU TARİHİ :</Table.Cell>
                                    <Table.Cell>{jobAd.lastDate}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>


        </div>
    );
}

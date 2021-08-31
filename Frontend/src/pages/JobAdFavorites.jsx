import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card, Table, Button } from 'semantic-ui-react'
import FavoriteService from '../services/FavoriteService';

export default function JobAdFavorites() {

    const { authItem } = useSelector(state => state.auth)

    let [favoriteAds, setFavoriteAds] = useState([]);

    let favoriteService = new FavoriteService();
    useEffect(() => {
        let favoriteService = new FavoriteService();
        favoriteService.getByCandidateId(authItem[0].user.id).then((result) => {
            setFavoriteAds(result.data.data);
        })
    }, [authItem])

    const handleRemoveFavorite = (favoriteId) => {
        favoriteService.removeFavorite(favoriteId).then((result) => {
            setFavoriteAds(favoriteAds.filter((favoriAd) => favoriAd.id !== favoriteId))
            toast.success(result.data.message)
        }).catch((result) => {
            toast.error(result.response.data.message)
        })
    }

    return (
        <div>
            <Card fluid>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ŞİRKET ADI</Table.HeaderCell>
                            <Table.HeaderCell>POZİSYON</Table.HeaderCell>
                            <Table.HeaderCell>ŞEHİR</Table.HeaderCell>
                            <Table.HeaderCell>MAAŞ ARALIĞI</Table.HeaderCell>
                            <Table.HeaderCell>ÇALIŞMA ZAMANI</Table.HeaderCell>
                            <Table.HeaderCell>ÇALIŞMA YERİ</Table.HeaderCell>
                            <Table.HeaderCell>SON TARİH</Table.HeaderCell>
                            <Table.HeaderCell>DETAY</Table.HeaderCell>
                            <Table.HeaderCell>SİL</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {favoriteAds?.map((favoriteAd) => (
                            <Table.Row key={favoriteAd.id}>
                                <Table.Cell>{favoriteAd.jobAd.employer.companyName}</Table.Cell>
                                <Table.Cell>{favoriteAd.jobAd.jobPosition.name}</Table.Cell>
                                <Table.Cell>{favoriteAd.jobAd.city.name}</Table.Cell>
                                <Table.Cell>{favoriteAd.jobAd.minSalary}₺ - {favoriteAd.jobAd.maxSalary}₺</Table.Cell>
                                <Table.Cell>{favoriteAd.jobAd.workTime.name}</Table.Cell>
                                <Table.Cell>{favoriteAd.jobAd.workPlace.name}</Table.Cell>
                                <Table.Cell>
                                    {(
                                        (new Date(favoriteAd.jobAd.lastDate).getTime() -
                                            new Date(Date.now()).getTime()) /
                                        86400000
                                    )
                                        .toString()
                                        .split(".", 1)}{" "}
                                    gün
                                </Table.Cell>
                                <Table.Cell>
                                    <Button as={Link} to={`/jobads/${favoriteAd.jobAd.id}`}
                                        content="GİT"
                                        icon="right arrow"
                                        labelPosition="right"
                                        style={{ backgroundColor: 'skyblue', color: 'black', borderRadius: '25px' }}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Button
                                        icon="x"
                                        color={"red"}
                                        circular
                                        onClick={() => handleRemoveFavorite(favoriteAd.id)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Card>
        </div>
    )
}

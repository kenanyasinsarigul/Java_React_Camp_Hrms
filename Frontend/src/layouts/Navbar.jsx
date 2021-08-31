import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Button, Menu, Icon } from 'semantic-ui-react';
import "../App.css";
import SingedIn from "./sign/SignedIn";
import SingedOut from "./sign/SignedOut";

export default function Navi() {

    const { authItem } = useSelector(state => state.auth)

    return (
        <div>
            <Menu stackable>
                <Container>
                    <Menu.Item style={{ fontWeight: 'bold' }} name="ANA SAYFA" as={Link} to={"/"} />
                    <Menu.Item style={{ fontWeight: 'bold' }} name="İLANLAR" as={Link} to={"/jobads"} />
                    <Menu.Item style={{ fontWeight: 'bold' }} name="İŞ VERENLER" as={Link} to={"/employers"} />
                    {/* <Menu.Item style={{ fontWeight: 'bold' }} name="KULLANICILAR" as={Link} to={"/candidates"} /> */}
                    <Menu.Item style={{ fontWeight: 'bold' }} name="CVLER" as={Link} to={"/cvs"} />

                    <Menu.Menu position="right" style={{ margin: '0.5em' }}>
                        {authItem[0].loggedIn && authItem[0].user.userType === 2 && <Button primary style={{ lineHeight: "20px", borderRadius: '25px' }} as={Link} to={"/jobAdCreate"}>
                            <span>YENİ İLAN + </span>
                        </Button>}
                        {authItem[0].loggedIn && authItem[0].user.userType === 1 && <Button color="red" as={Link} to={`/jobAdFavorites`} style={{ lineHeight: "20px", borderRadius: '25px' }}>
                            <Icon name='heart' />
                            Favori İlanlar
                        </Button>}

                        {authItem[0].loggedIn ? <SingedIn /> : <SingedOut />}
                    </Menu.Menu>
                </Container>
            </Menu>
        </div>
    );
}

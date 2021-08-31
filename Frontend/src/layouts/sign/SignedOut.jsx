import React from 'react'
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react';

export default function SingedOut() {
    return (
        <div>
            <Button.Group>
                <Button color='blue' as={Link} to={"/login"}>GİRİŞ YAP</Button>
                <Button.Or text="<->" />
                <Button positive as={Link} to={"/register"}>KAYDOL</Button>
            </Button.Group>
        </div>
    )
}
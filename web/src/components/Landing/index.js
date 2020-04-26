import React, { Component } from 'react';
import Page from '../Core/Page';
import Welcome from './Sections/Welcome';

export default function Landing() {
    // const classes = useStyles()
    return (
        <Page fixed hide>
        <Welcome />
        </Page>
    );
}
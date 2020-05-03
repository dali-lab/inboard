import React, { Component } from 'react';
import Page from '../Core/Page';
import Welcome from './Sections/Welcome';

export default function Landing() {
    return (
        <Page fixed hide>
            <Welcome />
        </Page>
    );
}

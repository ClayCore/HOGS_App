import { Route, Switch } from 'react-router-dom';

import { $ } from '../utils';
import Container from './components/layout/Display/Container';
import { Homepage } from './pages';
import React from 'react';

type Props = Record<string, never>;
type State = Record<string, never>;

export default class App extends React.Component<Props, State> {
    private LOADER_TIMEOUT;

    constructor(props: Props) {
        super(props);

        // 2 seconds of padding for all the DOM to load
        this.LOADER_TIMEOUT = 2000;
    }

    resolveLoader(): Promise<any> {
        return new Promise((resolve) => setTimeout(resolve, this.LOADER_TIMEOUT));
    }

    componentDidMount() {
        this.resolveLoader().then(() => {
            const loader = $('#loader-container');
            if (loader) {
                loader.classList.add('loaded');

                setTimeout(() => {
                    loader.outerHTML = '';
                }, this.LOADER_TIMEOUT);
            }
        });
    }

    render(): React.ReactElement<any> {
        return (
            <Container>
                <Switch>
                    <Route exact path="/" render={(props) => <Homepage {...props} />} />
                </Switch>
            </Container>
        );
    }
}

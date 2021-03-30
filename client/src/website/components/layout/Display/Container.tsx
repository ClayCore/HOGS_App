import Footer from '../Footer';
import React from 'react';
import Topbar from '../Topbar';

type Props = {
    children?: React.ReactElement<any>;
};
type State = Record<string, never>;

export default class Container extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    render(): React.ReactElement<any> {
        return (
            <main id="container">
                <div id="wrapper">
                    <Topbar />
                    {this.props.children}
                    <Footer />
                </div>
            </main>
        );
    }
}

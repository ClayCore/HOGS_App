import React from 'react';

type Props = Record<string, unknown>;
type State = Record<string, never>;

export default class Home extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    render(): React.ReactElement<any> {
        return (
            <div id="page">
                <h1>Homepage</h1>
            </div>
        );
    }
}

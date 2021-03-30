import React from 'react';

type Props = Record<string, never>;
type State = Record<string, never>;

export default class Footer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    render(): React.ReactElement<any> {
        return (
            <footer>
                <section id="trademark">Claymore @ 2020 All Rights Reserved.</section>
            </footer>
        );
    }
}

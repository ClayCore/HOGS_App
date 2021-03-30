import React from 'react';

type Props = {
    icon?: string;
};
type State = Record<string, never>;

export default class Icon extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    render(): React.ReactElement<any> {
        const { icon } = this.props;

        if (icon) {
            return React.createElement('ion-icon', { icon: icon });
        } else {
            console.error('Icon missing or non-existant');
            return <div></div>;
        }
    }
}

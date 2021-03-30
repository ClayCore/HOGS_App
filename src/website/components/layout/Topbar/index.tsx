import { Navigation as Links } from '../Links';
import React from 'react';

type Props = Record<string, never>;
type State = {
    is_scrolled: boolean;
};

export default class Topbar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            is_scrolled: false,
        };
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll();
    };

    handleScroll = () => {
        const top = document.body.scrollTop || document.documentElement.scrollTop;

        if (top > 100) {
            this.setState({ is_scrolled: true });
        } else {
            this.setState({ is_scrolled: false });
        }
    };

    render(): React.ReactElement<any> {
        const { is_scrolled } = this.state;
        const className = is_scrolled ? 'is-scrolled' : '';

        return (
            <div id="topbar" className={className}>
                <div id="logo">
                    <span>
                        Hightower <br />
                        OGs
                    </span>
                </div>
                <div className="separator"></div>
                <Links />
            </div>
        );
    }
}

import { Link as BrowserLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Icon from './Icon';
import React from 'react';
import { getUid } from '#package/client/utils';

// Utility link class
// NOTE: don't use directly
type LinkProps = {
    target: string;
    hashed: boolean;
    image?: string;
    label?: string;
    icon?: string;
    desc?: string;
};
type LinkState = Record<string, never>;

class Link extends React.Component<LinkProps, LinkState> {
    constructor(props: LinkProps) {
        super(props);

        this.state = {};
    }

    render(): React.ReactElement<any> {
        const { icon, target, label, hashed, image } = this.props;

        if (hashed) {
            if (!icon && label) {
                return (
                    <HashLink to={target} className="link label">
                        <span>{label}</span>
                    </HashLink>
                );
            }

            if (!label && icon) {
                return (
                    <HashLink to={target} className="link icon">
                        <Icon icon={icon} />
                    </HashLink>
                );
            }

            if (image) {
                return (
                    <HashLink to={target} className="link image">
                        <span>{label}</span>
                        <img src={image} />
                    </HashLink>
                );
            }

            return (
                <HashLink to={target} className="link icon label">
                    <Icon icon={icon} />
                    <span>{label}</span>
                </HashLink>
            );
        } else {
            if (!icon && label) {
                return (
                    <BrowserLink to={target} className="link label">
                        <span>{label}</span>
                    </BrowserLink>
                );
            }

            if (!label && icon) {
                return (
                    <BrowserLink to={target} className="link icon">
                        <Icon icon={icon} />
                    </BrowserLink>
                );
            }

            if (image) {
                return (
                    <BrowserLink to={target} className="link image">
                        <span>{label}</span>
                        <img src={image} />
                    </BrowserLink>
                );
            }

            return (
                <BrowserLink to={target} className="link icon label">
                    <Icon icon={icon} />
                    <span>{label}</span>
                </BrowserLink>
            );
        }
    }
}

export const generateLinks = (link_props: Array<LinkProps>): Array<React.ReactNode> => {
    const links: Array<React.ReactNode> = [];

    link_props.forEach((link_prop: LinkProps) => {
        let label: string | undefined = undefined;
        if (link_prop.label) {
            label = link_prop.label;
        }

        let icon_tag = undefined;
        if (link_prop.icon) {
            icon_tag = link_prop.icon;
        }

        if (link_prop.hashed) {
            const link = React.createElement(Link, {
                target: link_prop.target,
                hashed: true,
                label: label,
                icon: icon_tag,
                key: getUid(16),
            });

            links.push(link);
        } else {
            const link = React.createElement(Link, {
                target: link_prop.target,
                hashed: false,
                label: label,
                icon: icon_tag,
                key: getUid(16),
            });

            links.push(link);
        }
    });

    return links;
};

// Navigation for the topbar
type NavigationProps = Record<string, never>;
type NavigationState = Record<string, never>;

export class Navigation extends React.Component<NavigationProps, NavigationState> {
    constructor(props: NavigationProps) {
        super(props);

        this.state = {};
    }

    getNav = (): Array<React.ReactNode> => {
        const link_props: Array<LinkProps> = [
            { target: 'home', label: 'Home', hashed: false },
            { target: 'ban_appeal', label: 'Ban Appeal', hashed: false },
            { target: 'feedback', label: 'Feedback', hashed: false },
            { target: 'contact', label: 'Contact', hashed: false },
        ];

        const links = generateLinks(link_props);

        return links;
    };

    render(): React.ReactElement<any> {
        return <nav>{this.getNav()}</nav>;
    }
}

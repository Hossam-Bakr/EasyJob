import React from 'react';
import Badge from 'react-bootstrap/esm/Badge';
import styles from './MainBadge.module.css';

const MainBadge = ({text}) => {
    return (
        <Badge className={styles.badgeStyle} bg={''} text="dark">
            <span>{text}</span>
        </Badge>
    );
}

export default MainBadge;

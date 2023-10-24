import React from 'react';
import styles from "./SubNavbar.module.css";
import { NavLink } from 'react-router-dom';

const SecondaryNavbar = ({ firstTab, secondTab, thirdTab, fourthTab }) => {

    return (
        <nav>
            <ul className={`${styles.mainStyle} d-flex justify-content-start align-items-center `}>
                <li>
                    <NavLink
                        className="text-black"
                        to={"/"}
                        end
                    >
                        {firstTab}
                    </NavLink></li>
                <li className='ms-5'><NavLink
                    className="text-black"
                    to={"/"}
                    end
                >
                    {secondTab}
                </NavLink></li>
                {thirdTab && <li className='ms-5'><NavLink
                    className="text-black"
                    to={"/"}
                    end
                >
                    {thirdTab}
                </NavLink></li>}
                {fourthTab && <li className='ms-5'><NavLink
                    className="text-black"
                    to={"/"}
                    end
                >
                    {fourthTab}
                </NavLink></li>}
            </ul>
        </nav>
    );
}

export default SecondaryNavbar;

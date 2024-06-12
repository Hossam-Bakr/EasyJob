import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./CompanyPricing.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionMainTitle from "../../Components/Ui/SectionMainTitle";
import {
  faCrown,
  faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";
import MainBtnThree from "../../Components/Ui/MainBtnThree";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { companyActions } from "../../Store/companyNav-slice";
import { useDispatch } from "react-redux";
import {
  goldenPackagePerMonth,
  platinumPackagePerMonth,
  silverPackagePerMonth,
} from "../../Components/logic/Logic";

const CompanyPricing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(
      companyActions.changeNavState({
        changeCompany: false,
        changeNav: true,
      })
    );
    return () => {
      dispatch(
        companyActions.changeNavState({
          changeCompany: false,
          changeNav: false,
        })
      );
    };
  }, [dispatch]);

  return (
    <Container fluid="xl" className="my-5">
      <SectionMainTitle title="PRICING PLANS" />
      <Tabs
        defaultActiveKey="three"
        className={`${styles.tabs_container} mb-3`}
        fill
      >
        <Tab eventKey="month" title="Month">
          <Row className="justify-content-center">
            <Col sm={6} md={4} className="my-5">
              <div className={styles.package}>
                <div className={styles.package_type}>
                  <h3>Silver</h3>
                </div>
                <div className={styles.price}>
                  <span className={styles.price_number}>
                    1,500 <span className={styles.price_type}>EGP/month</span>
                  </span>
                  <span className={styles.del_price}>
                    <del>1,800</del>{" "}
                    <span className={styles.price_type}>EGP/month</span>
                  </span>
                </div>
                <div className={styles.features}>
                  <ul>
                    {silverPackagePerMonth.map((feature) => (
                      <li>
                        <FontAwesomeIcon
                          className={styles.list_icon}
                          icon={faSquareArrowUpRight}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center pt-4 pb-2">
                  <MainBtnThree type="white" text="Order Package" />
                </div>
              </div>
            </Col>
            <Col sm={6} md={4} className="my-5">
              <div className={`${styles.package} ${styles.golden_package}`}>
                <div className={styles.package_type}>
                  <h3>
                    <FontAwesomeIcon
                      className={styles.crown_icon}
                      icon={faCrown}
                    />{" "}
                    Golden
                  </h3>
                </div>
                <div className={styles.price}>
                  <span className={styles.price_number}>
                    2,500 <span className={styles.price_type}>EGP/month</span>
                  </span>
                  <span className={styles.del_price}>
                    <del>3000</del>{" "}
                    <span className={styles.price_type}>EGP/month</span>
                  </span>
                </div>{" "}
                <div className={styles.features}>
                  <ul>
                    {goldenPackagePerMonth.map((feature) => (
                      <li>
                        <FontAwesomeIcon
                          className={styles.list_icon}
                          icon={faSquareArrowUpRight}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center pt-4 pb-2">
                  <MainBtnThree text="Order Package" />
                </div>
              </div>
            </Col>
            <Col sm={6} md={4} className="my-5">
              <div className={styles.package}>
                <div className={styles.package_type}>
                  <h3>Platenium</h3>
                </div>
                <div className={styles.price}>
                  <span className={styles.price_number}>
                    4,500 <span className={styles.price_type}>EGP/month</span>
                  </span>
                  <span className={styles.del_price}>
                    <del>5,000</del>{" "}
                    <span className={styles.price_type}>EGP/month</span>
                  </span>
                </div>
                <div className={styles.features}>
                  <ul>
                    {platinumPackagePerMonth.map((feature) => (
                      <li>
                        <FontAwesomeIcon
                          className={styles.list_icon}
                          icon={faSquareArrowUpRight}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center pt-4 pb-2">
                  <MainBtnThree type="white" text="Order Package" />
                </div>
              </div>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="three" title=" 3 Months">
          <Row className="justify-content-center">
            <Col sm={6} md={4} className="my-5">
              <div className={styles.package}>
                <div className={styles.package_type}>
                  <h3>Silver</h3>
                </div>
                <div className={styles.price}>
                  <span className={styles.price_number}>
                    4,000{" "}
                    <span className={styles.price_type}>EGP/ 3 months</span>
                  </span>
                  <span className={styles.del_price}>
                    <del>4,800</del>{" "}
                    <span className={styles.price_type}>EGP/ 3 months</span>
                  </span>
                </div>
                <div className={styles.features}>
                  <ul>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Post 9 jobs ads
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      100 invitiation
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Unlimited search in Easy job database
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      1000 Unlocks
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Connecting with 150 candidates of our choice
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Performing filtering on candidates
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      <del>Display your brand logo</del>
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Two Admins
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Silver Support
                    </li>
                  </ul>
                </div>
                <div className="text-center pt-4 pb-2">
                  <MainBtnThree type="white" text="Order Package" />
                </div>
              </div>
            </Col>
            <Col sm={6} md={4} className="my-5">
              <div className={`${styles.package} ${styles.golden_package}`}>
                <div className={styles.package_type}>
                  <h3>
                    <FontAwesomeIcon
                      className={styles.crown_icon}
                      icon={faCrown}
                    />{" "}
                    Golden
                  </h3>
                </div>
                <div className={styles.price}>
                  <span className={styles.price_number}>
                    5,000{" "}
                    <span className={styles.price_type}>EGP/ 3 months</span>
                  </span>
                  <span className={styles.del_price}>
                    <del>5,500</del>{" "}
                    <span className={styles.price_type}>EGP/ 3 months</span>
                  </span>
                </div>{" "}
                <div className={styles.features}>
                  <ul>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Post 15 jobs ads
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      200 invitiation
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Unlimited search in Easy job database
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      2000 Unlocks
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Connecting with 300 candidates of our choice
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Performing filtering on candidates
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Display your brand on our main pages
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      five Admins
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Golden Support
                    </li>
                  </ul>
                </div>
                <div className="text-center pt-4 pb-2">
                  <MainBtnThree text="Order Package" />
                </div>
              </div>
            </Col>
            <Col sm={6} md={4} className="my-5">
              <div className={styles.package}>
                <div className={styles.package_type}>
                  <h3>Platenium</h3>
                </div>
                <div className={styles.price}>
                  <span className={styles.price_number}>
                    7,000{" "}
                    <span className={styles.price_type}>EGP/ 3 months</span>
                  </span>
                  <span className={styles.del_price}>
                    <del>7,800</del>{" "}
                    <span className={styles.price_type}>EGP/ 3 months</span>
                  </span>
                </div>
                <div className={styles.features}>
                  <ul>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Post 60 jobs ads
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      300 invitiation
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Unlimited search in Easy job database
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      3000 Unlocks
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Connecting with 900 candidates of our choice
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Performing filtering on candidates
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Display your brand on top of our main pages
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Unlimited Admins
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Premium support
                    </li>
                  </ul>
                </div>
                <div className="text-center pt-4 pb-2">
                  <MainBtnThree type="white" text="Order Package" />
                </div>
              </div>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="year" title="year">
          <Row className="justify-content-center">
            <Col sm={6} md={4} className="my-5">
              <div className={styles.package}>
                <div className={styles.package_type}>
                  <h3>Silver</h3>
                </div>
                <div className={styles.price}>
                  <span className={styles.price_number}>
                    9,000 <span className={styles.price_type}>EGP/year</span>
                  </span>
                  <span className={styles.del_price}>
                    <del>1,200</del>{" "}
                    <span className={styles.price_type}>EGP/year</span>
                  </span>
                </div>
                <div className={styles.features}>
                  <ul>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Post 9 jobs ads
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      100 invitiation
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Unlimited search in Easy job database
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      5000 Unlocks
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Connecting with 150 candidates of our choice
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Performing filtering on candidates
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      <del>Display your brand logo</del>
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Two Admins
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Silver Support
                    </li>
                  </ul>
                </div>
                <div className="text-center pt-4 pb-2">
                  <MainBtnThree type="white" text="Order Package" />
                </div>
              </div>
            </Col>
            <Col sm={6} md={4} className="my-5">
              <div className={`${styles.package} ${styles.golden_package}`}>
                <div className={styles.package_type}>
                  <h3>
                    <FontAwesomeIcon
                      className={styles.crown_icon}
                      icon={faCrown}
                    />{" "}
                    Golden
                  </h3>
                </div>
                <div className={styles.price}>
                  <span className={styles.price_number}>
                    14,000 <span className={styles.price_type}>EGP/year</span>
                  </span>
                  <span className={styles.del_price}>
                    <del>20,000</del>{" "}
                    <span className={styles.price_type}>EGP/year</span>
                  </span>
                </div>{" "}
                <div className={styles.features}>
                  <ul>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Post 15 jobs ads
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      200 invitiation
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Unlimited search in Easy job database
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      6000 Unlocks
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Connecting with 300 candidates of our choice
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Performing filtering on candidates
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Display your brand on our main pages
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      five Admins
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Golden Support
                    </li>
                  </ul>
                </div>
                <div className="text-center pt-4 pb-2">
                  <MainBtnThree text="Order Package" />
                </div>
              </div>
            </Col>
            <Col sm={6} md={4} className="my-5">
              <div className={styles.package}>
                <div className={styles.package_type}>
                  <h3>Platenium</h3>
                </div>
                <div className={styles.price}>
                  <span className={styles.price_number}>
                    24,000 <span className={styles.price_type}>EGP/year</span>
                  </span>
                  <span className={styles.del_price}>
                    <del>28,000</del>{" "}
                    <span className={styles.price_type}>EGP/year</span>
                  </span>
                </div>
                <div className={styles.features}>
                  <ul>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Post 60 jobs ads
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      300 invitiation
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Unlimited search in Easy job database
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      7000 Unlocks
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Connecting with 900 candidates of our choice
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Performing filtering on candidates
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Display your brand on top of our main pages
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Unlimited Admins
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className={styles.list_icon}
                        icon={faSquareArrowUpRight}
                      />
                      Premium support
                    </li>
                  </ul>
                </div>
                <div className="text-center pt-4 pb-2">
                  <MainBtnThree type="white" text="Order Package" />
                </div>
              </div>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default CompanyPricing;

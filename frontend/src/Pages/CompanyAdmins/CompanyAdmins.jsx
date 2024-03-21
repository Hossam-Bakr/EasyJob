import React from "react";
import SectionMainTitle from "../../Components/Ui/SectionMainTitle";
import styles from "./CompanyAdmins.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUserGear } from "@fortawesome/free-solid-svg-icons";
import MainBtnThree from "./../../Components/Ui/MainBtnThree";

const CompanyAdmins = () => {
  return (
    <div className={styles.admins_container}>
      <SectionMainTitle title="Manage Account Users" />
      <table className={styles.users_table}>
        <thead className={styles.thead}>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Role</th>
            <th>Active</th>
            <th>Search</th>
            <th>Unlocks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bassam Hafez</td>
            <td>Manager</td>
            <td>Founder</td>
            <td>online</td>
            <td>6</td>
            <td>2</td>
            <td>
              <button className={styles.change_owner}>change Owner</button>
            </td>
          </tr>
          <tr>
            <td>Ammar Yasser</td>
            <td>Team Leader</td>
            <td>Admin</td>
            <td>3d</td>
            <td>10</td>
            <td>7</td>
            <td>
              <div className="d-flex align-items-center justify-content-center">
                <FontAwesomeIcon
                  className={styles.delete_btn}
                  title="remove user"
                  icon={faTrash}
                />
                <FontAwesomeIcon
                  className={styles.view_btn}
                  title="veiw activity"
                  icon={faUserGear}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Begad Elsayed</td>
            <td>Frontend Developer</td>
            <td>User</td>
            <td>1h</td>
            <td>2</td>
            <td>1</td>
            <td>
              {" "}
              <div className="d-flex align-items-center justify-content-center">
                <FontAwesomeIcon
                  className={styles.delete_btn}
                  title="remove user"
                  icon={faTrash}
                />
                <FontAwesomeIcon
                  className={styles.view_btn}
                  title="veiw activity"
                  icon={faUserGear}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Hossam Hassan</td>
            <td>Backend Developer</td>
            <td>User</td>
            <td>4m</td>
            <td>12</td>
            <td>5</td>
            <td>
              {" "}
              <div className="d-flex align-items-center justify-content-center">
                <FontAwesomeIcon
                  className={styles.delete_btn}
                  title="remove user"
                  icon={faTrash}
                />
                <FontAwesomeIcon
                  className={styles.view_btn}
                  title="veiw activity"
                  icon={faUserGear}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex justify-content-end align-items-center my-5">
        <div className="mx-4">
          <MainBtnThree type="white" text="Add User" />
        </div>
        <div className="mx-4">
          <MainBtnThree text="Save Changes" />
        </div>
      </div>
    </div>
  );
};

export default CompanyAdmins;

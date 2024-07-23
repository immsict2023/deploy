import React, { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../AuthContext";

function RegNavbar() {

  const { data } = useAuth();

  return (
    <>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        expand="lg"
        className="bg-body-tertiary"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto me-auto">
              {
                data.RoleID === 'STF_CAS' ? 
                <>
                  <NavLink className={'navLink small'} to="enlistment">ENLISTMENT</NavLink>
                  <NavLink className={'navLink'} to="student">STUDENT</NavLink>
                  <NavLink className={'navLink'} to="reports">REPORTS</NavLink>
                  {
                    /*
                      <NavLink className={'navLink'} to="user">USER</NavLink>
                    */
                  }
                </>
                :
                <>
                  <NavLink className={'navLink small'} to="enlistment">ENLISTMENT</NavLink>
                  <NavLink className={'navLink'} to="student">STUDENT</NavLink>
                  <NavLink className={'navLink'} to="personnel">PERSONNEL</NavLink>
                  <NavLink className={'navLink'} to="block-schedule">BLOCK SCHEDULE</NavLink>
                  <NavLink className={'navLink'} to="classroom">CLASSROOM</NavLink>
                  <NavLink className={'navLink'} to="academicstructure">ACADEMIC STRUCTURE</NavLink>
                  <NavLink className={'navLink'} to="reports">REPORTS</NavLink>
                  {
                    /* 
                      <NavLink className={'navLink'} to="user">USER</NavLink>
                    */
                  }
                  <NavLink className={'navLink'} to="administrator">ADMINISTRATOR</NavLink>
                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default RegNavbar;

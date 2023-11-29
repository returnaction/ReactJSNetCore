import React, { Component } from "react";
import { variables } from "./Variables.js";

export class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departments: [],
      employees: [],
      modalTitle: "",
      employeeId: 0,
      employeeName: "",
      department: "",
      dateOfJoining: "",
      photoFileName: "anonymous.png",
      photoPath: variables.PHOTO_URL,
    };
  }

  refreshList() {
    fetch(variables.API_URL + "employee")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ employees: data });
      });

    fetch(variables.API_URL + "department")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ departments: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeEmployeeName = (e) => {
    this.setState({ employeeName: e.target.value });
  };
  changeDepartment = (e) => {
    this.setState({ department: e.target.value });
  };
  changeDateOfJoining = (e) => {
    this.setState({ dateOfJoining: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Add Employee",
      employeeId: 0,
      employeeName: "",
      department: "",
      dateOfJoining: "",
      photoFileName: "anonymous.png",
    });
  }
  editClick(emp) {
    console.log(emp);
    this.setState({
      modalTitle: "Edit Employee",
      employeeId: emp.employeeId,
      employeeName: emp.employeeName,
      department: emp.department,
      dateOfJoining: emp.dateOfJoining,
      photoFileName: emp.photoFileName,
    });
  }

  createClick() {
    fetch(variables.API_URL + "employee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeName: this.state.employeeName,
        department: this.state.department,
        dateOfJoining: this.state.dateOfJoining,
        photoFileName: this.state.photoFileName,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  updateClick(employeeId) {
    fetch(variables.API_URL + "employee/" + employeeId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId: this.state.employeeId,
        employeeName: this.state.employeeName,
        department: this.state.department,
        dateOfJoining: this.state.dateOfJoining,
        photoFileName: this.state.photoFileName,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  deleteClick(id) {
    if (window.confirm("Are you sure?")) {
      fetch(variables.API_URL + "employee/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }

  imageUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    fetch(variables.API_URL + "employee/savefile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ photoFileName: data });
      });
  };

  render() {
    const {
      departments,
      employees,
      modalTitle,
      employeeId,
      employeeName,
      department,
      dateOfJoining,
      photoPath,
      photoFileName,
    } = this.state;

    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}
        >
          Add Employee
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Department</th>
              <th>Hired</th>
              {/* <th>Options</th> */}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.employeeId}>
                <td>{emp.employeeId}</td>
                <td>{emp.employeeName}</td>
                <td>{emp.department}</td>
                <td>{emp.dateOfJoining}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(emp)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(emp.employeeId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                  <div className="p-2 w-50 bd-highlight">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Name</span>
                      <input
                        type="text"
                        className="form-control"
                        value={employeeName}
                        onChange={this.changeEmployeeName}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Department</span>
                      <select
                        className="form-select"
                        onChange={this.changeDepartment}
                        value={department}
                      >
                        {departments.map((dep) => (
                          <option key={dep.departmentId}>
                            {dep.departmentName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Hired</span>
                      <input
                        type="date"
                        className="form-control"
                        value={dateOfJoining}
                        onChange={this.changeDateOfJoining}
                      />
                    </div>
                  </div>
                  <div className="p-2 w-50 bd-highlight">
                    <img
                      width="250px"
                      height="250px"
                      src={photoPath + photoFileName}
                    />
                    <input
                      className="m-2"
                      type="file"
                      onChange={this.imageUpload}
                    />
                  </div>
                </div>

                {employeeId === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}

                {employeeId !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.updateClick()}
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

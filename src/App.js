import React, { Component } from "react";
import { Alert, Button, Badge } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import Persons from "./components/Person/Persons";

class App extends Component {
    state = {
        persons: [],
        person: "",
        showPersons: true
    };

    handleShowPerson = () => {
        this.setState({ showPersons: !this.state.showPersons });
    };

    handleDeletePerson = id => {
        //filter
        const persons = [...this.state.persons];
        const filteredPersons = persons.filter(p => p.id !== id); //! = =
        this.setState({ persons: filteredPersons });

        const personIndex = persons.findIndex(p => p.id === id);
        const person = persons[personIndex];

        toast.error(`${person.fullname} با موفقیت حذف شد`, {
            position: "top-right",
            closeOnClick: true
        });
    };

    handleNameChange = (event, id) => {
        const { persons: allPersons } = this.state;

        const personIndex = allPersons.findIndex(p => p.id === id);
        const person = allPersons[personIndex];
        person.fullname = event.target.value;
        console.log(event);

        const persons = [...allPersons];

        persons[personIndex] = person;
        this.setState({ persons });
    };

    handleNewPerson = () => {
        const persons = [...this.state.persons];
        const person = {
            id: Math.floor(Math.random() * 1000),
            fullname: this.state.person
        };

        if (person.fullname !== "" && person.fullname !== " ") {
            persons.push(person);
            this.setState({ persons, person: "" });
           
            toast.success("شخصی با موفقیت اضافه شد.", {
                position: "bottom-right",
                closeButton: true,
                closeOnClick: true
            });
        }
    };

    setPerson = event => {
        this.setState({ person: event.target.value });
    };

    render() {
        const { persons, showPersons } = this.state;

        let person = null;

        let badgeStyle = "";

        if (persons.length >= 3) badgeStyle = "success";
        if (persons.length <= 2) badgeStyle = "warning";
        if (persons.length <= 1) badgeStyle = "danger";

        if (showPersons) {
            person = (
                <Persons
                    persons={persons}
                    personDelete={this.handleDeletePerson}
                    personChange={this.handleNameChange}
                />
            );
        }

        return (
            <div className="rtl text-center">
                <Alert variant="info">
                    <h2>مدیریت کننده اشخاص</h2>
                </Alert>
                <Alert variant="light">
                    تعداد اشخاص{" "}
                    <Badge pill variant={badgeStyle}>
                        {persons.length}
                    </Badge>{" "}
                    نفر می باشد
                </Alert>

                <div className="m-2 p-2">
                    <form
                        className="form-inline justify-content-center"
                        onSubmit={event => event.preventDefault()}
                    >
                        <div className="input-group w-25">
                            <input
                                type="text"
                                placeholder="اسم بهم بده"
                                className="form-control"
                                onChange={this.setPerson}
                                value={this.state.person}
                            />
                            <div className="input-group-prepend">
                                <Button
                                    type="submit"
                                    variant="success"
                                    size="sm"
                                    className="fa fa-plus-square"
                                    onClick={this.handleNewPerson}
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <Button
                    onClick={this.handleShowPerson}
                    variant={showPersons ? "info" : "danger"}
                >
                    نمایش اشخاص
                </Button>

                {person}
                <ToastContainer />
            </div>
        );
    }
}

export default App;

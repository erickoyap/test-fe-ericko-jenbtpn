import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ContactDelete from './ContactDelete';

class ContactList extends React.Component {

    constructor(){
        super();
        this.state = {
          results: []
        };
    }

    componentDidMount() {
        fetch("https://simple-contact-crud.herokuapp.com/contact")
            .then(results => {
                return results.json();
            }).then(data => {
                let results = data.data.map((row, index) => {
                    const urlGet = "/contact/update/" + row.id;

                    return (
                        <tr key={row.id}>
                            <td>{index + 1}</td>
                            <td>
                                <Link to={urlGet}>View / Update</Link><br/>
                                <ContactDelete dataId={row.id} />
                            </td>
                            <td>{row.id}</td>
                            <td>{row.firstName}</td>
                            <td>{row.lastName}</td>
                            <td>{row.age}</td>
                            <td><img src={row.photo} alt={row.firstName} style={{maxWidth:"200px"}} /></td>
                        </tr>
                    );
                });
                this.setState({results: results});
            });

    }

    render(){
        return (
            <div className="ContactList">
                <h3>Contact List</h3>
                <table style={{border: "1px"}}>
                    <thead>
                        <tr>
                            <td>No</td>
                            <td>Action</td>
                            <td>ID</td>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Age</td>
                            <td>Photo</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.results}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ContactList;


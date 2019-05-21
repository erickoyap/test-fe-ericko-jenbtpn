import React from 'react';

class ContactAdd extends React.Component {

    constructor(){
        super();
        this.state = {
            firstName: '',
            lastName: '',
            age: 0,
            photo: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        if (!event.target.checkValidity()) {
            return;
        }
        const jsonData = this.state;

        fetch('https://simple-contact-crud.herokuapp.com/contact', {
            header: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
            method: 'post',
            body: JSON.stringify(jsonData)
        }).then(result => {
            return result.json();
        }).then(output => {
            alert(output.message);
            this.setState({
                firstName: '',
                lastName: '',
                age: 0,
                photo: ''
            });
        });
    }

    render(){
        return (
            <div className="ContactAdd">
                <h3>Add New Contact</h3>
                <form method="POST" onSubmit={this.handleSubmit}>
                    <div>
                        <label>First Name </label>
                        <input type="text"
                               name="firstName"
                               value={this.state.firstName}
                               onChange={this.handleChange}
                               placeholder="First Name..."
                               required />
                    </div>
                    <div>
                        <label>Last Name </label>
                        <input type="text"
                               name="lastName"
                               value={this.state.lastName}
                               onChange={this.handleChange}
                               placeholder="Last Name..."
                               required />
                    </div>
                    <div>
                        <label>Age </label>
                        <input type="number"
                               name="age"
                               min="0"
                               value={this.state.age}
                               onChange={this.handleChange}
                               placeholder="Age..."
                               required />
                    </div>
                    <div>
                        <label>Photo </label>
                        <input type="text"
                               name="photo"
                               value={this.state.photo}
                               onChange={this.handleChange}
                               placeholder="Photo..."
                               required />
                    </div>
                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default ContactAdd;


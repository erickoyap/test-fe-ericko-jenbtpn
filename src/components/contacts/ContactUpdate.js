import React from 'react';

class ContactUpdate extends React.Component {

    constructor(id){
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

    componentDidMount(){
        fetch("https://simple-contact-crud.herokuapp.com/contact/" + this.props.match.params.id)
            .then(results => {
                return results.json();
            }).then(get => {
                this.setState({
                    firstName: get.data.firstName,
                    lastName: get.data.lastName,
                    age: get.data.age,
                    photo: get.data.photo
                });
            });
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

        fetch('https://simple-contact-crud.herokuapp.com/contact/' + this.props.match.params.id, {
            header: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
            method: 'PUT',
            body: JSON.stringify(jsonData)
        }).then(result => {
            return result.json();
        }).then(output => {
            alert(output.message);
            console.log(output);
            if (output.statusCode === 200) {
                this.setState({
                    firstName: output.data.firstName,
                    lastName: output.data.lastName,
                    age: output.data.age,
                    photo: output.data.photo
                });
            }
            else {
                // window.location.reload();
            }

        }).catch(err => {
            alert (err);
        });
    }

    render(){
        return (
            <div className="ContactUpdate">
                <h3>View / Update Contact</h3>
                <form method="PUT" onSubmit={this.handleSubmit}>
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
                        Update
                    </button>
                </form>
            </div>
        );
    }
}

export default ContactUpdate;


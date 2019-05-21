import React from 'react';

class ContactDelete extends React.Component {

    constructor(){
        super();

        this.confirmDelete = this.confirmDelete.bind(this);
    }

    confirmDelete(){
        fetch('https://simple-contact-crud.herokuapp.com/contact/' + this.props.dataId, {
                header: new Headers({
                    'Content-Type': 'application/json',
                }),
                method: 'DELETE',
                body: JSON.stringify({id: this.props.dataId})
            })
            .then(result => {
                return result.json();
            })
            .then(output => {
                alert(output.message);
            })
            .catch(error => {
                console.log(error);
                alert(error);
            })
            .finally(() => {
                window.location = "/contact/list";
            });
    }

    render(){
        // const urlDelete = "/contact/delete/" + this.props.dataId;
        return (
            <a href='#delete' onClick={this.confirmDelete}>Delete</a>
        );
    }
}

export default ContactDelete;


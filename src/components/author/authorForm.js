"use strict";

var React=require('react');

var AuthorForm=React.createClass({
    render:function(){
        return(
            <form>
                <h1>Manage Author</h1>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" name="firstName" className="form-control" placeholder="first name" ref="firstName"
                     value={this.props.author.firstName} onChange={this.props.onChange}/>
                <div className="input">{this.props.errors.firstName}</div>
                <br/>
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" name="lastName" className="form-control" placeholder="last name" ref="lastName" 
                    value={this.props.author.lastName} onChange={this.props.onChange}/>
                <div className="input">{this.props.errors.lastName}</div>
                <br/>
                <input type="submit" className="btn btn-default" value="save" onClick={this.props.onSave}/>
            </form>
        );
    }
});

module.exports=AuthorForm;
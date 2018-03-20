"use strict";

var React=require('react');
var AuthorAction=require('../../actions/authorAction');
var AuthorStore=require('../../stores/authorStore');
var AuthorList=require('./AuthorList');
var Link=require('react-router').Link;

var Authors=React.createClass({
    getInitialState:function(){
        return {
            authors:AuthorStore.getAllAuthors()
        };
    },
    render:function(){
        return(
            <div>
                <h1>Authors</h1>
                <Link to="addAuthor" className="btn btn-default">Add Author</Link>
                <AuthorList authors={this.state.authors}/>
            </div>
        );
    }
});

module.exports=Authors;
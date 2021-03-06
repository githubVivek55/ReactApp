"use strict";

var React=require('react');
var AuthorForm=require('./authorForm');
var AuthorAction=require('../../actions/authorAction');
var AuthorStore=require('../../stores/authorStore');
var Router=require('react-router');
var Toastr=require('toastr');

var ManageAuthorPage=React.createClass({
    mixins:[
        Router.Navigation
    ],
    getInitialState:function(){
        return{
            author:{id:'',firstName:'',lastName:''},
            errors:{}
        };
    },
    componentWillMount:function(){
        var authorId=this.props.params.id;
        if(authorId){
            this.setState({author:AuthorStore.getAuthorById(authorId)});
        }
    },
    authorFormIsValid:function(){
        var formIsValid=true;
        this.state.errors={};
        if(this.state.author.firstName.length <3){
            this.state.errors.firstName='First name must be atleast 3 characters.';
            formIsValid=false;
        }
        if(this.state.author.lastName.length <3){
            this.state.errors.lastName='last name must be atleast 3 characters.';
            formIsValid=false;
        }
        this.setState({errors:this.state.errors});
        return formIsValid;
    },    
    setAuthorState:function(event){
        var field=event.target.name;
        var value=event.target.value;
        this.state.author[field]=value;
        return this.setState({author:this.state.author});
    },
    saveAuthor:function(event){
        event.preventDefault();
        if(!this.authorFormIsValid()){
            return;
        }
        //AuthorApi.saveAuthor(this.state.author);
        AuthorAction.createAuthor(this.state.author);
        this.setState({dirty:false});
        Toastr.success('Author Saved.');
        this.transitionTo('authors');
    },
    render:function(){
        return(
            <AuthorForm author={this.state.author} 
                onChange={this.setAuthorState} 
                onSave={this.saveAuthor} 
                errors={this.state.errors}/>
        );
    }
});

module.exports=ManageAuthorPage;
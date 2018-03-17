"use strict";

var React=require('react');
var Router=require('react-router');
var NotFoundRoute=Router.NotFoundRoute;
var DefaultRoute=Router.DefaultRoute;
var Route=Router.Route;

var routes=(
    <Route name="App" path="/" handler={require('./components/App')}>
        <DefaultRoute handler={require('./components/homepage')}/>
        <Route name="authors" handler={require('./components/author/authorPage')}/>
        <Route name="manageAuthor" path="author/:id" handler={require('./components/author/manageAuthorPage')}/>
        <Route name="about" handler={require('./components/about/aboutPage')}/>
        <Route name="addAuthor" handler={require('./components/author/manageAuthorPage')}/>
        <NotFoundRoute handler={require('./components/pageNotFound')}/>
    </Route>
);

module.exports=routes;
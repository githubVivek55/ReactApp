"use strice";

var React=require('react');
var Link=require('react-router').Link;

var PageNotFound=React.createClass({
    render:function(){
        return(
            <div>
                <h1>Page Not Found</h1>
                <p>Whops ! there is nothing to see here</p>
                <p><Link to="App">Back to Home</Link></p>
            </div>
        );
    }
});

module.exports=PageNotFound;
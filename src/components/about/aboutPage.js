"use strict";

var React=require('react');

var About=React.createClass({
    statics:{
        willTransitionTo:function(trasition,parms,query,callback){
            if(!confirm('Are you sure ?')){
                tansition.about();
            }else{
                callback();
            }
        }
    },
    render:function(){
        return(
            <div>
                <h1>About</h1>
                <ul>
                    <li>React</li>
                    <li>React Router</li>
                    <li>Flux</li>
                    <li>Node</li>
                    <li>Browserify</li>
                </ul>
            </div>
        );
    }
});

module.exports=About;
"use strict";

var Dispatcher=require('../dispatcher/appDispatcher');
var ActionTypes=require('../constants/actionTypes');
var EventEmitter=require('events').EventEmitter;
var assign=require('object-assign');
var _ =require('lodash');

var _authors=[];
var CHANGE_EVENT='change';

var AuthorStore=assign({},EventEmitter.prototype,{  //this is like extending the EventEmitter class to 
   addChangeListener:function(callback){            //communicate Controllers, We add three event listner methods
        this.on(CHANGE_EVENT,callback);                 //that Controllers use and notify store whenever the change 
   },                                               //event is occure.
   removeChangeListener:function(callback){
        this.removeListener(CHANGE_EVENT,callback);
   },
   emitChange:function(){
       this.emit(CHANGE_EVENT);
   },
   getAllAuthors:function(){
       return _authors;
   },
   getAuthorById:function(){
       return _.find(_authors,{id:id});
   }                
});

//we need to register the store with Dispatcher, So It's notified when actions occure.  
Dispatcher.register(function(action){
    switch(action.ActionTypes){
        case ActionTypes.INITIALIZE:
            _authors=action.initialData.authors;
            AuthorStore.emitChange();
            break;
        case ActionTypes.CREATE_AUTHOR:
            _authors.push(action.author);
            AuthorStore.emitChange();
            break;
        default:
            //no operations
    };
});
module.exports=AuthorStore;

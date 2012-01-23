// JavaScript Document
function Log(){
    this.logarea = document.getElementById("debug"); ;    
} 

Log.prototype.message = function(text){
  this.logarea.innerHTML = text;
}

Log.prototype.append = function(text){
  this.logarea.innerHTML = this.logarea.innerHTML+"<br/>"+text;
}

Log.prototype.clean = function(){
  this.logarea.innerText = " ";
}
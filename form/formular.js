/**
 * check validity of a formular
 */
function FormularChecker(){
	this.status = true; 
	this.message = "";	
}

/**
 * verifies that a textfield is not empty
 */
FormularChecker.prototype.checkFilledTextField = function(id, name){
	if(jQuery.trim(document.getElementById(id).value) == ""){
		this.message += name+" is missing\n";
		this.status = false;
	}	
}

/**
 * verify email validity
 */
FormularChecker.prototype.checkEmail = function(id, name){
    var regexp = /^[\w\-]+(\.[\w\-]+)*@([A-Za-z0-9\-]+\.)+[a-zA-Z]{2,4}$/;
    if(!document.getElementById(id).value.match(regexp)){
        this.message += name+" address is not valid\n";
        this.status = false;
    }
}

/**
 * verify email validity
 */
FormularChecker.prototype.checkTextfieldArray = function(id, name){
    var status = true;
    var message = "";
    $("input[name^="+id+"]").each(function() {
        if(jQuery.trim($(this).val()) == ""){
            message += "A "+name+" is missing\n";
            status = false;
        }	
    });
    this.message += message;
    this.status = status;
}


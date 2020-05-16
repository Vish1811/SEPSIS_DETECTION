/* VALIDATING FORM FOR PAGE 2 */

function validateForm(){
//Set up regexp
	var name_regexp = new RegExp("[A-Za-z]+");
	var NHI_regexp = new RegExp("[A-Z]{3}[0-9]{4}");
 // get the text boxes from the DOM using name attribute
        fname=document.patient_detail.fname;
        lname=document.patient_detail.lname;
	NHI_num = document.patient_detail.NHI;
        // check to see if the text boxes contain valid values
        fnameValid=name_regexp.test(fname.value);
        lnameValid=name_regexp.test(lname.value);
	NHInumValid= NHI_regexp.test(NHI.value);	
        // if they do, exit with true and continue submission
        if (fnameValid && lnameValid && NHInumValid) 
          return true;
        // if we get to here, the form data is invalid so we
        // switch off the default submit action, display an error,
        // and return false
        event.preventDefault();
        fnameError=document.getElementById("fname_error");
        lnameError=document.getElementById("lname_error");
	NHInumError=document.getElementById("NHI_error");
        if (!fnameValid) {
          fnameError.className="form_error_visible";
          fname.className="form_error";
        } else {
          fnameError.className="form_error_hidden";
     lname.className="form_textbox";
        }
        if (!lnameValid) {
          lnameError.className="form_error_visible";
          lname.className="form_error";
        } else {
          lnameError.className="form_error_hidden";
        lname.className="form_textbox";
        }
 if (!NHInumValid) {
          NHInumError.className="form_error_visible";
          NHI.className="form_error";
        } else {
          NHInumError.className="form_error_hidden";
        NHI.className="form_textbox";
        }
        return false;
      
}
/*DISPLAY WELCOME FOR PAGE 3 USING URL VARIABLES*/

function displayWelcome() {
						var data_div = document.getElementById("individual_details");
						
						// use inner html to add the welcome message
						var NHI_number = "<p> Your NHI number is ";
						var welcome_html = "<h2>  Welcome ";

						// get the data, excluding the question mark
						var GET_data = window.location.search.substring(1);
						
			
						// spaces in URL data are represented by + signs so do a global replace using a regular expression
						GET_data = GET_data.replace(/\+/g, ' ');
			
						// split the data into an array of name=value strings
						var data_items = GET_data.split('&');
						for (var i = 0; i < data_items.length -1; i++) {
								var item = data_items[i];
								
								// split into separate name and value
								var name_value = item.split('=');
								var name = name_value[0];
								var value = name_value[1];
				
						if(i==0){
							NHI_number += " " + value;
}else{
						// add the name to the welcome message
								welcome_html += " " +value;
						}}

						
					// close the tag
						welcome_html += ".</h2>";
						NHI_number += "</p>";
						individual_details.innerHTML = welcome_html + NHI_number;
    }


/* ADD SLIDER QSOFA FOR PAGE 3 */
function addSlider(name){

var coll = document.getElementsByClassName("slidecontainer");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = document.getElementById(name);

    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}	
}

function changeValue(number){
var slider = document.getElementById("myRange"+number);
    var notice = slider.nextElementSibling;
notice.innerText =  slider.value;
calculateqSOFA();
return slider;
}

/*END OF THE SLIDER*/

/*THE COLLAPSIBLE BUTTON FOR QSOFA AND SOFA*/
					
function openqSOFA(){

var coll = document.getElementsByClassName("start_qSOFA");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = document.getElementById("qSOFA");
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = 1000 + "px";
    }
    if (content.style.display === "block") {
      content.style.display = "none";
    
    } else {
      content.style.display = "block";
        
    }
  });
}
}

function openSOFA(){

var coll = document.getElementsByClassName("start_SOFA");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = document.getElementById("SOFA");
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = 1000 + "px";
    }

    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
}

/* CALCULATOR FOR QSOFA */

function calculateqSOFA(){
    var sofa = 0;
    var displayText = "<p> The qSOFA Score is ";
    var val1 =  document.getElementById("myRange1").value;
     var val2 =  document.getElementById("myRange2").value;
     var val3 =  document.getElementById("myRange3").value;
     var total = document.getElementById("total_qSOFA");
    if(val1 <= 100  && val1 != null){
        sofa += 1;
        
    }
    if(val2 >= 22 && val2!= null){
         sofa += 1;
        
    }
    if(val3 <=14 && val3!= null){
           sofa += 1;
        
    }
    if(sofa != null){
       
       displayText +=  sofa +".</p>";
           var content = document.getElementById("warning");
        if(sofa >=2){
            
             content.className="visible red";
        }
        else{
            content.className="hidden";
        }
        
          total.innerHTML = displayText;
    }
  
    return sofa;
}

/* CALCULATOR FOR SOFA */

function calculateSOFA(){
    var sofa = 0;
        var radios = document.SOFA.SOFA_choice;
    var type;
    for(var i = 0, len=radios.length; i < len; i++){
        if(radios[i].checked){
            type = radios[i].value;
            
        }
    }
    
    var val = document.getElementById(type+"_ans").value;
    if(type ==="respiratory"){
        sofa =calculate_respiratory(val);       
    }
     else if(type ==="nervous"){
         sofa = calculate(val,-1,6,10,13,15);     
    }
    else if(type=== "liver"){
            var measurement = document.getElementById("liver_measurement").value;
            if(measurement === "mg/dl"){
         sofa = calculate(val,0,1.2,2.0,6.0,12.0);}
            else{
                 sofa = calculate(val,0,20,33,102,204);
                
            }
       
    }
    else if(type === "coagulation"){
         sofa = calculate(val,-1,20,50,100,150);
        
    }
        else if(type === "kidney"){
            sofa = calculate_kidney(val);
            
        
    }
    else if(type === "cardiovascular"){
        sofa = calculate_cardiovascular(val);
        
    }

    displayWarning(sofa);
    return sofa;
    
}

/* DISPLAY RESULT FOR SOFA */

function displayWarning(sofa){
   var display =  document.getElementById("SOFA_total");
    display.className = "visible";
     var warning = document.getElementById("warning_SOFA");
        if(sofa >3){
        warning.innerHTML = "<p class='red'>High Risk</p>";
        
    }
    else if(sofa >1 && sofa <= 3){
        warning.innerHTML = "<p class='yellow'>Medium Risk</p>";
        
    }
    else{
        warning.innerHTML = "<p class='green'>Low Risk</p>";
        
    }
            var total = document.getElementById("total_SOFA");
        var displayText = "<p> The SOFA Score is " + sofa + "</p>";
    total.innerHTML = displayText;
    
}

/* GENERIC CALCULATOR FOR SOFA */

function calculate(val, start, stop1,stop2,stop3,stop4){
    var reverse = 4;
    var temp = 0;
                  if(val > stop4) {
            temp = 4;
                      reverse = 0;
        }
        else if( val >= stop3 && val < stop4){
            temp = 3;
            reverse = 1;
            
        }
                else if(val >= stop2 && val < stop3 ){
            temp = 2;
                    reverse =2;
            
        }
                else if( val >= stop1 && val < stop2){
            temp = 1;
                    reverse = 3;
            
        }
    else if(val == stop4 && start === -1){
        reverse = 0;
        
    }
        else {
           temp = 0;
            reverse = 4;
            
        }
    if(start === -1){
        return reverse;
        
    }
    else{
        return temp;}
    
}

/*DETAIL CALCULATOR FOR DETAILED ENTRY*/

function calculate_kidney(val){
     var type = document.getElementById("kidney_type").value;

    if(type === "Creatinine"){
    var measurement = document.getElementById("kidney_measurement").value;
            if(measurement === "mg/dl"){
       return  calculate(val,0,1.2,2.0,3.5,5.0);}
            else{
        return   calculate(val,0,110,171,300,440);
                
            }}
    else{
        var ALT_val = document.getElementById("kidney_ans_ALT").value;
        if(ALT_val >= 200 && ALT_val < 500){
            return 3;
            
        }
        else if(ALT_val < 200){
            return 4;
        }
        else{
            return 0;
        }
        
    }
}
function calculate_cardiovascular(val){
    var type = document.getElementById("cardio_type").value;
    if(type === "MAP"){
        if(val < 70){
            return 1;
        }
        else{
            return 0;
            
        }
        
    }
    else{
        var ALT_val = document.getElementById("cardiovascular_ans_ALT").value;
        var vasopressors = document.getElementById("vasopressors").value;
       switch(vasopressors) {
           case 'None':
           return 0;
               break;
           case 'Dobutamine':
           return 2;
               break;
           case 'Dopamine':
               if(ALT_val <= 5){
                   return 2;
               }
               else if(ALT_val > 15){
                   return 4;
               }
               else {
                   return 3;
               }
               break;
           case 'Epinephrine':
               if(ALT_val <= 0.1){
                   return 3;
               }
               return 4;
               break;
           case 'Norepinephrine':
               if(ALT_val <= 0.1){
                   return 3;
               }
               return 4;
               break;
       }
    }
    
}

    function calculate_respiratory(val){
        var venitilated = document.getElementById("ventilated").checked;
        var temp = 0; 
          if(val < 400 && val >= 300) {
            temp = 1;
        }
        else if( val < 300 && !venitilated){
            temp = 2;
            
        }
                else if(val >= 100 && val < 200 && venitilated){
            temp = 3;
            
        }
                else if( val < 100 && venitilated){
            temp = 4;
            
        }
        else {
           temp = 0;
            
        }
        return temp;
    }

/*THE DISABLE EFFECT FOR SOFA*/

function enable(){
    var radios = document.SOFA.SOFA_choice;
       var display =  document.getElementById("SOFA_total");
    display.className = "hidden";
    
    for(var i = 0, len=radios.length; i < len; i++){
        if(radios[i].checked){
            var parent = radios[i].parentNode;
                var toenable = parent.nextElementSibling;
             toenable.className ="visible";
              parent = parent.parentNode;
            parent.className = "current";
            parent.style.backgroundColor = "white";
                parent.style.opacity="1";
              parent.focus();
            
        }
        else{
            radios[i].style.backgroundColor="grey";
             var parent =  radios[i].parentNode;
                var disable = parent.nextElementSibling;
            disable.className ="hidden";
            parent = parent.parentNode;
            parent.style.backgroundColor = "lightgrey";
            parent.style.opacity="0.5";
                parent.className = " ";
          
        }
    }
    return toenable;
}
/* THE DROPDOWN SWITCH FOR SPECIFIC SOFA TYPE OF CALCULATION*/

function selection(id){
    var select = document.getElementById(id);
    select.className = "visible";
    if(select.nextElementSibling != null){
        select.nextElementSibling.className = "hidden";
        return;
    }
    else if(select.previousElementSibling != null){
        select.previousElementSibling.className = "hidden";
        
    }
    
}

/*TOGGLE EFFECT FOR QSOFA*/
function toggle(){
    var nextElement = this.nextElementSibling;
    nextElement.className = "hidden";
    
}
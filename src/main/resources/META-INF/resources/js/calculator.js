/*
 * Copyright (C) 2005-2014 Rivet Logic Corporation.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; version 3
 * of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor,
 * Boston, MA 02110-1301, USA.
*/


AUI().ready('event-delegate', 'event-key', 'event', function(A) {
	
	var OPERATIONS = {
			  ADDITION : {value: '+', code: "+"}, 
			  SUBSTRACTION: {value: '-', code: '\u2013'}, 
			  MULTIPLICATION : {value: '*', code: 'x'},
			  DIVISION : {value: '/', code: '\367'}
			},
			DISPLAY_LENGTH = 9,
			RESET_VALUE = '0',
			ERROR_MSG = 'ERROR';

	var display = A.one('.calculator-display').getDOMNode(),
		resetDisplay = false,
		resultProcessed = false,
		currentOP = '',
		number1 = RESET_VALUE,
		number2 = RESET_VALUE,
		memory = RESET_VALUE;
	
	var calcContainer = A.one('.calculator-portlet');
	calcContainer.setAttribute('tabindex','0')
				.setStyle('outline','none')
				.getDOMNode().onkeydown = checkKey;

	/*** BUTTON HANDLERS ***/
	
	calcContainer.delegate('click', function(e) {
    	processNumber(e.currentTarget.get('innerHTML'));
    }, '.processNumber');
	
	calcContainer.delegate('click', function(e) {
		selectOperation(e.currentTarget.get('innerHTML'));
    }, '.op-buttons');
	
	A.one('.equals-operator').on('click', processResult);	
	A.one('.processDecimal').on('click', processDecimal);	
	A.one('.reset').on('click', reset);
	A.one('.memoryPlus').on('click', memoryPlus);
	A.one('.memoryMinus').on('click', memoryMinus);
	A.one('.memoryClear').on('click', memoryClear);
	A.one('.memoryRecall').on('click', memoryRecall);
	
	
	/*** OPERATION FUNCTIONS ***/

	function selectOperation(val){		
		if(currentOP !== '' && !resetDisplay){			
			number2 = display.value;
			
			var result = evalOperation(number1, currentOP, number2);
			if(result !== ERROR_MSG){
				display.value = number2 = result; 
			}
			else{
				reset();
				display.value = result;
			}
		}
		else if(resultProcessed){
			number2 = display.value;
			resultProcessed = false;
		}
		
		for(var OP in OPERATIONS){
			var tempOP = OPERATIONS[OP];
			if(val === tempOP.code){
				currentOP = tempOP.value;
			}
		}		
		resetDisplay = true;
	}
	
	function processNumber(val){
		if(resultProcessed || display.value === ERROR_MSG){
			reset();
		}
		
		if(resetDisplay){
			number1 = number2;
			display.value = number2 =  val;
			resetDisplay = false;
		}
		else{			
			var tempNumber = display.value === RESET_VALUE ? val : display.value.replace(/,/g , '') + val;
			
			if(tempNumber.length <= DISPLAY_LENGTH){
				var finalNumber = addCommas(tempNumber);
				display.value = number2 = finalNumber;
			}	
		}
	}
	
	function processDecimal(){
		if(resultProcessed || display.value === ERROR_MSG){
			reset();
		}
		
		if(resetDisplay){
			number1 = number2;
			display.value = number2 =  RESET_VALUE;
			resetDisplay = false;
		}
		
		if(display.value.indexOf('.') === -1){
			display.value += '.';
		}
	}
	
	function processResult(){	
		resetDisplay = resultProcessed = true;
		
		var result = evalOperation(number1, currentOP, number2);	
		
		if(result !== ERROR_MSG){		
			display.value = number1 = result;
		}
		else{
			reset();
			display.value = result;
		}		
	}
		
	function reset(){
		resultProcessed = resetDisplay = false;
		currentOP = '';
		display.value = 
		number1 = 
		number2 = 
		RESET_VALUE;		
	}
	
	function deleteNumber(){
		if(display.value.length === 1){
			display.value = number2 = RESET_VALUE;
		}		
		else{
			var tempNumber = display.value.replace(/,/g , '').slice(0,- 1);
			display.value = number2 = addCommas(tempNumber);			
		}
	}

	
	/*** MEMORY FUNCTIONS ***/
	
	function memoryPlus(){
		var result = evalOperation(memory, OPERATIONS.ADDITION.value, display.value);
		memory = result;
		resetDisplay = true;
	}
	
	function memoryMinus(){
		var result = evalOperation(memory, OPERATIONS.SUBSTRACTION.value, display.value);
		memory = result;
		resetDisplay = true;
	}
	
	function memoryClear(){
		memory = RESET_VALUE;
		resetDisplay = true;
	}
	
	function memoryRecall(){
		display.value = number2 = memory;
		resetDisplay = true;
	}

	
	/*** UTIL FUNCTIONS ***/
	
	function addCommas(val){
		var pointDivision = val.split('.');
		var intergerResult = pointDivision[0].split('').reverse().join('').match(/.{1,3}/g).join(',').split('').reverse().join('').replace('-,','-');
		
		return (pointDivision.length > 1) ? intergerResult + '.' + pointDivision[1] : intergerResult; 
	}
	
	function evalOperation(n1, op, n2){	
		if(op !== OPERATIONS.DIVISION.value || n2 !== RESET_VALUE){
	
			var result = RESET_VALUE;
			
			try{
				result = eval(n1.replace(/,/g , '') + op + n2.replace(/,/g , '')).toString();
			}catch(err){
				reset();
			}
			
			if(result.length > DISPLAY_LENGTH){
				result = new Number(result).toPrecision(DISPLAY_LENGTH);
			}
			
			return (isFinite(result)) ? addCommas(result.toString()) : result.toString();
		}
		else{
			return ERROR_MSG;
		}
	}
	
	
	/*** KEY EVENTS ***/
	
	var numberCodes = [48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105];
	var minusKC = 0,
		plus_equalKC = 0;
	
	
	if(A.UA.gecko){
		minusKC = 173;
		plus_equalKC = 61; 
	}
	else if(A.UA.chrome || A.UA.safari || A.UA.ie){
		minusKC = 189;
		plus_equalKC = 187;
	}
	
	function checkKey(e) {
	    e = e || window.event;
	    var OPERATION_KEY_CODE = [8, 13, 27, 48, 56, 96, 105, 106, 107, 109, 110, 111, 190, 191];
	    if(!(e.metaKey || e.ctrlKey)){
	    	e.preventDefault();
	    }

	    if(e.shiftKey){
	    	if(e.keyCode === plus_equalKC){
	    		selectOperation(OPERATIONS.ADDITION.code);
	    	}
	    	else if(e.keyCode === OPERATION_KEY_CODE[4]){
	    		selectOperation(OPERATIONS.MULTIPLICATION.code);
	    	}
	    }
	    else if (~numberCodes.indexOf(e.keyCode)) {
	    	var key = e.keyCode;
	        processNumber(String.fromCharCode((OPERATION_KEY_CODE[5] <= key && key <= OPERATION_KEY_CODE[6]) ? key - OPERATION_KEY_CODE[3] : key));
	    }
	    else if(e.keyCode === OPERATION_KEY_CODE[2]){
	    	reset();
	    }
	    else if(e.keyCode === OPERATION_KEY_CODE[12] || e.keyCode === OPERATION_KEY_CODE[10]){
	    	processDecimal();
	    }
	    else if(e.keyCode === plus_equalKC || e.keyCode === OPERATION_KEY_CODE[1]){
	    	processResult();
	    }
		else if(e.keyCode === minusKC || e.keyCode === OPERATION_KEY_CODE[9]){
			selectOperation(OPERATIONS.SUBSTRACTION.code);
	    }
		else if(e.keyCode === OPERATION_KEY_CODE[13] || e.keyCode === OPERATION_KEY_CODE[111]){
			selectOperation(OPERATIONS.DIVISION.code);
		}
	    else if(e.keyCode === OPERATION_KEY_CODE[8]){
			selectOperation(OPERATIONS.ADDITION.code);
	    }
		else if(e.keyCode === OPERATION_KEY_CODE[7]){
			selectOperation(OPERATIONS.MULTIPLICATION.code);
		}
		else if(e.keyCode === OPERATION_KEY_CODE[0]){
			deleteNumber();
		}
	    
	    return true;
	}

});
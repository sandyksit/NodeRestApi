
exports.BowlingGame = BowlingGame;

function BowlingGame(str) {
	
	function validArray(str) {
	  var len = str.length;
	  var arr =[];
	  var j=0;
	  for(var i=0; i<len; i++) {
	    if(str[i]=='X') {
	      arr[j++] = 10;
	      arr[j++] =0;
	    }
	   else if(str[i+1]=='/'){
	      arr[j++]= str[i];
	      arr[j++]= 10-str[i];
	      i++;
	      
	    }
	    else {
	      arr[j++]= str[i];
	    }      
	  }
	  return arr;
	}	
 
	function sumofGame(arr) {
		var len = arr.length;
		var score = [];
		var j=0;
		var sum=0;
		for(var i=0; j<10; i++) { 
			if(parseInt(arr[i]) ==10) {
			  if(parseInt(arr[i+2])==10){
			   		score[j++]=parseInt(arr[i])+parseInt(arr[i+2])+parseInt(arr[i+4]);
			    	i++;
			  }
			  else {
				    score[j++]=parseInt(arr[i])+parseInt(arr[i+2])+parseInt(arr[i+3]);
				    i++;
			  }
			}

			else if(parseInt(arr[i])+parseInt(arr[i+1])==10) {
				 score[j++] = parseInt(arr[i])+parseInt(arr[i+1])+parseInt(arr[i+2]);
				 i++;
			}

			else {
			  score[j++] = parseInt(arr[i])+parseInt(arr[i+1]);
			  i++;
			}
		}
		for(var k=0;k<score.length;k++) {
			sum += parseInt(score[k]);
		}		  
			
		return sum; 
	}
	var _str = validArray(str);
	return sumofGame(_str);
}

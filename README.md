
## Scoring bowling
currently this application accept whole string like 
//var st = 'XXXXXXXXXXXX';
//var st = '01273/X5/7/345400X70';
//var st = 'X7/90X088/06XXX81';
//var st = 'X7/729/XXX236/7/3';
var st ='90909090909090909090';
//var st = '5/5/5/5/5/5/5/5/5/5/5';
//var st ='00000000000000000000';

##How to testing
```
first install package.json file
npm install
and start mongo db for save users.
npm start
use postman for testing 
 list of user : search list of user 'http://localhost:8080/?action=user/list'
 single of user : 'http://localhost:8080/?action=user/get&id=5647a369817e86b411e01592'
 add user : 'http://localhost:8080/?action=user/add'
   {
 	name : "sandeep"
 }

 if you want play game pass whole string :

 http://localhost:8080/?action=user/play&id=570f559caf41dc44079164d1&str='XXXXXXXXXXX'



```












// var supertest = require("supertest");
// var should = require("should");

// var server = supertest.agent("http://localhost:8080");

// describe("service unit test",function(){

//   it("list of user",function(done){

//     server
//     .get("/?action=user/list")
//     .expect("Content-type",/json/)
//     .expect(200) 
//     .end(function(err,res){     
//       res.status.should.equal(200);      
//       res.body.error.should.equal(false);
//       done();
//     });
//   });

  

//    it("add user",function(done){

//      server
//     .post('/?action=user/add')
//     .send({name: "sandeep"})
//     .expect("Content-type",/json/)
//     .expect(200)
//     .end(function(err,res){
//       res.status.should.equal(200);
//       res.body.error.should.equal(false);
//       done();
//     });
//   });

//    it("delete user",function(done){
//       server
//       .delete("/?action=user/delete")
//       .send({id : 1})
//       .expect("Content-type",/json/)
//       .expect(200) 
//       .end(function(err,res){     
//         res.status.should.equal(200);      
//         res.body.error.should.equal(false);
//         done();
//       });
//     });
// });
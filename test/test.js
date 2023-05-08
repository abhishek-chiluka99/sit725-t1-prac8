let expect = require('chai').expect;
let request = require('request');
let url = 'http://localhost:3000/api/cats';
let card = {
    title:'Test-Title',
    link:'Test-link',
    description:'Test-Description'
}
// Get all the cats and matches status code with given code.
describe('test get all card', function() {
    it('return status code of 200', function(done){
        request(url, function(error,response,body){
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
//get the data and matches with the given command.
    it('return succesful message', function(done){
        request(url, function(error,response,body){
            body = JSON.parse(body);
            expect(body.message).to.contain('Success');
            done();
        });
    });

    //get all the data and create a json array
    it('returns an array', function(done){
        request(url, function(error,response,body){
            body = JSON.parse(body);
            expect(body.data).to.be.a('array');
            done();
        });
    });
// post a card with the given details to tes the POST
    describe('test post a card', function() {
        it('insert a card to database', function(done){
            request.post({url:url, form:card}, function(error,response,body){
                body = JSON.parse(body);
                expect(body.message).to.contain('Card successfully added');
                done();
            });
        });
    });

    describe('delete a card', function(){
        it('deleting card from database', function(done){
            request.delete({url:url, form:card}, function(error,response,body){
                body = JSON.parse(body);
                expect(body.message).to.contain('removed');
                done();
            });
        });
    });

});

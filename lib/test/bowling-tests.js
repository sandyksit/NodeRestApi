describe("BowlingGame", function() {
	var game;


	beforeEach(function(){
		game = new BowlingGame();
	});

	it("should handle XXXXXXXXXXXX", function() {
		expect(game()).to.equal(300);
	});
});

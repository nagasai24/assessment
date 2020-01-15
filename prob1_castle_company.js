module.exports.init = function () {
	const args = process.argv.slice(1);
	let noOfCastles = args.length>0 ? 1 : 0;
	let prev = args.length>0 ? args[0] : -1;
	for(let i=1; i<args.length; i++) {
		if(prev!==args[i]) {
			noOfCastles++;
			prev = args[i];
		}
	}
  	console.log('no of Castles Aequilibrium need to build are ->', noOfCastles);
};

// to run execute - node -e 'require("./prob1_castle_company").init()' 1 2 3 4 5 6
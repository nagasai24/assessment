module.exports = {
	init: () => {

		const getTransformersFromInput = (args) => {
			return args.map(arg => {
				const data = arg.split(',');
				return {
					name: data[0],
					type: data[1],
					strength: Number(data[2]),
					intelligence: Number(data[3]),
					speed: Number(data[4]),
					endurance: Number(data[5]),
					rank: Number(data[6]),
					courage: Number(data[7]),
					firepower: Number(data[8]),
					skill: Number(data[9]),
					destroyed: false,
					runaway: false
				}
			});
		}

		const getOverallRating = (transformer) => {
			return (transformer.strength + transformer.intelligence + transformer.speed + transformer.endurance + transformer.firepower);
		}

		const args = process.argv.slice(1);
		
		const transformers = getTransformersFromInput(args);
		transformers.sort((a, b) => a.rank-b.rank);
		const autobots = transformers.filter(transformer => transformer.type==='A');
		const decepticons = transformers.filter(transformer => transformer.type==='D');
		
		const maxInGroup = autobots.length>decepticons.length ? autobots.length : decepticons.length;
		let noOfBattles = 0;
		for(let i=0; i<autobots.length; ) {
			const autobot = autobots[i];
			for(let j=0; j<decepticons.length; j++) {
				if(decepticons.destroyed || decepticons.runaway) {
					continue;
				}
				const decepticon = decepticons[j];
				if(autobot.courage-decepticon.courage>=4 || autobot.strength-decepticon.strength>=3) {
					decepticon.runaway = true;
				} else if(decepticon.courage-autobot.courage>=4 || decepticon.strength-autobot.strength>=3) {
					autobot.runaway = true;
					i++;
				} else if(autobot.skill-decepticon.skill>=3) {
					decepticon.destroyed = true;
					noOfBattles++;
				} else if(decepticon.skill-autobot.skill>=3) {
					autobot.destroyed = true;
					i++;
					noOfBattles++;
				} else if(getOverallRating(autobot) > getOverallRating(decepticon)) {
					decepticon.destroyed = true;
					noOfBattles++;
				} else if(getOverallRating(decepticon) > getOverallRating(autobot)) {
					autobot.destroyed = true;
					noOfBattles++;
					i++;
				} else {
					autobot.destroyed = true;
					decepticon.destroyed = true;
					noOfBattles++;
					i++;
				}
			}
		}

		console.log(noOfBattles + ' battle');
		const autobotsWon = autobots.filter(autobot => (!autobot.destroyed && !autobot.runaway));
		const decepticonsWon = decepticons.filter(decepticon => (!decepticon.destroyed && !decepticon.runaway));
		const autobotsRanaway = autobots.filter(autobot => autobot.runaway);
		const decepticonsRanaway = decepticons.filter(decepticon => decepticon.runaway);
		console.log('Winning team (' + (autobotsWon.length>decepticonsWon.length ? 'Autobots' : 'Decepticons') + '): ', (autobotsWon.length>decepticonsWon.length ? autobotsWon.map(autobot => autobot.name).join(',') : decepticonsWon.map(decepticon => decepticon.name).join(',')));
		console.log('Survivors from the losing team (' + (autobotsRanaway.length>decepticonsRanaway.length ? 'Autobots' : 'Decepticons') + '): ', (autobotsRanaway.length>decepticonsRanaway.length ? autobotsRanaway.map(autobot => autobot.name).join(',') : decepticonsRanaway.map(decepticon => decepticon.name).join(',')));

	}
}

// to run execute - node -e 'require("./prob2_transformation_company").init()' Soundwave,D,8,9,2,6,7,5,6,10 Bluestreak,A,6,6,7,9,5,2,9,7 Hubcap,A,4,4,4,4,4,4,4,4
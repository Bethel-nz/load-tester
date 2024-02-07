import { Command } from 'commander';
import { loadTestOnce } from './lib/loadTestOnce';
import { loadTestNTimesLinearly } from './lib/loadTestNtimesLinearLy';
import { loadTestConcurrently } from './lib/loadTestConcurrently';
import { calculateStats } from './util/calculateStats';
import { displayFormattedStats } from './util/displayFormattedStats';
const DECIMAL_RADIX = 10;
const program = new Command();

program
	.option(
		'-u, --url <type>',
		'URl to make HTTP requests to e.g http://localhost:3000/api/v1/hello'
	)
	.option('-n, --number <type>', 'Number of requests to make default: 1', '1')
	.option(
		'-c, --concurrent <type>',
		'Number of cuncurrent requests per sec default: 1',
		'1'
	);

program.parse(process.argv);

const options = program.opts();
const url = options.url;
const numberOfRequests = parseInt(options.number, DECIMAL_RADIX);
const concurrentRequests = parseInt(options.concurrent, DECIMAL_RADIX);

if (!url) {
	console.error('URL is required');
	process.exit(1);
}

const requestOnlyOnce =
	(url && numberOfRequests === 1) ||
	(!numberOfRequests && concurrentRequests === 1) ||
	!concurrentRequests;

const requestNTimesLinearly =
	(url &&
		numberOfRequests &&
		numberOfRequests > 1 &&
		concurrentRequests === 1) ||
	!concurrentRequests;

const requestNtimesConcurrently =
	url &&
	numberOfRequests &&
	numberOfRequests > 1 &&
	concurrentRequests &&
	concurrentRequests > 1;

if (requestOnlyOnce) {
	console.log('Performing single load test');
	loadTestOnce(url)
		.then((resolvedStats) => {
			displayFormattedStats(calculateStats([resolvedStats] as RequestStat[]));
			process.exit(0);
		})
		.catch((rejectedStats) => {
			displayFormattedStats(calculateStats([rejectedStats] as RequestStat[]));

			process.exit(1);
		});
}
if (requestNTimesLinearly) {
	console.log('Performing linear load test');
	loadTestNTimesLinearly({ url, numberOfRequests })
		.then(() => process.exit(0))
		.catch(() => process.exit(1));
}

if (requestNtimesConcurrently) {
	console.log('Performing concurrently');
	loadTestConcurrently({
		url,
		numberOfRequests,
		concurrentRequests,
	})
		.then(() => process.exit(0))
		.catch(() => process.exit(1));
}

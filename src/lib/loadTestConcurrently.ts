import http from 'http';

import { displayFormattedStats } from '../util/displayFormattedStats';
import { calculateStats } from '../util/calculateStats';

const makeRequest = async (url: string) => {
	const startTime = performance.now();

	return new Promise((resolve) => {
		http
			.get(url, (response) => {
				const firstByteTime = performance.now();
				// Needed to process the response
				response.on('data', () => {});

				response.on('end', () => {
					const endTime = performance.now();
					resolve({
						startTime,
						firstByteTime,
						endTime,
						statusCode: response.statusCode,
					});
				});
			})
			.on('error', (e) => {
				console.error(e);
				const endTime = performance.now();
				resolve({
					startTime,
					firstByteTime: endTime,
					endTime,
					statusCode: 0,
				});
			});
	});
};

export const loadTestConcurrently = async ({
	url,
	numberOfRequests,
	concurrentRequests,
}: {
	url: string;
	numberOfRequests: number;
	concurrentRequests: number;
}) => {
	const requestStats: Array<RequestStat> = [];
	for (
		let requestIndex = 0;
		requestIndex < numberOfRequests;
		requestIndex += concurrentRequests
	) {
		const batch = [];
		for (
			let concurrentRequestIndex = 0;
			concurrentRequestIndex <
			Math.min(concurrentRequests, numberOfRequests - requestIndex);
			concurrentRequestIndex++
		) {
			batch.push(makeRequest(url));
		}

		const batchResults = (await Promise.all(batch)) as Array<RequestStat>;
		requestStats.push(...batchResults);
	}

	displayFormattedStats(calculateStats(requestStats));
};

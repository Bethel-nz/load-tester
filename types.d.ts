type RequestStat = {
	startTime: number;
	firstByteTime: number;
	endTime: number;
	statusCode: number;
};

type CalculatedStats = {
	total2XX: number;
	total5XX: number;
	requestsPerSecond: string; // Since you're converting to string with toFixed(2)
	totalRequestTime: { min: string; max: string; mean: string };
	timeToFirstByte: { min: string; max: string; mean: string };
	timeToLastByte: { min: string; max: string; mean: string };
};

export const CEFRLevelValues = [
	'A1',
	'A2',
	'B1',
	'B2',
	'C1',
	'C2'
] as const;

export type CEFRLevel = (typeof CEFRLevelValues)[number];
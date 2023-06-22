import type { CEFRLevel } from './CEFRLevel';
import type { Mode } from './mode';

export interface UserProfile {
	mode: Mode;
	CEFRLevel: {
		general: CEFRLevel;
		communication: CEFRLevel;
		grammar: CEFRLevel;
		vocabulary: CEFRLevel;
	};
	uid: string;
}

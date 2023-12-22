import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type State = {
	profileDetail: {
		fullName: string;
		profileImg: string;
		jobTitle: string;
		email: string;
		phone: string;
		address: string;
		nationality: string | undefined;
		passport: string | undefined;
		martial: string | undefined;
		gender: string | undefined;
		days: string | undefined;
		months: string | undefined;
		years: string | undefined;
		dateOfBirth: string | undefined;
	};
	openedPersonalInformationFields: number[];
	profileSummary: string;
};

type Action = {
	setProfileDetail: (payload: State['profileDetail']) => void;
	setOpenedPersonalInformationFields: (
		payload: State['openedPersonalInformationFields']
	) => void;
	setProfileSummary: (payload: State['profileSummary']) => void;
};

const useCVStore = create<State & Action>()(
	persist(
		(set, get) => ({
			profileDetail: {
				fullName: '',
				profileImg: '',
				jobTitle: '',
				email: '',
				phone: '',
				address: '',
				nationality: '',
				passport: '',
				martial: '',
				gender: '',
				days: '',
				months: '',
				years: '',
				dateOfBirth: '',
			},
			openedPersonalInformationFields: [],
			profileSummary: '',
			setProfileDetail: (payload) =>
				set((state) => ({
					profileDetail: { ...state.profileDetail, ...payload },
				})),
			setOpenedPersonalInformationFields: (payload) =>
				set(() => ({
					openedPersonalInformationFields: payload,
				})),
			setProfileSummary: (payload) =>
				set(() => ({
					profileSummary: payload,
				})),
		}),

		{
			name: 'cv-storage',
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);

export default useCVStore;

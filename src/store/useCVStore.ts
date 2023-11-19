import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type State = {
	isEditProfileDetail: boolean;
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
};

type Action = {
	setIsEditProfileDetail: (payload: State['isEditProfileDetail']) => void;
	setProfileDetail: (payload: State['profileDetail']) => void;
	setOpenedPersonalInformationFields: (
		payload: State['openedPersonalInformationFields']
	) => void;
};

const useCVStore = create<State & Action>()(
	persist(
		(set, get) => ({
			isEditProfileDetail: false,
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
			setIsEditProfileDetail: (payload) =>
				set(() => ({
					isEditProfileDetail: payload,
				})),
			setProfileDetail: (payload) =>
				set((state) => ({
					profileDetail: { ...state.profileDetail, ...payload },
				})),
			setOpenedPersonalInformationFields: (payload) =>
				set(() => ({
					openedPersonalInformationFields: payload,
				})),
		}),

		{
			name: 'cv-storage', // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
		}
	)
);

export default useCVStore;

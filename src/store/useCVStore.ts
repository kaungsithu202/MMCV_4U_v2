import { ReactNode } from 'react';
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
	profileSummary: ReactNode | '';
	experience: {
		expJobTitle: string;
		expCity: string;
		expCountry: string;
		startMonths: string;
		startYears: string;
		endMonths: string;
		endYears: string;
		expSummary: ReactNode | '';
	};
	skills: {
		id: string;
		skill: string;
		subSkills: string | undefined;
	}[];
	projects: {
		projectTitle: string;
		startMonths: string | '';
		startYears: string | '';
		endMonths: string | '';
		endYears: string | '';
		projectSummary: ReactNode | '';
	};
};

type Action = {
	setProfileDetail: (payload: State['profileDetail']) => void;
	setOpenedPersonalInformationFields: (
		payload: State['openedPersonalInformationFields']
	) => void;
	setProfileSummary: (payload: State['profileSummary']) => void;
	setExperience: (payload: State['experience']) => void;
	setSkills: (payload: State['skills']) => void;
	setProjects: (payload: State['projects']) => void;
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
			experience: {
				expJobTitle: '',
				expCity: '',
				expCountry: '',
				startMonths: '',
				startYears: '',
				endMonths: '',
				endYears: '',
				expSummary: '',
			},
			skills: [],
			projects: {
				projectTitle: '',
				startMonths: '',
				startYears: '',
				endMonths: '',
				endYears: '',
				projectSummary: '',
			},
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
			setExperience: (payload) =>
				set((state) => ({
					experience: { ...state.experience, ...payload },
				})),
			setSkills: (payload) =>
				set((state) => ({
					skills: payload,
				})),
			setProjects: (payload) =>
				set((state) => ({
					projects: { ...state.projects, ...payload },
				})),
		}),

		{
			name: 'cv-storage',
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);

export default useCVStore;

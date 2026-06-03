import { ReactNode } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ExperienceEntry = {
	id: string;
	expJobTitle: string;
	expCity: string;
	expCountry: string;
	startMonths: string;
	startYears: string;
	endMonths: string;
	endYears: string;
	expSummary: ReactNode | '';
};

export type ProjectEntry = {
	id: string;
	projectTitle: string;
	startMonths: string;
	startYears: string;
	endMonths: string;
	endYears: string;
	projectSummary: ReactNode | '';
};

type State = {
	resumeTitle: string;
	profileDetail: {
		fullName: string;
		jobTitle: string;
		email: string;
		phone: string;
		address: string;
		nationality: string | undefined;
		passport: string | undefined;
		martial: string | undefined;
		gender: string | undefined;
		github: string | undefined;
		linkedin: string | undefined;
		days: string | undefined;
		months: string | undefined;
		years: string | undefined;
		dateOfBirth: string | undefined;
	};
	profileImg: string;
	openedPersonalInformationFields: number[];
	profileSummary: ReactNode | '';
	experience: ExperienceEntry[];
	skills: {
		id: string;
		skill: string;
		subSkills: string | undefined;
	}[];
	projects: ProjectEntry[];
};

type Action = {
	setResumeTitle: (payload: string) => void;
	setProfileDetail: (payload: State['profileDetail']) => void;
	setOpenedPersonalInformationFields: (
		payload: State['openedPersonalInformationFields']
	) => void;
	setProfileSummary: (payload: State['profileSummary']) => void;
	addExperience: (payload: ExperienceEntry) => void;
	updateExperience: (id: string, payload: Omit<ExperienceEntry, 'id'>) => void;
	deleteExperience: (id: string) => void;
	setSkills: (payload: State['skills']) => void;
	addProject: (payload: ProjectEntry) => void;
	updateProject: (id: string, payload: Omit<ProjectEntry, 'id'>) => void;
	deleteProject: (id: string) => void;
	setProfileImage: (payload: State['profileImg']) => void;
};

const useCVStore = create<State & Action>()(
	persist(
		(set, get) => ({
			resumeTitle: 'Your Resume Title',
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
				github: '',
				linkedin: '',
				days: '',
				months: '',
				years: '',
				dateOfBirth: '',
			},
			profileImg: '',
			openedPersonalInformationFields: [],
			profileSummary: '',
			experience: [],
			skills: [],
			projects: [],
			setResumeTitle: (payload) =>
				set(() => ({
					resumeTitle: payload,
				})),
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
			addExperience: (payload) =>
				set((state) => ({
					experience: [...state.experience, payload],
				})),
			updateExperience: (id, payload) =>
				set((state) => ({
					experience: state.experience.map((exp) =>
						exp.id === id ? { ...exp, ...payload } : exp
					),
				})),
			deleteExperience: (id) =>
				set((state) => ({
					experience: state.experience.filter((exp) => exp.id !== id),
				})),
			setSkills: (payload) =>
				set((state) => ({
					skills: payload,
				})),
			addProject: (payload) =>
				set((state) => ({
					projects: [...state.projects, payload],
				})),
			updateProject: (id, payload) =>
				set((state) => ({
					projects: state.projects.map((proj) =>
						proj.id === id ? { ...proj, ...payload } : proj
					),
				})),
			deleteProject: (id) =>
				set((state) => ({
					projects: state.projects.filter((proj) => proj.id !== id),
				})),
			setProfileImage: (payload) =>
				set(() => ({
					profileImg: payload,
				})),
		}),

		{
			name: 'cv-storage',
			storage: createJSONStorage(() => localStorage),
		}
	)
);

export default useCVStore;

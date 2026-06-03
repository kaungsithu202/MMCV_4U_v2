'use client';

const DashboardSkeletons = () => {
	return (
		<div className="w-2/12  flex flex-col justify-start items-center py-6  ">
			<div className="w-8/12 bg-paper rounded-3xl shadow-sm flex flex-col py-6 gap-6 px-3 items-center">
				<div className="w-10/12 bg-secondary h-16 rounded-2xl"></div>
				<div className="w-10/12 bg-secondary h-16 rounded-2xl"></div>
				<div className="w-10/12 bg-secondary h-16 rounded-2xl"></div>
				<div className="w-10/12 bg-secondary h-16 rounded-2xl"></div>
			</div>
		</div>
	);
};

export default DashboardSkeletons;

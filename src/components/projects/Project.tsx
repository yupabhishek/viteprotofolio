import RefContext, { IRefContext } from "@/context/RefContext";
import { projects } from "@/data/projects";
import React, { useContext } from "react";
import ProjectCard from "./ProjectCard";

const Projects: React.FC = () => {
	const { projectRef } = useContext<IRefContext>(RefContext);

	return (
		<section
			ref={projectRef}
			className="scroll-mt-[30px] px-4 pt-5 pb-10 text-white"
		>
			<div className="mx-auto max-w-6xl">
				<div className="mx-auto mb-10 flex flex-col items-center justify-center text-center md:w-[70%]">
					<h2 className="mb-5 text-center text-2xl font-semibold lg:text-3xl">
						My Projects
					</h2>
					<p className="text-gray-200 max-lg:text-sm">
						Each of these projects highlights a unique aspect of what I can do,
						from problem-solving to creative design. I am always eager to take
						on new challenges and expand my horizons.
					</p>
				</div>

				<div className="flex flex-wrap items-center justify-center gap-8">
					{projects.map((project) => (
						<ProjectCard project={project} key={project._id} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Projects;

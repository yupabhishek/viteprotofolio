import { tools } from "@/data/tools";
import { lazy, Suspense } from "react";
import AnimatedTools from "./AnimatedTools";

const Tools = () => {
	return (
		<div className="min-h-[400px] py-10">
			<div className="flex w-full flex-col items-center gap-5 overflow-hidden">
				<div className="px-3 text-center lg:w-1/2">
					<h2 className="w-full text-center text-2xl font-semibold lg:text-3xl">
						Languages &amp; Tools
					</h2>
					<p className="mt-5 text-gray-200 max-lg:text-sm">
						I possess a strong command of various programming languages and
						tools, coupled with a continuous drive to stay ahead of industry
						trends. My current focus lies in advancing my backend development
						skills and exploring emerging frameworks to build scalable,
						high-performance solutions.
					</p>
				</div>
			</div>

			<Suspense fallback={<p className="text-center text-gray-400">Loading tools...</p>}>
				<AnimatedTools tools={tools} />
			</Suspense>
		</div>
	);
};

export default Tools;

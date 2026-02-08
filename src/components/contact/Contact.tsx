import RefContext, { IRefContext } from "@/context/RefContext";
import { useContext, useState } from "react";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import ContactSheet from "./ContactSheet";

const Contact: React.FC = () => {
	const { contactRef } = useContext<IRefContext>(RefContext);
	const [open, setOpen] = useState<boolean>(false);
	return (
		<section ref={contactRef} className="px-4 pt-10 text-white">
			<div className="mx-auto max-w-6xl">
				<div className="flex items-center justify-center">
					<InteractiveHoverButton
						className="bg-red-900 text-sm! backdrop-blur-3xl hover:bg-red-800"
						onClick={() => setOpen(true)}
					>
						Let's Connect
					</InteractiveHoverButton>
				</div>
				<ContactSheet open={open} setOpen={setOpen} />
			</div>
		</section>
	);
};

export default Contact;

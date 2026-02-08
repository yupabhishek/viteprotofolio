import { Loader, Send } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface FormErrors {
	name?: string;
	email?: string;
	message?: string;
}

const ContactForm: React.FC = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<FormErrors>({});
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const validateForm = () => {
		const newErrors: FormErrors = {};

		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Invalid email address";
		}

		if (!formData.message.trim()) {
			newErrors.message = "Message is required";
		} else if (formData.message.trim().length < 5) {
			newErrors.message = "Message must be at least 5 characters";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		// Clear error for this field when user starts typing
		if (errors[name as keyof FormErrors]) {
			setErrors((prev) => ({
				...prev,
				[name]: undefined,
			}));
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setLoading(true);
		setErrorMessage("");
		setSuccessMessage("");

		try {
			const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					message: formData.message,
				}),
			});

			if (response.ok) {
				setSuccessMessage("Message sent successfully! Thank you for reaching out.");
				setFormData({ name: "", email: "", message: "" });
			} else {
				setErrorMessage(
					"Failed to send message. Please try again or contact me directly."
				);
			}
		} catch (error) {
			setErrorMessage(
				"Something went wrong. Please try again or contact me directly."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} noValidate>
			<div className="flex items-start gap-3 max-sm:flex-col">
				<div className="w-full space-y-3">
					<Label htmlFor="name">Name</Label>
					<Input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="border border-white/10 focus:border-transparent focus:ring-2 focus:ring-offset-0 max-sm:text-sm"
						placeholder="Your name"
					/>
					{errors.name && (
						<p className="text-sm text-red-500">{errors.name}</p>
					)}
				</div>
				<div className="w-full space-y-3">
					<Label htmlFor="email">Email</Label>
					<Input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="border border-white/10 focus:border-transparent focus:ring-2 focus:ring-offset-0 max-sm:text-sm"
						placeholder="email@example.com"
					/>
					{errors.email && (
						<p className="text-sm text-red-500">{errors.email}</p>
					)}
				</div>
			</div>

			<div className="mt-3 w-full space-y-3">
				<Label htmlFor="message">Message</Label>
				<Textarea
					id="message"
					name="message"
					value={formData.message}
					onChange={handleChange}
					className="custom-scrollbar h-30 w-full resize-none overflow-y-auto border border-white/10 focus:border-transparent focus:ring-2 focus:ring-offset-0 max-sm:text-sm"
					placeholder="Let's talk about your vision"
				/>
				{errors.message && (
					<p className="text-sm text-red-500">{errors.message}</p>
				)}
			</div>

			{errorMessage && (
				<p className="mt-3 text-center text-sm text-red-500">{errorMessage}</p>
			)}

			<Button
				type="submit"
				className="mt-4 w-full bg-red-600 hover:bg-red-700"
				disabled={loading}
			>
				{loading ? (
					<>
						<Loader className="animate-spin" size={16} />
						<span>Sending message</span>
					</>
				) : (
					<>
						<Send size={16} />
						<span>Send message</span>
					</>
				)}
			</Button>

			{successMessage && (
				<p className="mt-3 text-center text-sm text-green-500">
					{successMessage}
				</p>
			)}
		</form>
	);
};

export default ContactForm;

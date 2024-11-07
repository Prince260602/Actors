import { MentorModel } from "../db/models/mentor.js";
export const createMentor = async (mentorData) => {
	const { name, description, linkedIn, email, url, photo } = mentorData;

	try {
		await MentorModel.validate({
			name,
			description,
			linkedIn,
			email,
			url,
			photo,
		});
	} catch (error) {
		return { status: 400, data: { error: error.message } };
	}

	try {
		const mentorExists = await MentorModel.findOne({ email });
		if (mentorExists) {
			return { status: 401, data: { error: "Mentor already exists" } };
		}

		const mentor = new MentorModel({
			name,
			description,
			linkedIn,
			email,
			url,
			photo,
		});
		await mentor.save();
		return {
			status: 201,
			data: { message: "Mentor created successfully", mentor },
		};
	} catch (error) {
		return { status: 500, data: { error: error.message } };
	}
};

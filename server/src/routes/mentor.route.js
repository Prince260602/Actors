import { Router } from "express";
import { MentorModel } from "../db/models/mentor.js";
import { createMentor } from "../service/mentor.service.js";
import multer from "multer";

const mentorRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

mentorRouter
	.get("/", async (req, res) => {
		try {
			const mentors = await MentorModel.find();
			if (mentors.length === 0) {
				return res.status(404).json({ message: "No mentors found" });
			}

			const formattedMentors = mentors.map((mentor) => ({
				...mentor._doc,
				photo: mentor.photo.toString("base64"),
			}));

			res.status(200).json(formattedMentors);
		} catch (error) {
			res.status(500).json({
				error: "Internal Server Error",
				message: error.message,
			});
		}
	})
	.get("/:email", async (req, res) => {
		const { email } = req.params;
		try {
			const mentor = await MentorModel.findOne({ email });
			if (!mentor) {
				return res.status(404).json({ message: "Mentor not found" });
			}

			mentor.photo = mentor.photo.toString("base64");
			res.status(200).json(mentor);
		} catch (error) {
			res.status(500).json({
				error: "Internal Server Error",
				message: error.message,
			});
		}
	})
	.post("/", upload.single("photo"), async (req, res) => {
		const mentorData = { ...req.body, photo: req.file.buffer };
		const { status, data } = await createMentor(mentorData);
		res.status(status).json(data);
	});

export { mentorRouter };

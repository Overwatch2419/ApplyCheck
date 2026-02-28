const Resume = require('../models/Resume');

// @desc Save or create a new resume
// @route POST /api/resumes
exports.createResume = async (req, res) => {
    try {
        console.log('--- POST /api/resumes ---');
        console.log('Body:', req.body);
        const newResume = new Resume(req.body);
        const savedResume = await newResume.save();
        console.log('Success: Resume saved with ID:', savedResume._id);
        res.status(201).json(savedResume);
    } catch (err) {
        console.error('Error in createResume:', err);
        res.status(500).json({ error: err.message });
    }
};

// @desc Get all resumes
// @route GET /api/resumes
exports.getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find().sort({ createdAt: -1 });
        res.json(resumes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc Get a single resume by ID
// @route GET /api/resumes/:id
exports.getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) return res.status(404).json({ message: 'Resume not found' });
        res.json(resume);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc Update a resume
// @route PUT /api/resumes/:id
exports.updateResume = async (req, res) => {
    try {
        const updatedResume = await Resume.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedResume) return res.status(404).json({ message: 'Resume not found' });
        res.json(updatedResume);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc Delete a resume
// @route DELETE /api/resumes/:id
exports.deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findByIdAndDelete(req.params.id);
        if (!resume) return res.status(404).json({ message: 'Resume not found' });
        res.json({ message: 'Resume deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

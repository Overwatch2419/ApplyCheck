const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    personalInfo: {
        fullName: String,
        email: String,
        phone: String,
        location: String,
        linkedIn: String,
        website: String
    },
    summary: String,
    skills: [String],
    experience: [{
        jobTitle: String,
        company: String,
        location: String,
        startDate: String,
        endDate: String,
        description: String
    }],
    education: [{
        degree: String,
        fieldOfStudy: String,
        school: String,
        location: String,
        graduationDate: String,
        gpa: String
    }],
    projects: [{
        title: String,
        technologies: [String],
        date: String,
        description: String,
        link: String
    }],
    certifications: [{
        name: String,
        issuer: String,
        date: String
    }],
    languages: [{
        name: String,
        proficiency: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Resume', ResumeSchema);

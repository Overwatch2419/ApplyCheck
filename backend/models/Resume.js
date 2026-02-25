const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    personalInfo: {
        fullName: String,
        email: String,
        phone: String,
        location: String,
        linkedIn: String,
        github: String,
        website: String
    },
    careerObjective: String,
    skills: {
        programmingLanguages: String,
        webDatabase: String,
        softwareTesting: String,
        toolsIDEs: String,
        otherSkills: String
    },
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
        school: String,
        cityState: String,
        graduationYear: String,
        coreSubjects: String,
        academicExposure: String
    }],
    internships: [{
        role: String,
        company: String,
        year: String,
        tasks: String,
        skillsLearned: String,
        achievements: String
    }],
    projects: [{
        title: String,
        technologies: String,
        description: String,
        learnings: String
    }],
    leadershipAchievements: [{
        role: String,
        organization: String,
        year: String,
        description: String
    }],
    additionalInfo: {
        languages: String,
        availability: String,
        certificationsInterests: String
    },
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

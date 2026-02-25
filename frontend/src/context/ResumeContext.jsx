import React, { createContext, useState, useContext } from 'react';

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState({
        personalInfo: { fullName: '', email: '', phone: '', location: '', linkedIn: '', github: '', website: '' },
        careerObjective: '',
        skills: {
            programmingLanguages: '',
            webDatabase: '',
            softwareTesting: '',
            toolsIDEs: '',
            otherSkills: ''
        },
        experience: [],
        education: [],
        internships: [],
        projects: [],
        leadershipAchievements: [],
        additionalInfo: {
            languages: '',
            availability: '',
            certificationsInterests: ''
        },
        certifications: [], // keeping for compatibility or future use
        languages: [] // keeping for compatibility or future use
    });

    return (
        <ResumeContext.Provider value={{ resumeData, setResumeData }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => useContext(ResumeContext);

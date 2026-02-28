import React, { useState } from 'react';
import axios from 'axios';
import ResumePreview from './ResumePreview';
import { useResume } from '../context/ResumeContext';
import html2pdf from 'html2pdf.js';

const ResumeForm = () => {
    const { resumeData, setResumeData } = useResume();


    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setResumeData({
            ...resumeData,
            personalInfo: { ...resumeData.personalInfo, [name]: value }
        });
    };

    const handleSkillChange = (e) => {
        const { name, value } = e.target;
        setResumeData({
            ...resumeData,
            skills: { ...resumeData.skills, [name]: value }
        });
    };





    const addExperience = () => {
        setResumeData({
            ...resumeData,
            experience: [...resumeData.experience, { jobTitle: '', company: '', location: '', startDate: '', endDate: '', description: '' }]
        });
    };

    const handleExperienceChange = (index, e) => {
        const { name, value } = e.target;
        setResumeData({
            ...resumeData,
            experience: resumeData.experience.map((exp, i) =>
                i === index ? { ...exp, [name]: value } : exp
            )
        });
    };

    const removeExperience = (index) => {
        setResumeData({
            ...resumeData,
            experience: resumeData.experience.filter((_, i) => i !== index)
        });
    };

    const addEducation = () => {
        setResumeData({
            ...resumeData,
            education: [...resumeData.education, { degree: '', school: '', cityState: '', graduationYear: '', coreSubjects: '', academicExposure: '' }]
        });
    };

    const handleEducationChange = (index, e) => {
        const { name, value } = e.target;
        setResumeData({
            ...resumeData,
            education: resumeData.education.map((edu, i) =>
                i === index ? { ...edu, [name]: value } : edu
            )
        });
    };

    const removeEducation = (index) => {
        setResumeData({ ...resumeData, education: resumeData.education.filter((_, i) => i !== index) });
    };

    const addProject = () => {
        setResumeData({
            ...resumeData,
            projects: [...resumeData.projects, { title: '', technologies: '', description: '', learnings: '' }]
        });
    };

    const handleProjectChange = (index, e) => {
        const { name, value } = e.target;
        setResumeData({
            ...resumeData,
            projects: resumeData.projects.map((proj, i) =>
                i === index ? { ...proj, [name]: value } : proj
            )
        });
    };

    const addInternship = () => {
        setResumeData({
            ...resumeData,
            internships: [...resumeData.internships, { role: '', company: '', year: '', tasks: '', skillsLearned: '', achievements: '' }]
        });
    };

    const handleInternshipChange = (index, e) => {
        const { name, value } = e.target;
        setResumeData({
            ...resumeData,
            internships: resumeData.internships.map((intern, i) =>
                i === index ? { ...intern, [name]: value } : intern
            )
        });
    };

    const removeInternship = (index) => {
        setResumeData({ ...resumeData, internships: resumeData.internships.filter((_, i) => i !== index) });
    };

    const addLeadership = () => {
        setResumeData({
            ...resumeData,
            leadershipAchievements: [...resumeData.leadershipAchievements, { role: '', organization: '', year: '', description: '' }]
        });
    };

    const handleLeadershipChange = (index, e) => {
        const { name, value } = e.target;
        setResumeData({
            ...resumeData,
            leadershipAchievements: resumeData.leadershipAchievements.map((lead, i) =>
                i === index ? { ...lead, [name]: value } : lead
            )
        });
    };

    const removeLeadership = (index) => {
        setResumeData({ ...resumeData, leadershipAchievements: resumeData.leadershipAchievements.filter((_, i) => i !== index) });
    };

    const removeProject = (index) => {
        setResumeData({ ...resumeData, projects: resumeData.projects.filter((_, i) => i !== index) });
    };

    const addCertification = () => {
        setResumeData({
            ...resumeData,
            certifications: [...resumeData.certifications, { name: '', issuer: '', date: '' }]
        });
    };

    const handleCertificationChange = (index, e) => {
        const { name, value } = e.target;
        setResumeData({
            ...resumeData,
            certifications: resumeData.certifications.map((cert, i) =>
                i === index ? { ...cert, [name]: value } : cert
            )
        });
    };

    const removeCertification = (index) => {
        setResumeData({ ...resumeData, certifications: resumeData.certifications.filter((_, i) => i !== index) });
    };

    const handleAdditionalInfoChange = (e) => {
        const { name, value } = e.target;
        setResumeData({
            ...resumeData,
            additionalInfo: { ...resumeData.additionalInfo, [name]: value }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting Resume Data:', resumeData);
        try {
            const res = await axios.post('http://localhost:5000/api/resumes', resumeData);
            console.log('Save Response:', res.data);
            alert('Resume saved to database successfully!');
        } catch (err) {
            console.error('Save Error:', err.response?.data || err.message);
            alert(`Error saving resume: ${err.response?.data?.error || err.message}`);
        }
    };

    const downloadPdf = () => {
        const element = document.getElementById('resume-content');
        const opt = {
            margin: 0,
            filename: `${resumeData.personalInfo.fullName || 'Resume'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="row g-4">
            <div className="col-md-7 mb-5">
                <div className="glass-card p-5">
                    <div className="d-flex justify-content-between align-items-center mb-5">
                        <h2 className="mb-0 fw-bold">Resume Builder</h2>
                        <button className="btn btn-outline-info btn-sm rounded-pill px-3" onClick={downloadPdf}>📥 Download PDF</button>
                    </div>

                    <form onSubmit={handleSubmit} className="custom-form">
                        <section className="mb-5">
                            <h5 className="text-secondary fw-bold mb-3 d-flex align-items-center">
                                <span className="me-2">📍</span> Personal Information
                            </h5>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-info mb-1">Full Name</label>
                                    <input type="text" name="fullName" placeholder="e.g., John Doe" className="form-control" value={resumeData.personalInfo.fullName} onChange={handlePersonalInfoChange} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-info mb-1">Email Address</label>
                                    <input type="email" name="email" placeholder="e.g., john@example.com" className="form-control" value={resumeData.personalInfo.email} onChange={handlePersonalInfoChange} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-info mb-1">Phone Number</label>
                                    <input type="text" name="phone" placeholder="e.g., +91 98765 43210" className="form-control" value={resumeData.personalInfo.phone} onChange={handlePersonalInfoChange} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-info mb-1">Location (City, State)</label>
                                    <input type="text" name="location" placeholder="e.g., Mumbai, Maharashtra" className="form-control" value={resumeData.personalInfo.location} onChange={handlePersonalInfoChange} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-info mb-1">LinkedIn URL</label>
                                    <input type="text" name="linkedIn" placeholder="https://linkedin.com/in/yourprofile" className="form-control" value={resumeData.personalInfo.linkedIn} onChange={handlePersonalInfoChange} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-info mb-1">GitHub URL</label>
                                    <input type="text" name="github" placeholder="https://github.com/yourusername" className="form-control" value={resumeData.personalInfo.github} onChange={handlePersonalInfoChange} />
                                </div>
                            </div>
                        </section>

                        <section className="mb-5">
                            <h5 className="text-secondary fw-bold mb-3 d-flex align-items-center">
                                <span className="me-2">🎯</span> Career Objective
                            </h5>
                            <label className="form-label fw-bold text-info mb-1">Career Objective / Summary</label>
                            <textarea className="form-control" rows="3" placeholder="Write 2–3 lines about your career goals..." value={resumeData.careerObjective || ''} onChange={(e) => setResumeData({ ...resumeData, careerObjective: e.target.value })}></textarea>
                        </section>

                        <section className="mb-5">
                            <h5 className="text-secondary fw-bold mb-3 d-flex justify-content-between align-items-center">
                                <span>💼 Work Experience</span>
                                <button type="button" className="btn btn-sm btn-outline-success rounded-pill px-3" onClick={addExperience}>+ Add Experience</button>
                            </h5>
                            {resumeData.experience.map((exp, index) => (
                                <div key={index} className="glass-card mb-4 p-4 border-0" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                    <button type="button" className="btn btn-sm btn-outline-danger float-end mb-2" onClick={() => removeExperience(index)}>✕</button>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold text-info mb-1">Job Title</label>
                                            <input type="text" name="jobTitle" placeholder="e.g., Software Engineer" className="form-control" value={exp.jobTitle} onChange={(e) => handleExperienceChange(index, e)} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold text-info mb-1">Company Name</label>
                                            <input type="text" name="company" placeholder="e.g., Google" className="form-control" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} />
                                        </div>
                                        <div className="col-md-12">
                                            <label className="form-label fw-bold text-info mb-1">Location</label>
                                            <input type="text" name="location" placeholder="City, State / Remote" className="form-control" value={exp.location} onChange={(e) => handleExperienceChange(index, e)} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold text-info mb-1">Start Date</label>
                                            <input type="text" name="startDate" placeholder="Month, Year" className="form-control" value={exp.startDate} onChange={(e) => handleExperienceChange(index, e)} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold text-info mb-1">End Date</label>
                                            <input type="text" name="endDate" placeholder="Month, Year / Present" className="form-control" value={exp.endDate} onChange={(e) => handleExperienceChange(index, e)} />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-bold text-info mb-1">Description</label>
                                            <textarea name="description" placeholder="Describe your key responsibilities and achievements..." className="form-control" rows="3" value={exp.description} onChange={(e) => handleExperienceChange(index, e)}></textarea>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>

                        <section className="mb-5">
                            <h5 className="text-secondary fw-bold mb-3 d-flex align-items-center">
                                <span className="me-2">⚡</span> Technical Skills
                            </h5>
                            <div className="mb-3">
                                <label className="form-label fw-bold text-info mb-1">Programming Languages</label>
                                <input type="text" name="programmingLanguages" placeholder="e.g., C, Python, Java" className="form-control" value={resumeData.skills.programmingLanguages} onChange={handleSkillChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold text-info mb-1">Web & Database</label>
                                <input type="text" name="webDatabase" placeholder="e.g., HTML, CSS, MySQL, PHP" className="form-control" value={resumeData.skills.webDatabase} onChange={handleSkillChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold text-info mb-1">Software Testing</label>
                                <input type="text" name="softwareTesting" placeholder="e.g., Manual Testing, Automation Tools" className="form-control" value={resumeData.skills.softwareTesting} onChange={handleSkillChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold text-info mb-1">Tools & IDEs</label>
                                <input type="text" name="toolsIDEs" placeholder="e.g., VS Code, PyCharm" className="form-control" value={resumeData.skills.toolsIDEs} onChange={handleSkillChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold text-info mb-1">Other Skills</label>
                                <input type="text" name="otherSkills" placeholder="e.g., Problem Solving, Debugging" className="form-control" value={resumeData.skills.otherSkills} onChange={handleSkillChange} />
                            </div>
                        </section>





                        <section className="mb-5">
                            <h5 className="text-secondary fw-bold mb-3 d-flex justify-content-between align-items-center">
                                <span>🎓 Education</span>
                                <button type="button" className="btn btn-sm btn-outline-success rounded-pill px-3" onClick={addEducation}>+ Add Education</button>
                            </h5>
                            {resumeData.education.map((edu, index) => (
                                <div key={index} className="glass-card mb-4 p-4 border-0" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                    <button type="button" className="btn btn-sm btn-outline-danger float-end mb-2" onClick={() => removeEducation(index)}>✕</button>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <label className="form-label fw-bold text-info mb-1">Degree Name</label>
                                            <input type="text" name="degree" placeholder="Degree Name (e.g. B.Tech in CSE)" className="form-control" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} />
                                        </div>
                                        <div className="col-md-8">
                                            <label className="form-label fw-bold text-info mb-1">College/University</label>
                                            <input type="text" name="school" placeholder="College/University Name" className="form-control" value={edu.school} onChange={(e) => handleEducationChange(index, e)} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label fw-bold text-info mb-1">City, State</label>
                                            <input type="text" name="cityState" placeholder="City, State" className="form-control" value={edu.cityState} onChange={(e) => handleEducationChange(index, e)} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label fw-bold text-info mb-1">Graduation Year</label>
                                            <input type="text" name="graduationYear" placeholder="Graduation Year" className="form-control" value={edu.graduationYear} onChange={(e) => handleEducationChange(index, e)} />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-bold text-info mb-1">Core Subjects</label>
                                            <textarea name="coreSubjects" placeholder="Core Subjects: List major subjects" className="form-control mb-2" rows="2" value={edu.coreSubjects} onChange={(e) => handleEducationChange(index, e)}></textarea>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-bold text-info mb-1">Academic Exposure</label>
                                            <textarea name="academicExposure" placeholder="Academic Exposure: List programming languages, tools, etc." className="form-control" rows="2" value={edu.academicExposure} onChange={(e) => handleEducationChange(index, e)}></textarea>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>

                        <section className="mb-5">
                            <h5 className="text-secondary fw-bold mb-3 d-flex justify-content-between align-items-center">
                                <span>💼 Internship / Training</span>
                                <button type="button" className="btn btn-sm btn-outline-success rounded-pill px-3" onClick={addInternship}>+ Add Internship</button>
                            </h5>
                            {resumeData.internships.map((intern, index) => (
                                <div key={index} className="glass-card mb-4 p-4 border-0" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                    <button type="button" className="btn btn-sm btn-outline-danger float-end mb-2" onClick={() => removeInternship(index)}>✕</button>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold text-info mb-1">Role / Position</label>
                                            <input type="text" name="role" placeholder="Role / Position" className="form-control" value={intern.role} onChange={(e) => handleInternshipChange(index, e)} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label fw-bold text-info mb-1">Company / Institute</label>
                                            <input type="text" name="company" placeholder="Company / Institute Name" className="form-control" value={intern.company} onChange={(e) => handleInternshipChange(index, e)} />
                                        </div>
                                        <div className="col-md-2">
                                            <label className="form-label fw-bold text-info mb-1">Year</label>
                                            <input type="text" name="year" placeholder="Year" className="form-control" value={intern.year} onChange={(e) => handleInternshipChange(index, e)} />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-bold text-info mb-1">Tasks</label>
                                            <textarea name="tasks" placeholder="Tasks and responsibilities" className="form-control mb-2" rows="2" value={intern.tasks} onChange={(e) => handleInternshipChange(index, e)}></textarea>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-bold text-info mb-1">Skills Learned</label>
                                            <input type="text" name="skillsLearned" placeholder="Skills or tools learned" className="form-control mb-2" value={intern.skillsLearned} onChange={(e) => handleInternshipChange(index, e)} />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-bold text-info mb-1">Achievements</label>
                                            <input type="text" name="achievements" placeholder="Key achievements" className="form-control" value={intern.achievements} onChange={(e) => handleInternshipChange(index, e)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>

                        <section className="mb-5">
                            <h5 className="text-secondary fw-bold mb-3 d-flex justify-content-between align-items-center">
                                <span>🏆 Leadership & Achievements</span>
                                <button type="button" className="btn btn-sm btn-outline-success rounded-pill px-3" onClick={addLeadership}>+ Add Achievement</button>
                            </h5>
                            {resumeData.leadershipAchievements.map((lead, index) => (
                                <div key={index} className="glass-card mb-4 p-4 border-0" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                    <button type="button" className="btn btn-sm btn-outline-danger float-end mb-2" onClick={() => removeLeadership(index)}>✕</button>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold text-info mb-1">Role / Position</label>
                                            <input type="text" name="role" placeholder="Role / Position" className="form-control" value={lead.role} onChange={(e) => handleLeadershipChange(index, e)} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label fw-bold text-info mb-1">Organization / Event</label>
                                            <input type="text" name="organization" placeholder="Organization / Event" className="form-control" value={lead.organization} onChange={(e) => handleLeadershipChange(index, e)} />
                                        </div>
                                        <div className="col-md-2">
                                            <label className="form-label fw-bold text-info mb-1">Year</label>
                                            <input type="text" name="year" placeholder="Year" className="form-control" value={lead.year} onChange={(e) => handleLeadershipChange(index, e)} />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-bold text-info mb-1">Description</label>
                                            <textarea name="description" placeholder="Describe the role or the achievement..." className="form-control" rows="2" value={lead.description} onChange={(e) => handleLeadershipChange(index, e)}></textarea>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>

                        <section className="mb-5">
                            <h5 className="text-secondary fw-bold mb-3 d-flex justify-content-between align-items-center">
                                <span>🚀 Projects</span>
                                <button type="button" className="btn btn-sm btn-outline-success rounded-pill px-3" onClick={addProject}>+ Add Project</button>
                            </h5>
                            {resumeData.projects.map((proj, index) => (
                                <div key={index} className="glass-card mb-4 p-4 border-0" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                    <button type="button" className="btn btn-sm btn-outline-danger float-end mb-2" onClick={() => removeProject(index)}>✕</button>
                                    <label className="form-label fw-bold text-info mb-1">Project Name</label>
                                    <input type="text" name="title" placeholder="Project Name" className="form-control mb-3" value={proj.title} onChange={(e) => handleProjectChange(index, e)} />
                                    <label className="form-label fw-bold text-info mb-1">Technologies Used</label>
                                    <input type="text" name="technologies" placeholder="Technologies Used (e.g. React, Node.js)" className="form-control mb-3" value={proj.technologies} onChange={(e) => handleProjectChange(index, e)} />
                                    <label className="form-label fw-bold text-info mb-1">Description</label>
                                    <textarea name="description" placeholder="Brief description of the project, your contributions, and key learnings" className="form-control mb-2" rows="3" value={proj.description} onChange={(e) => handleProjectChange(index, e)}></textarea>
                                    <label className="form-label fw-bold text-info mb-1">Learnings</label>
                                    <textarea name="learnings" placeholder="Additional points about tools, concepts, or outcomes" className="form-control" rows="2" value={proj.learnings} onChange={(e) => handleProjectChange(index, e)}></textarea>
                                </div>
                            ))}
                        </section>

                        <section className="mb-5">
                            <h5 className="text-secondary fw-bold mb-3 d-flex align-items-center">
                                <span className="me-2">ℹ️</span> Additional Information
                            </h5>
                            <div className="mb-3">
                                <label className="form-label fw-bold text-info mb-1">Languages</label>
                                <input type="text" name="languages" placeholder="List languages you know" className="form-control" value={resumeData.additionalInfo.languages} onChange={handleAdditionalInfoChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold text-info mb-1">Availability</label>
                                <input type="text" name="availability" placeholder="Immediate / Notice Period" className="form-control" value={resumeData.additionalInfo.availability} onChange={handleAdditionalInfoChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold text-info mb-1">Certifications / Tools / Interests (Optional)</label>
                                <textarea name="certificationsInterests" placeholder="Optional" className="form-control" rows="3" value={resumeData.additionalInfo.certificationsInterests} onChange={handleAdditionalInfoChange}></textarea>
                            </div>
                        </section>
                        <div className="mt-5 border-top pt-4">
                            <button type="submit" className="btn btn-primary w-100 py-3 fs-5 shadow-lg">🚀 Save & Finalize Resume</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-md-5 sticky-top p-0" style={{ top: '100px', height: 'fit-content' }}>
                <div className="p-3">
                    <h5 className="text-center text-muted mb-3 small fw-bold text-uppercase tracking-widest">ATS Preview</h5>
                    <div className="bg-white shadow-lg rounded overflow-auto" style={{ maxHeight: '80vh' }}>
                        <ResumePreview resumeData={resumeData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeForm;

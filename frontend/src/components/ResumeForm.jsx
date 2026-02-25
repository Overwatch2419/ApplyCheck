import React, { useState } from 'react';
import axios from 'axios';
import ResumePreview from './ResumePreview';
import { useResume } from '../context/ResumeContext';
import html2pdf from 'html2pdf.js';

const ResumeForm = () => {
    const { resumeData, setResumeData } = useResume();
    const [skillInput, setSkillInput] = useState('');

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setResumeData({
            ...resumeData,
            personalInfo: { ...resumeData.personalInfo, [name]: value }
        });
    };

    const addSkill = () => {
        if (skillInput.trim()) {
            setResumeData({ ...resumeData, skills: [...resumeData.skills, skillInput.trim()] });
            setSkillInput('');
        }
    };

    const removeSkill = (index) => {
        setResumeData({ ...resumeData, skills: resumeData.skills.filter((_, i) => i !== index) });
    };

    const addExperience = () => {
        setResumeData({
            ...resumeData,
            experience: [...resumeData.experience, { jobTitle: '', company: '', location: '', startDate: '', endDate: '', description: '' }]
        });
    };

    const handleExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const updatedExp = [...resumeData.experience];
        updatedExp[index][name] = value;
        setResumeData({ ...resumeData, experience: updatedExp });
    };

    const removeExperience = (index) => {
        setResumeData({ ...resumeData, experience: resumeData.experience.filter((_, i) => i !== index) });
    };

    const addEducation = () => {
        setResumeData({
            ...resumeData,
            education: [...resumeData.education, { degree: '', fieldOfStudy: '', school: '', location: '', graduationDate: '', gpa: '' }]
        });
    };

    const handleEducationChange = (index, e) => {
        const { name, value } = e.target;
        const updatedEdu = [...resumeData.education];
        updatedEdu[index][name] = value;
        setResumeData({ ...resumeData, education: updatedEdu });
    };

    const removeEducation = (index) => {
        setResumeData({ ...resumeData, education: resumeData.education.filter((_, i) => i !== index) });
    };

    const addProject = () => {
        setResumeData({
            ...resumeData,
            projects: [...resumeData.projects, { title: '', technologies: [], date: '', description: '', link: '' }]
        });
    };

    const handleProjectChange = (index, e) => {
        const { name, value } = e.target;
        const updatedProj = [...resumeData.projects];
        updatedProj[index][name] = value;
        setResumeData({ ...resumeData, projects: updatedProj });
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
        const updatedCert = [...resumeData.certifications];
        updatedCert[index][name] = value;
        setResumeData({ ...resumeData, certifications: updatedCert });
    };

    const removeCertification = (index) => {
        setResumeData({ ...resumeData, certifications: resumeData.certifications.filter((_, i) => i !== index) });
    };

    const addLanguage = () => {
        setResumeData({
            ...resumeData,
            languages: [...resumeData.languages, { name: '', proficiency: '' }]
        });
    };

    const handleLanguageChange = (index, e) => {
        const { name, value } = e.target;
        const updatedLang = [...resumeData.languages];
        updatedLang[index][name] = value;
        setResumeData({ ...resumeData, languages: updatedLang });
    };

    const removeLanguage = (index) => {
        setResumeData({ ...resumeData, languages: resumeData.languages.filter((_, i) => i !== index) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/resumes', resumeData);
            alert('Resume saved to database!');
        } catch (err) {
            console.error(err);
            alert('Error saving resume');
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
                                    <label className="small text-muted mb-1">Full Name</label>
                                    <input type="text" name="fullName" placeholder="John Doe" className="form-control" onChange={handlePersonalInfoChange} />
                                </div>
                                <div className="col-md-6">
                                    <label className="small text-muted mb-1">Email Address</label>
                                    <input type="email" name="email" placeholder="john@example.com" className="form-control" onChange={handlePersonalInfoChange} />
                                </div>
                                <div className="col-md-6">
                                    <label className="small text-muted mb-1">Phone Number</label>
                                    <input type="text" name="phone" placeholder="+1 234 567 890" className="form-control" onChange={handlePersonalInfoChange} />
                                </div>
                                <div className="col-md-6">
                                    <label className="small text-muted mb-1">Location</label>
                                    <input type="text" name="location" placeholder="City, State" className="form-control" onChange={handlePersonalInfoChange} />
                                </div>
                            </div>
                        </section>

                        <section className="mb-5">
                            <h5 className="text-secondary fw-bold mb-3 d-flex align-items-center">
                                <span className="me-2">📝</span> Professional Summary
                            </h5>
                            <textarea className="form-control" rows="4" placeholder="Brief professional summary that highlights your core expertise..." onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}></textarea>
                        </section>

                        <section className="mb-5">
                            <h5 className="text-secondary fw-bold mb-3 d-flex align-items-center">
                                <span className="me-2">⚡</span> Key Skills
                            </h5>
                            <div className="input-group mb-3 shadow-sm rounded-pill overflow-hidden">
                                <input type="text" className="form-control border-0 px-4" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Add a skill (e.g. React.js)" />
                                <button className="btn btn-primary px-4" type="button" onClick={addSkill}>Add</button>
                            </div>
                            <div className="d-flex flex-wrap gap-2">
                                {resumeData.skills.map((skill, index) => (
                                    <span key={index} className="badge rounded-pill bg-primary border-primary d-flex align-items-center gap-2 py-2 px-3">
                                        {skill} <button type="button" className="btn-close btn-close-white" style={{ fontSize: '0.6rem' }} onClick={() => removeSkill(index)}></button>
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section className="mb-5">
                            <h5 className="text-secondary fw-bold mb-3 d-flex justify-content-between align-items-center">
                                <span>💼 Work Experience</span>
                                <button type="button" className="btn btn-sm btn-outline-success rounded-pill px-3" onClick={addExperience}>+ Add Experience</button>
                            </h5>
                            {resumeData.experience.map((exp, index) => (
                                <div key={index} className="glass-card mb-4 p-4 border-0" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div className="w-100 me-3">
                                            <input type="text" name="jobTitle" placeholder="Job Title" className="form-control mb-2" value={exp.jobTitle} onChange={(e) => handleExperienceChange(index, e)} />
                                            <input type="text" name="company" placeholder="Company Name" className="form-control" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} />
                                        </div>
                                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeExperience(index)}>✕</button>
                                    </div>
                                    <div className="row g-2 mb-3">
                                        <div className="col-6"><input type="text" name="startDate" placeholder="Start Date" className="form-control" value={exp.startDate} onChange={(e) => handleExperienceChange(index, e)} /></div>
                                        <div className="col-6"><input type="text" name="endDate" placeholder="End Date" className="form-control" value={exp.endDate} onChange={(e) => handleExperienceChange(index, e)} /></div>
                                    </div>
                                    <textarea name="description" placeholder="Describe your achievements and responsibilities..." className="form-control" rows="3" value={exp.description} onChange={(e) => handleExperienceChange(index, e)}></textarea>
                                </div>
                            ))}
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
                                        <div className="col-md-6">
                                            <input type="text" name="degree" placeholder="Degree (e.g. B.S.)" className="form-control" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" name="fieldOfStudy" placeholder="Field of Study" className="form-control" value={edu.fieldOfStudy} onChange={(e) => handleEducationChange(index, e)} />
                                        </div>
                                        <div className="col-12">
                                            <input type="text" name="school" placeholder="School/University" className="form-control" value={edu.school} onChange={(e) => handleEducationChange(index, e)} />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" name="graduationDate" placeholder="Graduation Date" className="form-control" value={edu.graduationDate} onChange={(e) => handleEducationChange(index, e)} />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" name="gpa" placeholder="GPA" className="form-control" value={edu.gpa} onChange={(e) => handleEducationChange(index, e)} />
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
                                    <input type="text" name="title" placeholder="Project Title" className="form-control mb-3" value={proj.title} onChange={(e) => handleProjectChange(index, e)} />
                                    <div className="row g-2 mb-3">
                                        <div className="col-md-6"><input type="text" name="date" placeholder="Date/Duration" className="form-control" value={proj.date} onChange={(e) => handleProjectChange(index, e)} /></div>
                                        <div className="col-md-6"><input type="text" name="link" placeholder="Project Link" className="form-control" value={proj.link} onChange={(e) => handleProjectChange(index, e)} /></div>
                                    </div>
                                    <textarea name="description" placeholder="Short project description..." className="form-control mb-3" rows="2" value={proj.description} onChange={(e) => handleProjectChange(index, e)}></textarea>
                                    <input type="text" placeholder="Technologies used (e.g. React, Node.js)" className="form-control" value={proj.technologies.join(', ')} onChange={(e) => {
                                        const updatedProj = [...resumeData.projects];
                                        updatedProj[index].technologies = e.target.value.split(',').map(t => t.trim());
                                        setResumeData({ ...resumeData, projects: updatedProj });
                                    }} />
                                </div>
                            ))}
                        </section>

                        <div className="row g-4 mb-5">
                            <div className="col-md-6">
                                <h5 className="text-secondary fw-bold mb-3 d-flex justify-content-between align-items-center">
                                    <span>🏆 Certifications</span>
                                    <button type="button" className="btn btn-sm btn-outline-success rounded-pill px-2" onClick={addCertification}>+</button>
                                </h5>
                                {resumeData.certifications.map((cert, index) => (
                                    <div key={index} className="glass-card mb-3 p-3 border-0" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                        <button type="button" className="btn btn-sm btn-outline-danger float-end mb-2" style={{ padding: '0 0.4rem' }} onClick={() => removeCertification(index)}>✕</button>
                                        <input type="text" name="name" placeholder="Cert Name" className="form-control form-control-sm mb-2" value={cert.name} onChange={(e) => handleCertificationChange(index, e)} />
                                        <input type="text" name="issuer" placeholder="Issuer" className="form-control form-control-sm mb-2" value={cert.issuer} onChange={(e) => handleCertificationChange(index, e)} />
                                        <input type="text" name="date" placeholder="Date" className="form-control form-control-sm" value={cert.date} onChange={(e) => handleCertificationChange(index, e)} />
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-6">
                                <h5 className="text-secondary fw-bold mb-3 d-flex justify-content-between align-items-center">
                                    <span>🌐 Languages</span>
                                    <button type="button" className="btn btn-sm btn-outline-success rounded-pill px-2" onClick={addLanguage}>+</button>
                                </h5>
                                {resumeData.languages.map((lang, index) => (
                                    <div key={index} className="glass-card mb-3 p-3 border-0" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                        <button type="button" className="btn btn-sm btn-outline-danger float-end mb-2" style={{ padding: '0 0.4rem' }} onClick={() => removeLanguage(index)}>✕</button>
                                        <input type="text" name="name" placeholder="Language" className="form-control form-control-sm mb-2" value={lang.name} onChange={(e) => handleLanguageChange(index, e)} />
                                        <input type="text" name="proficiency" placeholder="Proficiency" className="form-control form-control-sm" value={lang.proficiency} onChange={(e) => handleLanguageChange(index, e)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-5 border-top pt-4">
                            <button type="submit" className="btn btn-primary w-100 py-3 fs-5 shadow-lg">🚀 Save & Finalize Resume</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-md-5 sticky-top p-0" style={{ top: '100px', height: 'fit-content' }}>
                <div className="p-3">
                    <h5 className="text-center text-muted mb-3 small fw-bold text-uppercase tracking-widest">ATS Preview</h5>
                    <div className="shadow-lg rounded overflow-hidden">
                        <ResumePreview resumeData={resumeData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeForm;

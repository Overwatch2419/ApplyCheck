import React from 'react';
import { exportPdf } from '../utils/pdfExport';

const ResumePreview = ({ resumeData }) => {
    const { personalInfo, careerObjective, skills, experience, education, internships, projects, leadershipAchievements, additionalInfo } = resumeData;

    return (
        <div id="resume-content" className="resume-preview bg-white" style={{
            minHeight: '1123px',
            width: '100%',
            maxWidth: '210mm', // A4 Width
            margin: '0 auto',
            color: '#1a1a1a',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '11pt',
            lineHeight: '1.5',
            padding: '1in', // Standard professional resume margin
            boxSizing: 'border-box'
        }}>
            {/* Header */}
            <header className="text-center mb-4">
                <h1 className="fw-bold mb-2" style={{ fontSize: '24pt', letterSpacing: '1px' }}>{personalInfo.fullName || 'FULL NAME'}</h1>
                <div className="mb-1" style={{ fontSize: '10pt' }}>
                    {[personalInfo.location, personalInfo.phone, personalInfo.email].filter(Boolean).join(' | ')}
                </div>
                <div style={{ fontSize: '10pt' }}>
                    {personalInfo.linkedIn && <span>LinkedIn: {personalInfo.linkedIn}</span>}
                    {personalInfo.linkedIn && personalInfo.github && <span> | </span>}
                    {personalInfo.github && <span>GitHub: {personalInfo.github}</span>}
                </div>
            </header>

            {/* Career Objective */}
            {careerObjective && (
                <section className="mb-3">
                    <h5 className="fw-bold border-bottom pb-1 mb-2" style={{ fontSize: '12pt', color: '#2c3e50' }}>Career Objective</h5>
                    <p className="mb-0">{careerObjective}</p>
                </section>
            )}

            {/* Work Experience */}
            {experience && experience.length > 0 && (
                <section className="mb-3">
                    <h5 className="fw-bold border-bottom pb-1 mb-2" style={{ fontSize: '12pt', color: '#2c3e50' }}>Work Experience</h5>
                    {experience.map((exp, index) => (
                        <div key={index} className="mb-3">
                            <div className="d-flex justify-content-between">
                                <span className="fw-bold">{exp.jobTitle} – {exp.company}, {exp.location}</span>
                                <span className="fw-bold">{exp.startDate} – {exp.endDate}</span>
                            </div>
                            <p className="mb-0 small" style={{ whiteSpace: 'pre-line' }}>{exp.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {/* Technical Skills */}
            {(skills.programmingLanguages || skills.webDatabase || skills.softwareTesting || skills.toolsIDEs || skills.otherSkills) && (
                <section className="mb-3">
                    <h5 className="fw-bold border-bottom pb-1 mb-2" style={{ fontSize: '12pt', color: '#2c3e50' }}>Technical Skills</h5>
                    {skills.programmingLanguages && <p className="mb-1 small"><strong>Programming Languages:</strong> {skills.programmingLanguages}</p>}
                    {skills.webDatabase && <p className="mb-1 small"><strong>Web & Database:</strong> {skills.webDatabase}</p>}
                    {skills.softwareTesting && <p className="mb-1 small"><strong>Software Testing:</strong> {skills.softwareTesting}</p>}
                    {skills.toolsIDEs && <p className="mb-1 small"><strong>Tools & IDEs:</strong> {skills.toolsIDEs}</p>}
                    {skills.otherSkills && <p className="mb-1 small"><strong>Other Skills:</strong> {skills.otherSkills}</p>}
                </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <section className="mb-3">
                    <h5 className="fw-bold border-bottom pb-1 mb-2" style={{ fontSize: '12pt', color: '#2c3e50' }}>Education</h5>
                    {education.map((edu, index) => (
                        <div key={index} className="mb-3">
                            <div className="d-flex justify-content-between">
                                <span className="fw-bold">{edu.degree} – {edu.school}, {edu.cityState}</span>
                                <span className="fw-bold">{edu.graduationYear}</span>
                            </div>
                            {edu.coreSubjects && <p className="mb-0 small"><strong>Core Subjects:</strong> {edu.coreSubjects}</p>}
                            {edu.academicExposure && <p className="mb-0 small"><strong>Academic Exposure:</strong> {edu.academicExposure}</p>}
                        </div>
                    ))}
                </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
                <section className="mb-3">
                    <h5 className="fw-bold border-bottom pb-1 mb-2" style={{ fontSize: '12pt', color: '#2c3e50' }}>Projects</h5>
                    {projects.map((proj, index) => (
                        <div key={index} className="mb-3">
                            <p className="fw-bold mb-1">{proj.title} {proj.technologies && <span>– <strong>Technologies:</strong> {proj.technologies}</span>}</p>
                            <p className="mb-1 small" style={{ whiteSpace: 'pre-line' }}>• <strong>Description:</strong> {proj.description}</p>
                            {proj.learnings && <p className="mb-0 small" style={{ whiteSpace: 'pre-line' }}>• <strong>Learnings:</strong> {proj.learnings}</p>}
                        </div>
                    ))}
                </section>
            )}

            {/* Internship / Training */}
            {internships && internships.length > 0 && (
                <section className="mb-3">
                    <h5 className="fw-bold border-bottom pb-1 mb-2" style={{ fontSize: '12pt', color: '#2c3e50' }}>Internship / Training</h5>
                    {internships.map((intern, index) => (
                        <div key={index} className="mb-3">
                            <p className="fw-bold mb-1">{intern.role} – {intern.company} | {intern.year}</p>
                            <p className="mb-1 small" style={{ whiteSpace: 'pre-line' }}>• <strong>Tasks:</strong> {intern.tasks}</p>
                            {intern.skillsLearned && <p className="mb-1 small">• <strong>Skills Learned:</strong> {intern.skillsLearned}</p>}
                            {intern.achievements && <p className="mb-0 small">• <strong>Achievements:</strong> {intern.achievements}</p>}
                        </div>
                    ))}
                </section>
            )}

            {/* Leadership & Achievements */}
            {leadershipAchievements && leadershipAchievements.length > 0 && (
                <section className="mb-3">
                    <h5 className="fw-bold border-bottom pb-1 mb-2" style={{ fontSize: '12pt', color: '#2c3e50' }}>Leadership & Achievements</h5>
                    {leadershipAchievements.map((lead, index) => (
                        <div key={index} className="mb-3">
                            <p className="fw-bold mb-1">{lead.role} – {lead.organization} | {lead.year}</p>
                            <p className="mb-0 small" style={{ whiteSpace: 'pre-line' }}>• <strong>Description:</strong> {lead.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {/* Additional Information */}
            {(additionalInfo.languages || additionalInfo.availability || additionalInfo.certificationsInterests) && (
                <section className="mb-3">
                    <h5 className="fw-bold border-bottom pb-1 mb-2" style={{ fontSize: '12pt', color: '#2c3e50' }}>Additional Information</h5>
                    {additionalInfo.languages && <p className="mb-1 small"><strong>Languages:</strong> {additionalInfo.languages}</p>}
                    {additionalInfo.availability && <p className="mb-1 small"><strong>Availability:</strong> {additionalInfo.availability}</p>}
                    {additionalInfo.certificationsInterests && <p className="mb-0 small"><strong>Certifications / Tools / Interests:</strong> {additionalInfo.certificationsInterests}</p>}
                </section>
            )}

            {/* Footer / Contact (Optional in Preview) */}
        </div>
    );
};

export default ResumePreview;

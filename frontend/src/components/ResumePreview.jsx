import React from 'react';

const ResumePreview = ({ resumeData }) => {
    const { personalInfo, summary, skills, experience, education, projects, certifications, languages } = resumeData;

    return (
        <div id="resume-content" className="resume-preview p-5 bg-white border shadow-sm" style={{ minHeight: '1000px', color: '#333', fontFamily: 'Arial, sans-serif' }}>
            {/* Personal Info */}
            <header className="text-center mb-4">
                <h1 className="fw-bold text-uppercase mb-1">{personalInfo.fullName || 'Your Name'}</h1>
                <p className="mb-0">
                    {personalInfo.email && <span>{personalInfo.email} | </span>}
                    {personalInfo.phone && <span>{personalInfo.phone} | </span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </p>
                <p className="mb-0 small text-primary">
                    {personalInfo.linkedIn && <span className="me-2">{personalInfo.linkedIn}</span>}
                    {personalInfo.website && <span>{personalInfo.website}</span>}
                </p>
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-4">
                    <h5 className="border-bottom pb-1 fw-bold text-uppercase">Summary</h5>
                    <p className="small mb-0">{summary}</p>
                </section>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
                <section className="mb-4">
                    <h5 className="border-bottom pb-1 fw-bold text-uppercase">Skills</h5>
                    <p className="small mb-0">{skills.join(', ')}</p>
                </section>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
                <section className="mb-4">
                    <h5 className="border-bottom pb-1 fw-bold text-uppercase">Experience</h5>
                    {experience.map((exp, index) => (
                        <div key={index} className="mb-3">
                            <div className="d-flex justify-content-between align-items-baseline">
                                <p className="mb-0 fw-bold">{exp.jobTitle}</p>
                                <p className="mb-0 small text-muted">{exp.startDate} – {exp.endDate}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-baseline">
                                <p className="mb-1 small italic">{exp.company}</p>
                                <p className="mb-1 small italic">{exp.location}</p>
                            </div>
                            <p className="small mb-0 ms-3" style={{ whiteSpace: 'pre-line' }}>• {exp.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <section className="mb-4">
                    <h5 className="border-bottom pb-1 fw-bold text-uppercase">Education</h5>
                    {education.map((edu, index) => (
                        <div key={index} className="mb-2">
                            <div className="d-flex justify-content-between align-items-baseline">
                                <p className="mb-0 fw-bold">{edu.school}</p>
                                <p className="mb-0 small text-muted">{edu.graduationDate}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-baseline">
                                <p className="mb-0 small">{edu.degree} in {edu.fieldOfStudy}</p>
                                {edu.gpa && <p className="mb-0 small text-muted">GPA: {edu.gpa}</p>}
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
                <section className="mb-4">
                    <h5 className="border-bottom pb-1 fw-bold text-uppercase">Projects</h5>
                    {projects.map((proj, index) => (
                        <div key={index} className="mb-3">
                            <div className="d-flex justify-content-between align-items-baseline">
                                <p className="mb-0 fw-bold">{proj.title}</p>
                                <p className="mb-0 small text-muted">{proj.date}</p>
                            </div>
                            {proj.link && <p className="mb-1 small font-monospace text-primary">{proj.link}</p>}
                            <p className="small mb-1">• {proj.description}</p>
                            {proj.technologies && proj.technologies.length > 0 && (
                                <p className="small mb-0"><strong>Technologies:</strong> {proj.technologies.join(', ')}</p>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
                <section className="mb-4">
                    <h5 className="border-bottom pb-1 fw-bold text-uppercase">Certifications</h5>
                    {certifications.map((cert, index) => (
                        <div key={index} className="d-flex justify-content-between align-items-baseline mb-1">
                            <p className="small mb-0"><span className="fw-bold">{cert.name}</span> | {cert.issuer}</p>
                            <p className="small text-muted mb-0">{cert.date}</p>
                        </div>
                    ))}
                </section>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
                <section className="mb-4">
                    <h5 className="border-bottom pb-1 fw-bold text-uppercase">Languages</h5>
                    <p className="small mb-0">
                        {languages.map((lang, index) => (
                            <span key={index}>{lang.name} ({lang.proficiency}){index < languages.length - 1 ? ', ' : ''}</span>
                        ))}
                    </p>
                </section>
            )}

            {/* Footer / Contact (Optional in Preview) */}
        </div>
    );
};

export default ResumePreview;

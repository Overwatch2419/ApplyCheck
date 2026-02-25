import React, { useState } from 'react';
import axios from 'axios';
import { useResume } from '../context/ResumeContext';

const AnalysisDashboard = () => {
    const { resumeData } = useResume();
    const [jobDescription, setJobDescription] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!jobDescription) return alert('Please paste a job description');
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/analysis/analyze', {
                jobDescription,
                resumeSkills: resumeData.skills
            });
            setAnalysisResult(res.data);
        } catch (err) {
            console.error(err);
            alert('Error analyzing job description');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container pb-5">
            <h1 className="display-4 fw-bold mb-5 text-center" style={{ background: 'linear-gradient(to right, #fff, var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: transparent }}>ATS Match Analysis</h1>

            <div className="row g-4">
                <div className="col-lg-7">
                    <div className="glass-card p-4 h-100">
                        <div className="d-flex align-items-center mb-4">
                            <span className="fs-3 me-3">📄</span>
                            <h4 className="mb-0 fw-bold">Job Description</h4>
                        </div>
                        <textarea
                            className="form-control mb-4"
                            rows="12"
                            placeholder="Paste the target job description here to analyze your match..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            style={{ fontSize: '0.95rem', lineHeight: '1.6' }}
                        ></textarea>
                        <button
                            className="btn btn-primary w-100 py-3 fs-5"
                            onClick={handleAnalyze}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="spinner-border spinner-border-sm me-2"></span>
                            ) : '✨ Analyze Match Score'}
                        </button>
                    </div>
                </div>

                <div className="col-lg-5">
                    {analysisResult ? (
                        <div className="glass-card p-4 h-100 border-primary border-opacity-25">
                            <h4 className="text-center mb-4 fw-bold">Analysis Profile</h4>

                            <div className="text-center mb-5 p-4 rounded-4" style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                                <div className="display-2 fw-bold mb-1" style={{ color: 'var(--accent)' }}>{analysisResult.score}%</div>
                                <p className="text-muted text-uppercase tracking-wider small mb-3">Overall Match Strength</p>
                                <div className="progress rounded-pill shadow-sm" style={{ height: '14px', background: 'rgba(255,255,255,0.05)' }}>
                                    <div
                                        className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                                        role="progressbar"
                                        style={{ width: `${analysisResult.score}%`, borderRadius: '20px' }}
                                    ></div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h6 className="text-success fw-bold mb-3 d-flex align-items-center">
                                    <span className="me-2">✅</span> Matched Keywords
                                </h6>
                                <div className="d-flex flex-wrap gap-2">
                                    {analysisResult.matchedKeywords.length > 0 ? (
                                        analysisResult.matchedKeywords.map((kw, i) => (
                                            <span key={i} className="badge rounded-pill bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-2">{kw}</span>
                                        ))
                                    ) : (
                                        <p className="small text-muted italic">No direct keyword matches found yet.</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h6 className="text-danger fw-bold mb-3 d-flex align-items-center">
                                    <span className="me-2">❌</span> Missing High-Impact Keywords
                                </h6>
                                <div className="d-flex flex-wrap gap-2">
                                    {analysisResult.missingKeywords.length > 0 ? (
                                        analysisResult.missingKeywords.map((kw, i) => (
                                            <span key={i} className="badge rounded-pill bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 px-3 py-2">{kw}</span>
                                        ))
                                    ) : (
                                        <p className="small text-muted">Great work! You've covered all key terms.</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h6 className="text-info fw-bold mb-3 d-flex align-items-center">
                                    <span className="me-2">💡</span> Strategic Suggestions
                                </h6>
                                <ul className="list-unstyled">
                                    {analysisResult.suggestions.map((s, i) => (
                                        <li key={i} className="small mb-2 text-muted d-flex align-items-start text-info">
                                            <span className="me-2 text-info opacity-50">•</span> {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-card p-5 h-100 d-flex flex-column align-items-center justify-content-center text-center opacity-75">
                            <div className="fs-1 mb-3 opacity-25">📊</div>
                            <h5 className="text-muted mb-2">Ready for Analysis</h5>
                            <p className="small text-muted">Paste a job description and click analyze to see your candidate profile and ATS score.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnalysisDashboard;

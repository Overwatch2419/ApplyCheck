const stopWords = new Set(['and', 'the', 'is', 'in', 'at', 'of', 'to', 'for', 'with', 'a', 'an', 'on', 'this', 'that', 'from', 'as', 'our', 'we', 'are', 'your', 'you', 'be', 'will', 'must', 'can', 'should', 'was', 'were', 'it', 'its', 'by', 'but', 'not', 'or', 'if', 'then', 'else', 'which', 'who', 'whom', 'whose', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'nor', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'can', 'will', 'just', 'should', 'now']);

const actionVerbs = new Set(['developed', 'managed', 'optimized', 'led', 'designed', 'implemented', 'coordinated', 'achieved', 'initiated', 'improved', 'increased', 'created', 'spearheaded', 'automated', 'delivered', 'mentored', 'resolved', 'analyzed', 'streamlined', 'collaborated']);

const extractKeywords = (text) => {
    if (!text) return [];
    const cleanText = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
    const words = cleanText.split(/\s+/);
    return [...new Set(words.filter(word => word.length > 2 && !stopWords.has(word)))];
};

const checkActionVerbs = (resumeData) => {
    let count = 0;
    const textToCheck = [
        resumeData.careerObjective || '',
        ...(resumeData.experience || []).map(exp => exp.description || ''),
        ...(resumeData.projects || []).map(proj => proj.description || ''),
        ...(resumeData.internships || []).map(intern => (intern.tasks || '') + ' ' + (intern.achievements || ''))
    ].join(' ').toLowerCase();

    const words = textToCheck.split(/\s+/);
    words.forEach(word => {
        if (actionVerbs.has(word)) count++;
    });

    return Math.min(count, 10); // Cap at 10 for scoring
};

const checkSectionCompleteness = (resumeData) => {
    const sections = {
        personalInfo: !!(resumeData.personalInfo && resumeData.personalInfo.fullName && resumeData.personalInfo.email),
        education: !!(resumeData.education && resumeData.education.length > 0),
        experience: !!(resumeData.experience && resumeData.experience.length > 0),
        skills: !!(resumeData.skills && Object.values(resumeData.skills).some(val => val && val.length > 0)),
        projects: !!(resumeData.projects && resumeData.projects.length > 0)
    };

    const completeCount = Object.values(sections).filter(Boolean).length;
    return {
        score: (completeCount / Object.keys(sections).length) * 100,
        missing: Object.keys(sections).filter(key => !sections[key])
    };
};

const categorizeKeywords = (keywords) => {
    const techStack = ['react', 'node.js', 'express', 'mongodb', 'python', 'javascript', 'java', 'c++', 'html', 'css', 'sql', 'nosql', 'aws', 'docker', 'kubernetes', 'typescript', 'angular', 'vue', 'django', 'flask', 'spring', 'postgresql'];
    const tools = ['git', 'github', 'jira', 'confluence', 'trello', 'figma', 'postman', 'vscode', 'intellij', 'npm', 'yarn', 'webpack', 'babel', 'jenkins', 'circleci'];
    const softSkills = ['leadership', 'communication', 'teamwork', 'problem-solving', 'creativity', 'adaptability', 'collaboration', 'management', 'mentoring', 'analytical', 'strategic', 'agile', 'scrum'];

    const categorized = {
        techStack: [],
        tools: [],
        softSkills: [],
        other: []
    };

    keywords.forEach(kw => {
        const lower = kw.toLowerCase();
        if (techStack.includes(lower)) categorized.techStack.push(kw);
        else if (tools.includes(lower)) categorized.tools.push(kw);
        else if (softSkills.includes(lower)) categorized.softSkills.push(kw);
        else categorized.other.push(kw);
    });

    return categorized;
};

const generateOptimizedSnippet = (missingKeywords, matchedVerbs) => {
    if (missingKeywords.length === 0) return "Your resume already covers key terms effectively!";

    const relevantKeywords = missingKeywords.slice(0, 3);
    const verb = matchedVerbs.length > 0 ? matchedVerbs[0] : 'leveraged';

    return `Experienced professional who has ${verb} solutions using ${relevantKeywords.join(', ')} to drive business impact and optimize performance.`;
};

const extractJDSpecifics = (jobDescription) => {
    const lowerJD = jobDescription.toLowerCase();
    return {
        isSenior: /\bsenior\b|\blead\b|\bprincipal\b|\bmanager\b|\bdirector\b/.test(lowerJD),
        isRemote: /\bremote\b|\bwork from home\b|\bwfh\b/.test(lowerJD),
        isAgile: /\bagile\b|\bscrum\b|\bkanban\b/.test(lowerJD),
        isCloud: /\baws\b|\bazure\b|\bgcp\b|\bcloud\b/.test(lowerJD),
        isSecurity: /\bsecurity\b|\bcybersecurity\b|\bprivacy\b/.test(lowerJD)
    };
};

exports.analyzeJobDescription = async (req, res) => {
    const { jobDescription, resumeData } = req.body;

    if (!jobDescription) {
        return res.status(400).json({ error: 'Job description is required' });
    }

    if (!resumeData) {
        return res.status(400).json({ error: 'Resume data is required' });
    }

    try {
        const jdKeywords = extractKeywords(jobDescription);
        const jdSpecifics = extractJDSpecifics(jobDescription);

        // Collect all skills from the resumeData.skills object
        const resumeSkills = Object.values(resumeData.skills || {})
            .flatMap(skillStr => (skillStr || '').split(/,\s*/))
            .filter(skill => skill.length > 0);

        const matchedKeywords = resumeSkills.filter(skill =>
            jdKeywords.includes(skill.toLowerCase())
        );

        const missingKeywords = jdKeywords.filter(keyword =>
            !resumeSkills.some(skill => skill.toLowerCase() === keyword)
        );

        // --- Scoring Logic (Weights) ---
        // 1. Keyword Match (40%)
        const keywordScore = (matchedKeywords.length / Math.max(jdKeywords.length, 1)) * 40;

        // 2. Section Completeness (20%)
        const completeness = checkSectionCompleteness(resumeData);
        const completenessScore = (completeness.score / 100) * 20;

        // 3. Action Verbs (15%)
        const verbCount = checkActionVerbs(resumeData);
        const actionVerbScore = (verbCount / 10) * 15;

        // 4. Formatting & Links (15%)
        let formattingPoint = 0;
        if (resumeData.personalInfo?.linkedIn) formattingPoint += 5;
        if (resumeData.personalInfo?.github || resumeData.personalInfo?.website) formattingPoint += 5;
        if (resumeData.personalInfo?.phone) formattingPoint += 5;
        const formattingScore = formattingPoint;

        // 5. Experience & Volume (10%)
        const experienceCount = (resumeData.experience?.length || 0) + (resumeData.internships?.length || 0);
        const volumeScore = Math.min(experienceCount * 5, 10);

        const finalScore = Math.round(keywordScore + completenessScore + actionVerbScore + formattingScore + volumeScore);

        // Feedback/Suggestions
        const suggestions = [];
        const jdSpecificSuggestions = [];

        // Standard Suggestions
        if (completeness.missing.length > 0) {
            suggestions.push(`Missing key sections: ${completeness.missing.join(', ')}.`);
        }
        if (verbCount < 5) {
            suggestions.push("Use more action verbs like 'Developed', 'Managed', 'Optimized' in your experience descriptions.");
        }
        if (!resumeData.personalInfo?.linkedIn) {
            suggestions.push("Adding a LinkedIn profile can increase your visibility to recruiters.");
        }
        if (missingKeywords.length > 5) {
            suggestions.push("Consider incorporating more keywords from the job description into your skills section.");
        }


        // JD-Specific Suggestions
        if (jdSpecifics.isSenior && verbCount < 7) {
            jdSpecificSuggestions.push("This is a Senior level role. Highlight your leadership and management impact using verbs like 'Led', 'Mentored', or 'Spearheaded'.");
        }
        if (jdSpecifics.isRemote && !resumeData.additionalInfo?.availability?.toLowerCase().includes('remote')) {
            jdSpecificSuggestions.push("The role mentions 'Remote'. Explicitly state your remote work availability or experience in the summary or additional info.");
        }
        if (jdSpecifics.isAgile && !resumeSkills.some(s => s.toLowerCase().includes('agile') || s.toLowerCase().includes('scrum'))) {
            jdSpecificSuggestions.push("The JD emphasizes Agile/Scrum. Add these to your skills if you have experience with these methodologies.");
        }
        if (jdSpecifics.isCloud && !resumeSkills.some(s => /aws|azure|gcp|cloud/.test(s.toLowerCase()))) {
            jdSpecificSuggestions.push("Cloud platforms (AWS/Azure/GCP) are mentioned. Ensure your cloud expertise is clearly listed.");
        }

        if (suggestions.length === 0 && jdSpecificSuggestions.length === 0) {
            suggestions.push("Your resume looks strong! Ensure it's tailored specifically to this role's unique requirements.");
        }

        // --- Optimization Logic (Phase 2) ---
        const categorizedMissing = categorizeKeywords(missingKeywords.slice(0, 15));
        const optimizedSnippet = generateOptimizedSnippet(missingKeywords, [...actionVerbs].filter(v =>
            [resumeData.careerObjective || '', ...(resumeData.experience || []).map(e => e.description || '')].join(' ').toLowerCase().includes(v)
        ));

        res.json({
            score: Math.min(finalScore, 100),
            matchPercentage: Math.round((matchedKeywords.length / Math.max(jdKeywords.length, 1)) * 100),
            matchedKeywords: [...new Set(matchedKeywords)],
            missingKeywords: missingKeywords.slice(0, 10),
            categorizedMissing,
            optimizedSnippet,
            suggestions,
            jdSpecificSuggestions,
            breakdown: {
                keywords: Math.round(keywordScore),
                completeness: Math.round(completenessScore),
                actionVerbs: Math.round(actionVerbScore),
                formatting: Math.round(formattingScore),
                volume: Math.round(volumeScore)
            }
        });
    } catch (err) {
        console.error('Analysis error:', err);
        res.status(500).json({ error: err.message });
    }
};

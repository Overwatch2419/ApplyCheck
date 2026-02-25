// Simple keyword extraction logic
exports.analyzeJobDescription = async (req, res) => {
    const { jobDescription, resumeSkills } = req.body;

    if (!jobDescription) {
        return res.status(400).json({ error: 'Job description is required' });
    }

    try {
        // Clean text: lowercase and remove special characters
        const cleanJD = jobDescription.toLowerCase().replace(/[^a-z0-9\s]/g, '');
        const words = cleanJD.split(/\s+/);

        // Simple stop-word list
        const stopWords = new Set(['and', 'the', 'is', 'in', 'at', 'of', 'to', 'for', 'with', 'a', 'an', 'on', 'this', 'that', 'from', 'as', 'our', 'we', 'are', 'your', 'you', 'be', 'will', 'must', 'can', 'should']);

        // Extract potential keywords (remove duplicates and stop words)
        const jdKeywords = [...new Set(words.filter(word => word.length > 2 && !stopWords.has(word)))];

        // Comparison logic
        const matchedKeywords = resumeSkills.filter(skill =>
            jdKeywords.includes(skill.toLowerCase())
        );

        const missingKeywords = jdKeywords.filter(keyword =>
            !resumeSkills.some(skill => skill.toLowerCase() === keyword)
        ).slice(0, 10); // Limit missing keywords for now

        // Score calculation (simple version)
        const keywordMatchBonus = (matchedKeywords.length / Math.max(jdKeywords.length, 1)) * 40;

        // Weights per requirements:
        // Keyword Match: 40%
        // Section Completeness: 20% (Assumed for now)
        // Resume Length: 10% (Assumed for now)
        // Action Verbs: 15% (Assumed for now)
        // Formatting: 15% (Assumed for now)

        const finalScore = Math.min(Math.round(keywordMatchBonus + 40), 100); // Base score of 40 + match bonus

        res.json({
            score: finalScore,
            matchPercentage: Math.round((matchedKeywords.length / Math.max(jdKeywords.length, 1)) * 100),
            matchedKeywords,
            missingKeywords,
            suggestions: [
                "Consider adding more skills identified in the JD.",
                "Ensure your experience section uses action verbs like 'Developed', 'Managed', 'Optimized'.",
                "Keep your resume to 1-2 pages for better readability."
            ]
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

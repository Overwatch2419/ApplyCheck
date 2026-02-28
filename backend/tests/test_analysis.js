const { analyzeJobDescription } = require('../controllers/analysisController');

// Mock req and res
const mockRes = {
    json: (data) => {
        console.log('--- Analysis Result ---');
        console.log(JSON.stringify(data, null, 2));
        console.log('-----------------------');
    },
    status: (code) => ({
        json: (err) => console.log('Error', code, err)
    })
};

const testResume = {
    personalInfo: {
        fullName: "Jane Doe",
        email: "jane@example.com",
        linkedIn: "linkedin.com/in/janedoe",
        phone: "123-456-7890"
    },
    skills: {
        programmingLanguages: "JavaScript, Python, C++",
        webDatabase: "React, Node.js, MongoDB",
        otherSkills: "Git, Docker"
    },
    experience: [
        {
            jobTitle: "Senior Developer",
            description: "Developed and optimized scalable web applications using React and Node.js. Led a team of 5 developers."
        }
    ],
    education: [
        { degree: "B.S. Computer Science", school: "University of Tech" }
    ],
    projects: [
        { title: "Project Alpha", description: "Spearheaded the development of a real-time analytics dashboard." }
    ]
};

const jobDescription = "We are looking for a Senior Developer with experience in JavaScript, React, and Node.js. The ideal candidate has lead teams and optimized performance.";

console.log('\nRunning ATS Scoring Test (Good Resume)...');
analyzeJobDescription({ body: { jobDescription, resumeData: testResume } }, mockRes);

const poorResume = {
    personalInfo: { fullName: "Forgot Email" },
    skills: { otherSkills: "Nothing relevant" },
    experience: []
};

console.log('\nRunning ATS Scoring Test (Poor Resume)...');
analyzeJobDescription({ body: { jobDescription, resumeData: poorResume } }, mockRes);

const seniorRemoteJD = "We need a Senior Lead Engineer to join our Remote team. Must have experience with Agile methodologies and Cloud architecture (AWS/Azure).";
console.log('\nRunning ATS Scoring Test (Senior/Remote/Agile JD)...');
analyzeJobDescription({ body: { jobDescription: seniorRemoteJD, resumeData: testResume } }, mockRes);

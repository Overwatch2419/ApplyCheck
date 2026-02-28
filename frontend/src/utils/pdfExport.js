// pdfExport.js - Utility to generate PDF of the resume preview using html2pdf.js
// Ensure html2pdf is installed: npm install html2pdf.js

export const exportPdf = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id '${elementId}' not found.`);
        return;
    }
    const opt = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    // eslint-disable-next-line no-undef
    window.html2pdf().from(element).set(opt).save();
};

import PDFDocument from "pdfkit";

export const pdfDownload = async (req, res) => {
  const { result } = req.body;

  if (!result) {
    return res.status(400).json({ message: "Result data is required" });
  }

  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="ExamNotesAI.pdf"'
  );

  doc.pipe(res);

  doc.fontSize(20).text("ExamNotes AI", { align: "center" });
  doc.moveDown();

  doc.fontSize(16).text(`Importance : ${result.importance}`);
  doc.moveDown();

  doc.fontSize(16).text("Sub Topics");
  doc.moveDown(0.5);

  Object.entries(result.subTopics).forEach(([star, topics]) => {
    doc.moveDown(0.5);
    doc.fontSize(13).text(`${star} Topics:`);

    if (Array.isArray(topics)) {
      topics.forEach((t) => {
        doc.fontSize(12).text(`- ${t}`);
      });
    }
  });

  doc.moveDown();
  doc.fontSize(16).text("Detailed Notes");
  doc.moveDown(0.5);

  if (result.notes) {
    doc.fontSize(12).text(result.notes.replace(/[#*]/g, ""));
  }

  doc.moveDown();
  doc.fontSize(16).text("Revision Points");
  doc.moveDown(0.5);

  if (Array.isArray(result.revisionPoints)) {
    result.revisionPoints.forEach((p) => {
      doc.fontSize(12).text(`- ${p}`);
    });
  }

  doc.moveDown();
  doc.fontSize(16).text("Important Questions");
  doc.moveDown(0.5);

  doc.fontSize(12).text("Short Questions:");
  if (Array.isArray(result.shortQuestions)) {
    result.shortQuestions.forEach((q) => {
      doc.fontSize(12).text(`- ${q}`);
    });
  }

  doc.moveDown(0.5);
  doc.fontSize(12).text("Long Questions:");
  if (Array.isArray(result.longQuestions)) {
    result.longQuestions.forEach((q) => {
      doc.fontSize(12).text(`- ${q}`);
    });
  }

  doc.moveDown(0.5);
  doc.fontSize(16).text("Diagram Questions");
  doc.moveDown(0.5);

  if (result?.questions?.diagram) {
    doc.fontSize(12).text(result.questions.diagram);
  }

  doc.end();
};
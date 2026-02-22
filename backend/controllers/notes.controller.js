import Notes from "../models/notes.model.js";

export const getMyNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.userId })
      .select(
        "topic classLevel examType revisionMode includeDiagram includeChart createdAt"
      )
      .sort({ createdAt: -1 });

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: "Notes not found" });
    }

    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

export const getSingleNotes = async (req, res) => {
  try {
    const notes = await Notes.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!notes) {
      return res.status(404).json({ message: "Notes not found" });
    }

    return res.json({
      content: notes.content,
      topic: notes.topic,
      createdAt: notes.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};
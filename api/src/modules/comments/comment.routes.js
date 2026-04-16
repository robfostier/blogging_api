import express from 'express';
import Comment from './comment.model.js';

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true}
        )

        if (!updatedComment) {
            return res.status(404).json({ message: "Commentaire introuvable" });
        }

        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la modification", error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const commentToDelete = await Comment.findByIdAndDelete(id);

        if (!commentToDelete) {
            return res.status(404).json({ message: "Commentaire introuvable" });
        }

        res.status(200).json({ message: "Commentaire supprimé"});
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
    }
});

export default router;
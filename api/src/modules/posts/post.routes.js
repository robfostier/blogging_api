import express from 'express';
import Post from './post.model.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { title, content, author, tags } = req.body;
        const blogPost = new Post({title, content, author, tags});
        const blogPostRes = await blogPost.save();
        res.status(201).json(blogPostRes);
    } catch (error) {
        res.status(400).json({message: "Echec dans la création de l'article", error: error.message});
    }
});

router.get('/', async (req, res) => {
    try {
        let filter = {};

        if (req.query.tag) {
            filter.tags = req.query.tag;
        }

        if (req.query.author) {
            filter.author = req.query.author;
        }

        if (req.query.date) {
            filter.createdAt = { $gte: new Date(req.query.date)};
        }

        const posts = await Post.find(filter);

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({message: "Erreur lors de la récupération des articles", error: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({message: "Article introuvable"});
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: "Erreur lors de la récupération de l'article", error: error.message})
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedPost) {
            return res.status(404).json({message: "Article introuvable"});
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({message: "Erreur lors de la modifcation de l'article", error: error.message})
    };
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({message: "Article introuvable"});
        }

        res.status(200).json({message: "L'article a bien été supprimé."});
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'article", error: error.message });
    }
});

export default router;
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

router.get('/', (req, res) => {
    res.send("Blabla")
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

router.put('/:id', (req, res) => {
    res.send("Blabla")
});

router.delete('/:id', (req, res) => {
    res.send("Blabla")
});

export default router;
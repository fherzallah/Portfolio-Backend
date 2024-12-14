const { Publication } = require('../models/publication');
const express = require('express');
const router = express.Router();

// GET all publications
router.get(`/`, async (req, res) => {
    try {
        const publications = await Publication.find();
        res.status(200).send(publications);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch publications', error });
    }
});

// GET a single publication by ID
router.get('/:id', async (req, res) => {
    try {
        const publication = await Publication.findById(req.params.id);
        if (!publication) {
            return res.status(404).json({ message: 'Publication not found' });
        }
        res.status(200).send(publication);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the publication', error });
    }
});

// POST a new publication
router.post('/', async (req, res) => {
    try {
      const { title, abstract, pdfUrl, year, type, doi, recommendedCitation } = req.body;
      
      // Basic validation for required fields
      if (!title || !abstract || !year || !type) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Add the publication to the database
      const publication = new Publication({
        title,
        abstract,
        pdfUrl,
        year,
        type,
        doi,
        recommendedCitation,
      });
  
      await publication.save();
      res.status(201).json({ message: 'Publication added successfully!' });
    } catch (error) {
      console.error('Error saving publication:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// PUT update a publication by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedPublication = await Publication.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                abstract: req.body.abstract,
                pdfUrl: req.body.pdfUrl,
                year: req.body.year,
                type: req.body.type,
                doi: req.body.doi,
                recommendedCitation: req.body.recommendedCitation,
            },
            { new: true } // Return the updated document
        );

        if (!updatedPublication) {
            return res.status(404).send('The publication with the given ID was not found');
        }

        res.status(200).send(updatedPublication);
    } catch (error) {
        res.status(500).send({ message: 'The publication cannot be updated', error });
    }
});

// DELETE a publication by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedPublication = await Publication.findByIdAndRemove(req.params.id);
        if (!deletedPublication) {
            return res.status(404).json({ success: false, message: 'Publication not found' });
        }
        res.status(200).json({ success: true, message: 'The publication is deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete the publication', error });
    }
});

module.exports = router;

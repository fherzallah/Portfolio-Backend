const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true, // Title is essential for a publication
    },
    abstract: {
        type: String,
        
    },
    pdfUrl: {
        type: String,
        required: true, // URL to the PDF file
    },
    year: {
        type: String,
        required: true, // Year of the publication
    },
    type: {
        type: String,
        required: true, // Type of publication, e.g., "Published Articles"
        enum: ['Published Articles', 'Accepted Articles', 'Under Review'], // Ensures predefined values
    },
    doi: {
        type: String,
        required: false, // DOI might not always be available
    },
    recommendedCitation: {
        type: String,
        required: false, // Citation might be optional
    },
});

publicationSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

publicationSchema.set('toJSON', {
    virtuals: true,
});

exports.Publication = mongoose.model('Publication', publicationSchema);

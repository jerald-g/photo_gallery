const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Set up storage for uploaded photos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './public/uploads';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        // Save with timestamp to avoid duplicates
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// View engine setup
app.set('view engine', 'ejs');

// Static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    const directoryPath = path.join(__dirname, 'public/uploads');
    
    // Create uploads folder if it doesn't exist yet
    if (!fs.existsSync(directoryPath)){
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan files!');
        }
        // Filter for image files only
        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.render('index', { images: images });
    });
});

app.post('/upload', upload.single('photo'), (req, res) => {
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
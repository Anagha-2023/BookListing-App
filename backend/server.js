import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import bookRoutes from './routes/books.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors(
    {
        origin: ["https://deploy-mern-1whq.vercel.app"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
));

// Routes
app.use('/api/books', bookRoutes);

//Server Production assets
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join("frontend/build")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

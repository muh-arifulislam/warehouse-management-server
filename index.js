const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();

// midleware 
app.use(cors());
app.use(express.json())
app.use(dotenv());
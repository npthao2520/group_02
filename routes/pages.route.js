const express = require('express');
const { renderPage } = require('../controllers/pages.controller');

const router = express.Router();

// Định nghĩa các route cho các trang
router.get('/', async (req, res) => {
  await renderPage('firstpage', res);
});

router.get('/login', async (req, res) => {
  await renderPage('login', res);
});

router.get('/register', async (req, res) => {
  await renderPage('register', res);
});

router.get('/list', async (req, res) => {
  await renderPage('list', res);
});

router.get('/create', async (req, res) => {
  await renderPage('create', res);
});

router.get('/quiz', async (req, res) => {
  await renderPage('quiz', res);
});

router.get('/flashcard', async (req, res) => {
  await renderPage(`flashcard`, res);
});

router.get('/user', async (req, res) => {
  await renderPage('profile', res);
});

module.exports = router;
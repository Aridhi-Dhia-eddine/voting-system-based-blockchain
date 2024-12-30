const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(bodyParser.json());

// Configurer le transporteur Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Remplacez par votre serveur SMTP
    port: 587, // Port SMTP, utilisez 465 pour SSL
    secure: false,
    auth: {
        user: 'dhiadhia045@gmail.com',
        pass: 'opujmuxlpqbbwpsh'
    }
});

// Route pour envoyer un email
app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: 'dhiadhia045@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de l\'envoi de l\'email');
        } else {
            console.log('Email envoyé : ' + info.response);
            res.status(200).send('Email envoyé');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
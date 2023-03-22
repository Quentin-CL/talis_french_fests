import mongoose from 'mongoose';
import Fest from '../models/fest.js';
import Review from '../models/review.js';
import fests from './festivals_select.js';
mongoose.connect("mongodb://localhost:27017/french-fests");

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database connected");
});


// const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Fest.deleteMany({});
    await Review.deleteMany({});
    for (const fest of fests) {

        const festFields = fest.fields;
        let category = festFields.sous_categorie_musique;
        if (festFields.sous_categorie_musique) {
            category = festFields.sous_categorie_musique.split(', ')
        }
        const newFest = new Fest({
            title: festFields.nom_du_festival,
            description: festFields.description,
            image: festFields.image,
            attendance: festFields.frequentation,
            mailing_adress: festFields.adresse_postale,
            municipality: festFields.commune_principale_de_deroulement,
            zip_code: festFields.code_postal_de_la_commune_principale_de_deroulement,
            creation_year: festFields.annee_de_creation_du_festival,
            website: festFields.site_internet_du_festival,
            mail: festFields.adresse_e_mail,
            period: festFields.periode_principale_de_deroulement_du_festival,
            geometry: fest.geometry,
            category,
            favorite: ['Solidays', 'Lollapalooza', 'Electrobeach Music Festival', 'Au fil du son', 'Garorock', 'Delta festival'].includes(festFields.nom_du_festival) ? true : false

            // geometry: { type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude] },
            // images: [
            //     {
            //         url: 'https://res.cloudinary.com/dnofzucxg/image/upload/v1672569929/Yelpcamp/qvhwfm9wqbpj6fi3exho.jpg',
            //         filename: 'Yelpcamp/qvhwfm9wqbpj6fi3exho',
            //     },
            //     {
            //         url: 'https://res.cloudinary.com/dnofzucxg/image/upload/v1672569942/Yelpcamp/card4u5rzpdbtvop8xnf.jpg',
            //         filename: 'Yelpcamp/card4u5rzpdbtvop8xnf',
            //     }
            // ]

        });
        await newFest.save();

    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
import mongoose from 'mongoose';
import Fest from '../models/fest.js';
import fests from './festivals.js';
mongoose.connect("mongodb://localhost:27017/french-fests");

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database connected");
});


// const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Fest.deleteMany({});
    for (const fest of fests) {
        const regexYear = /^\d{4}$/;
        const regexZip = /^\d{5}$/;
        const festFields = fest.fields;
        const isYear = regexYear.test(festFields.annee_de_creation_du_festival);
        const isZip = regexZip.test(festFields.code_postal_de_la_commune_principale_de_deroulement);
        // const random1000 = Math.floor(Math.random() * 1000);
        // const price = Math.floor(Math.random() * 20) + 10;
        if (festFields.discipline_dominante === "Musique" && fest.geometry && isYear && isZip) {
            let category = festFields.sous_categorie_musique;
            if (festFields.sous_categorie_musique) {
                category = festFields.sous_categorie_musique.split(', ')
            }
            const newFest = new Fest({
                title: festFields.nom_du_festival,
                // description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt veritatis earum velit facilis. At veritatis beatae perspiciatis optio ullam nostrum voluptatem voluptate itaque ipsa, doloremque facere animi, recusandae officiis esse!",
                mailing_adress: festFields.adresse_postale,
                municipality: festFields.commune_principale_de_deroulement,
                zip_code: festFields.code_postal_de_la_commune_principale_de_deroulement,
                creation_year: festFields.annee_de_creation_du_festival,
                website: festFields.site_internet_du_festival,
                mail: festFields.adresse_e_mail,
                period: festFields.periode_principale_de_deroulement_du_festival,
                geometry: fest.geometry,
                category

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
}

seedDB().then(() => {
    mongoose.connection.close();
});
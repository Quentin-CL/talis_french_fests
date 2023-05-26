import BaseJoi from "joi";
import sanitizeHtml from "sanitize-html";
const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} ne doit pas inclure d\'HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value });
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

const currentYear = new Date().getFullYear();
const categorySchema = Joi.array().items(Joi.string().allow('').escapeHTML());

export const festSchema = Joi.object({
    fest: Joi.object({
        title: Joi.string().required().escapeHTML(),
        category: categorySchema,
        attendance: Joi.number().required().min(0),
        mailing_adress: Joi.string().allow('').escapeHTML(),
        zip_code: Joi.number().required().min(10000).max(99999),
        municipality: Joi.string().escapeHTML(),
        creation_year: Joi.number().required().min(1800).max(currentYear),
        website: Joi.string().uri({ scheme: ['http', 'https'], allowRelative: true }).required(),
        mail: Joi.string().email().allow(''),
        period: Joi.string().valid('Avant-saison (1er janvier - 20 juin)', 'Saison (21 juin - 5 septembre)', 'Après-saison (6 septembre - 31 décembre)').required(),
        // image: Joi.string().required(),
        description: Joi.string().allow('').escapeHTML(),
    }),
    deletedImage: Joi.string()
});

export const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        body: Joi.string().escapeHTML()
    }).required()
})
export const reviewSchemaUpdate = Joi.object({
    'body': Joi.string().escapeHTML().required()
})
import Fest from '../models/fest.js';



export const renderDashboard = async (req, res) => {
    const fests = await Fest.find({});
    res.render('admin/dashboard', { fests, boostrap: true });
}
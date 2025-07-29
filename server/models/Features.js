const mongoose = require("mongoose");

const FeatureSchema = new mongoose.Schema({
    image:String,
},{timestamp:true});

module.exports = mongoose.model("Features", FeatureSchema);
const applicationModel = require("../models/applicationModel");

const findSubstring = (pat, str) => {
    const normalizedStr = str.replace(/\s/g, '').toLowerCase();
    const normalizedPat = pat.toLowerCase();

    return normalizedStr.includes(normalizedPat);
};

const helper = (pat, haystack) => {
    const normalizedPat = pat.toLowerCase();
    const results = [];

    for (let i = 0; i < haystack.length; i++) {
        const jobTitle = haystack[i].jobTitle;
        if (findSubstring(normalizedPat, jobTitle)) {
            results.push(haystack[i]);
        }
    }

    return results;
};

const recommendController = async (req, res) => {
    try {
        const interests = req.body;
        console.log(interests);

        const recommendedData = [];
        const data = await applicationModel.find();

        for (let i = 0; i < interests.length; i++) {
            const matchedJobs = helper(interests[i], data);
            recommendedData.push(...matchedJobs);  // Flatten the array of arrays
        }

        const plainData = recommendedData.map(item => item.toObject());
        console.log(plainData);

        return res.status(201).send({
            success: true,
            message: 'Recommended Data',
            recommendedData: plainData,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in fetching',
            error,
        });
    }
};

module.exports = recommendController;

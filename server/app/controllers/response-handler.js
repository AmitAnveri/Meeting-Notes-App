//Success reponse handler
const sendSuccess = (res, data, statusCode = 200) => {
    res.status(statusCode).json(data);
};

//Error response handler
const sendError = (res, error, statusCode = 500) => {
    res.status(statusCode).json({
        message: error.message
    });
};

export {
    sendSuccess,
    sendError
};
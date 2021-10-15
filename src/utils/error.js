module.exports = {
    getError: (code, message = '') => {
        const err = new Error(message);
        err.statusCode = code;
        return err;
    },
};

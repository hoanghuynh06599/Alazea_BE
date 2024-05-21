const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
        Error: {
            message: err.message || 'Internal Server Error',
            status: err.status || 500,
            field: err.field || ""
        }
    });
}

export default errorHandler

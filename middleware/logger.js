const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().toLocaleString();
    console.log(`\n-- ${method} ${url} ${time}`);
    next()
}

export default logger;
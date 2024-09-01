const getJSONString = obj => {
    return JSON.stringify(obj, null, 2);
};

const sendErrorResponse = res => {
    res.writeHead(httpStatus.NOT_FOUND, {
        "Content-Type": "tetx/html"
    });
    res.write("<h1>File Not Found!</h1>");
    res.end();
};

const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    fs = require('fs'),
    app = http.createServer();

    app.on("request", (req, res) => {
        let body = [];
        req.on("data", (bodyData) => {
            body.push(bodyData);
        });

        let url = req.url;
        if (url.indexOf(".html") !== -1) {
            res.writeHead(httpStatus.OK, {
                "Content-Type": "text/html"
            });
            customReadFile(`./views${url}`, res);
        }   else if (url.indexOf(".js") !== -1) {
            res.writeHead(httpStatus.OK, {
                "Content-Type": "text/javascript"
            });
            customReadFile(`./public/js${url}`, res);
        }   else if (url.indexOf(".css") !== -1) {
            res.writeHead(httpStatus.OK, {
                "Content-Type": "text/css"
            });
            customReadFile(`./public/css${url}`, res);
        }   else if (url.indexOf(".png") !== -1) {
            res.writeHead(httpStatus.OK, {
                "Content-Type": "image/png"
            });
            customReadFile(`./public/images${url}`, res);
        }   else {
            sendErrorResponse(res);
        }

        req.on("end", () => {
            body = Buffer.concat(body).toString();
            console.log(`Request Body Contents: ${body}`);
        });

        console.log(`Method: ${getJSONString(req.method)}`);
        console.log(`URL: ${getJSONString(req.url)}`);
        console.log(`Headers: ${getJSONString(req.headers)}`);

    });

    app.listen(port);
    console.log(`The server has just started and is listening on port ${port}`);

    const customReadFile = (file_path, res) => {
        if (fs.existsSync(file_path)) {
            fs.readFile(file_path, (error, data) => {
                if (error) {
                    console.log(error);
                    sendErrorResponse(res);
                    return;
                }
                res.write(data);
                res.end();
            });
        }   else {
            sendErrorResponse(res);
        }
    };

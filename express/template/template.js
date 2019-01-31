module.exports = {
    template:function(loginOrLogout='<a href="/page/login">LOGIN</a>',Form='') {
        return (
            `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8" />
                <title></title>
            </head>
            <body>
                <h1>WELCOME</h1>
                ${loginOrLogout}<br>
                <a href="/page/auth">USER_ONLY</a>
                ${Form}
            </body>
            </html>
            `
        );
    },
    isLogged:function(req) {
        let logged;
        if(req.session.isLogged === true) {
            logged = true;
        }else {
            logged = false;
        }
        return logged;
    },
    printAnchor:function(req) {
        let anchor;
        const toggle = this.isLogged(req);
        if(toggle === true) {
            anchor = `${req.session.name} || <a href="/page/logout">LOG-OUT</a>`;
        }else {
            anchor = `<a href="/page/login">LOGIN</a>`;
        }
        return anchor;
    }
}
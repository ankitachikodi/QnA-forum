let DBContext = require('./DBContext');

let User = () =>{}

User.getLogin = (username, output) => {
    let sql = `SELECT ID, email, password, extra from User WHERE username='${username}'`;
    DBContext.query(sql, (err,result) => {
        if(result === undefined) { err = 'Server Error'; }
        else if(result.length === 0) { err = 'Username not found'; }
        output(err,result);
    })
}

User.SignUp = (data, output) => {
    let sql = `insert INTO User (\`email\`,\`username\`,\`password\`,\`extra\`) values ('${data.email}','${data.username}','${data.password}','${data.extra}')`;
    DBContext.query(sql, (err,result) => {
        output(err, result);
    })
}

User.checkExistingAccount = (email, username, output) => {
    let sql = `SELECT username, email FROM User WHERE email = '${email}' OR username='${username}'`;
    DBContext.query(sql, (err,result) => {
        output(err,result);
    })
}

module.exports = User;
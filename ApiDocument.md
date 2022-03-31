/******GetAllUser*****/
(GET)> https://foodscape-jwt.herokuapp.com/api/auth/users

/******Register*****/
(POST)> https://foodscape-jwt.herokuapp.com/api/auth/register

/******Login*****/
(POST) => https://foodscape-jwt.herokuapp.com/api/auth/login

/******UserInfo*****/
(GET) => https://foodscape-jwt.herokuapp.com/api/auth/userinfo
(Header) => {'x-access-token':'token value from login'}
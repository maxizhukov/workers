const environment = {
  baseUrl: "http://localhost:8000/api/"
};

switch (process.env.REACT_APP_ENV) {
case "development":
  environment.baseUrl = "http://localhost:8000/api/";
  break;
case "production":
  environment.baseUrl = "http://localhost:8000/api/";
  break;
case "local":
  environment.baseUrl = "http://localhost:8000/api/";
  break;
default:
  environment.baseUrl = "http://localhost:8000/api/";
  break;
}

export default environment;

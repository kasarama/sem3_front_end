function URL() {
  return {
    server: "http://localhost:8080/sem3",
    categories: "https://api.chucknorris.io/jokes/categories",
    cars: "https://reqres.in/api/car/",
    mentors: "http://dummy.restapiexample.com/public/api/v1/employees",
    target: "http://jsonplaceholder.typicode.com/comments/",
    newPack: "http://localhost:8080/sem3/api/info/newpack",
  };
}
const url = URL();
export default url;

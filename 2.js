fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "0280092d-0304-4fd9-a855-09d04b9ad5a3",
  },
  body: JSON.stringify({
    isLiked: false,
    _id: "670ffe8fc26271001a120bd3",
    name: "Sebas Herrera",
    link: "www.google.com",
    owner: "66580699c0e236433e7de561",
    createdAt: "2024-10-16T17:57:35.839Z",
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Respuesta del servidor:", data);
  })
  .catch((error) => {
    console.error("Hubo un error:", error);
  });

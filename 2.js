const tastySweets = {
  breakfast: "jam",
  lunch: "honey",
  dinner: "fudge",
};
const { breakfast, lunch, dinner } = tastySweets;

console.log(breakfast, lunch, dinner);

const comida = { sabor: "fresa", platillo: "helado" };
const queHay = ({ sabor, platillo }) => {
  return `Hoy hay ${platillo} de ${sabor}`;
};
console.log(queHay(comida));

const countUserPosts = ({ posts }) => {
  return posts.length;
};

const user1 = {
  id: 2294611830,
  username: "leonardo.dv",
  posts: [
    { comment: "Hombre de Vitruvio", dateCreated: 1490 },
    { comment: "Retrato de un músico", dateCreated: 1490 },
    {
      comment: "Retrato de un hombre con tiza roja #autorretrato",
      dateCreated: 1512,
    },
  ],
};

countUserPosts(user1);
console.log(countUserPosts(user1));

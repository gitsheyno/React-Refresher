const fetchBreed = async ({ queryKey }) => {
  const animal = queryKey[1];

  if (!animal) return [];

  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );

  if (!apiRes.ok) {
    throw new Error(`details/${animal} fetch not ok`);
  }

  //returns Promise

  return apiRes.json();
};

export default fetchBreed;

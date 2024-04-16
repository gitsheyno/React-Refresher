const fetchSearch = async ({ queryKey }) => {
  console.log(queryKey[1], "q");
  const { animal, location, breeds } = queryKey[1];

  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breeds}`
  );

  if (!res.ok) {
    throw new Error(`pet search is not ok`);
  }

  return res.json();
};

export default fetchSearch;

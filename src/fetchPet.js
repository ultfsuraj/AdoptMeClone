const fetchPet = async ({ queryKey }) => {
  const id = queryKey[1];

  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  // react query expects to throw error if not success
  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not work`);
  }

  // expects to return promise

  return apiRes.json();
};

export default fetchPet;

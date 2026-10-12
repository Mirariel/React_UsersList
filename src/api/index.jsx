function getUsers(options) {
  const defaultOptions = {
    page: 1,
    results: 5,
    seed: "od2026",
    inc: ["email", "name", "dob", "picture", "gender"],
  };
  const { page, results, seed, inc } = { ...defaultOptions, ...options };

  const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=${results}&inc=${inc}`;

  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  });
}

export default getUsers;

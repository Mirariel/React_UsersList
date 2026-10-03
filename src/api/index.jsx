function getUsers(options){
    const defaultOptions = {
        page: 1,
        results:5,
        seed: 'od2026',
        inc: ['email', 'name', 'dob', 'picture']
    };
    const realOptions = {...defaultOptions, ...options};
    const {page, results, seed, inc} = realOptions

    return fetch(`https://randomuser.me/api/?seed=${seed}&page=${page}&results=${results}&inc=${inc}`).then((response) => response.json())
}

export default getUsers
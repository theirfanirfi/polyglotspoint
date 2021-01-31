export const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

export const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}
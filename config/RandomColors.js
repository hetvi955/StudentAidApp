function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

const colors = ["#ff4f4f", "#ff724f", "#ffb94f", "#4fc7ff", "#5b4fff", "#ad4fff", "#ff4f87"];

const RandomColor = () => {
    const index = getRndInteger(0,6);
    return colors[index];
};

export default RandomColor;

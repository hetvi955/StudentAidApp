const random = () => '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

export default random;

export default function makeHashtagArray (string) {
    const newString = string.replace(/\s/g,'');
    const array = newString.split('#').filter((item, i) => i !== 0 );
    return array;
}
export default function makeHashtagArray (string) {
    const newString = string.replace(/\s/g,'');
    const array = newString.split('#').filter((item, i) => i !== 0 );
    return array;
}

export function camelcaseToArray (string) {
    console.log(string);
    return (string.replace(/([a-z0-9])([A-Z])/g, '$1 $2')).split(" ");
}
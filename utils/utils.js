
export default function getFullDate(datetime) {
    const date = datetime.getDate();
    const month = datetime.getMonth() + 1;
    const hours = datetime.getHours();
    const minutes = datetime.getMinutes();
    const seconds = datetime.getSeconds();
    return `${date < 10 ? '0' + date : date}/${month < 10 ? '0' + month : month}/${datetime.getFullYear()} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}
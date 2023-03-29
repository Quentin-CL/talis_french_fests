
export function getFullDate(datetime) {
    const date = datetime.getDate();
    const month = datetime.getMonth() + 1;
    const hours = datetime.getHours();
    const minutes = datetime.getMinutes();
    const seconds = datetime.getSeconds();
    return `${date < 10 ? '0' + date : date}/${month < 10 ? '0' + month : month}/${datetime.getFullYear()} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}

export function getTodayAndLastWeekReviewsCount(reviews) {
    const today = new Date();
    const oneDayAgo = new Date();
    const sixDaysAgo = new Date();
    sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
    oneDayAgo.setHours(0, 0, 0, 0);
    sixDaysAgo.setHours(0, 0, 0, 0);
    return reviews.reduce((count, review) => {
        const festId = review.fest._id;
        const reviewDate = new Date(review.createDate);
        if (reviewDate >= oneDayAgo && reviewDate < today) {
            count[festId] = (count[festId] || {});
            count[festId]['today'] = (count[festId]['today'] || 0) + 1;
        }
        else {
            count[festId] = (count[festId] || { 'today': 0 });
        }
        if (reviewDate >= sixDaysAgo && reviewDate < today) {
            count[festId] = (count[festId] || {});
            count[festId]['week'] = (count[festId]['week'] || 0) + 1;
        }
        else {
            count[festId] = (count[festId] || { 'week': 0 });
        }
        return count;
    }, {});
}
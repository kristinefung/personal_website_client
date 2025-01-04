const getRandomString = (length: number) => {
    let str = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        str += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return str;
}

const getMonthOptions = () => {
    const months = [
        { label: 'Select month', value: 0 },
        { label: 'Jan', value: 1 },
        { label: 'Feb', value: 2 },
        { label: 'Mar', value: 3 },
        { label: 'Apr', value: 4 },
        { label: 'May', value: 5 },
        { label: 'Jun', value: 6 },
        { label: 'Jul', value: 7 },
        { label: 'Aug', value: 8 },
        { label: 'Sep', value: 9 },
        { label: 'Oct', value: 10 },
        { label: 'Nov', value: 11 },
        { label: 'Dec', value: 12 },
    ];

    return months;
}

const readableDate = (
    startMonth: number,
    startYear: Number,
    endMonth: number,
    endYear: number,
    isCurrent: boolean
) => {
    let date = '';
    const months = getMonthOptions();

    const startMonthStr = months.find(m => m.value === startMonth);
    const startMonthShortStr = startMonthStr ? startMonthStr.label : '';

    date = `${startMonthShortStr} ${startYear}`;

    if (isCurrent) {
        date += ` - Present`
    } else {
        const endMonthStr = months.find(m => m.value === endMonth);
        const endMonthShortStr = endMonthStr ? endMonthStr.label : '';
        date += ` - ${endMonthShortStr} ${endYear}`
    }

    return date
}

export {
    getRandomString,
    getMonthOptions,
    readableDate,
}
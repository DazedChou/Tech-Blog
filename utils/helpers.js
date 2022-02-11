module.exports = {
    get_date: () => {
        const d = new Date();
        return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`
    }
};
const employmentMarkup = (meData) => {
    let markup = `working at <b>${meData.work[0].company}</b>`;
    if (meData.work[0].company === 'unemployed') {
        markup = `<span>looking for work, <a href="mailto:${meData.contact.email}" class="looking-for">get in touch</a></span>`;
    }
    return {__html: markup};
}

export const employmentText = (meData) => {
    if (meData.work[0].company === 'unemployed') {
        return `I'm looking for work (get in touch if you feel like it!)`;
    }
    return `work in ${meData.based} at ${meData.work[0].company}`;
};

export default employmentMarkup;

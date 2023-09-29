interface employment {
  company: string
}

interface meData {
  based: boolean
  contact: {
    email: string
  }
  location: string
  work: employment[]
}

const employmentMarkup = (meData: meData) => {
  let markup = `working in <b class="text-4xl">${meData.work[0].company}</b>`;
  if (meData.work[0].company === 'unemployed') {
    markup = `<span>looking for work, <a href="mailto:${meData.contact.email}" class="transition-color text-4xl hover:text-blue-600">get in touch</a></span>`;
  }
  return markup;
}

export const employmentText = (meData: meData) => {
  if (meData.work[0].company === 'unemployed') {
    return `I'm looking for work (get in touch if you feel like it!)`;
  }

  if (!meData.based) {
    return `work in ${meData.location} at ${meData.work[0].company}`
  }

  return `work in ${meData.based} at ${meData.work[0].company}`;
};

export default employmentMarkup;

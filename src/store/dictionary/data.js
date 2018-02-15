// @flow
import { capitalize } from 'lodash';
import type { Dictionary } from '../types';

const data: Dictionary = {
  mode: 'default',
  entries: createEntries([
    'abdominal; ˌabˈdämən(ə)l; relating to the abdomen; Abdominal pain.; gastric, intestinal',
    'adhere; ədˈhir; believe in and follow the practices of; the people adhere to the Muslim religion.:the account adhered firmly to fact.; abide by, stick to, hold to, comply with, act in accordance with, conform to, submit to',
    'adjacent; əˈjās(ə)nt; next to or adjoining something else; Adjacent rooms: The area adjacent to the fire station; adjoining, neighboring, next-door',
    'admission; ədˈmiSHən; a statement acknowledging the truth of something; an admission of guilt: a tacit admission that things had gone wrong: a man who, by his own admission, fell in love easily; confession, acknowledgment, mea culpa',
    'adolescent; ˌadəˈles(ə)nt; (of a young person) in the process of developing from a child into an adult; his adolescent years; teenager, youngster, young person',
    'adverse; adˈvərs; preventing success or development; taxes are having an adverse effect on production: adverse weather conditions; unfavorable, harmful, detrimental',
    "affirm; əˈfərm; assert strongly and publicly; he affirmed the country's commitment to peace; declare, state, assert",
    'basin; ˈbās(ə)n; a wide, round open container, especially one used for holding liquid; she poured water into the basin; bowl, dish, pan',
    'bargain; ˈbärɡən; an agreement between two or more parties as to what each party will do for the other; the extraconstitutional bargain between the northern elite and the southern planters; agreement, arrangement, understanding, deal',
    'bizarre; bəˈzär; very strange or unusual, especially so as to cause interest or amusement; her bizarre dresses and outrageous hairdos; strange, peculiar, odd, funny, curious, outlandish, outré, abnormal',
    'dispense; dəˈspens; distribute or provide (a service or information) to a number of people; the machines dispense a range of drinks and snacks; distribute, pass around, hand out, dole out, dish out, share out',
    "exert; iɡˈzərt; (exert oneself) make a physical or mental effort; he needs to exert himself to try to find an answer.; strive, try hard, make an/every effort, endeavor, do one's best, do one's utmost, give one's all, push oneself, drive oneself, work hard",
    'halcyon; ˈhalsēən; denoting a period of time in the past that was idyllically happy and peaceful; the halcyon days of the mid-1980s, when profits were soaring.; happy, golden, idyllic, carefree, blissful, joyful, joyous, contented',
    'incentive; inˈsen(t)iv; a thing that motivates or encourages one to do something; there is no incentive for customers to conserve water.; inducement, motivation, motive, reason, stimulus, stimulant, spur, impetus, encouragement, impulse',
  ]),
};

function createEntries(entries) {
  return entries.map((entry, index) => {
    const data = entry.split(';');
    return {
      id: index,
      word: data[0].trim(),
      transcription: data[1].trim(),
      definition: data[2].trim(),
      examples: data[3]
        .trim()
        .split(':')
        .map((i) => i.trim())
        .map(capitalize),
      thesaurus: data[4].trim().split(','),
      learnt: false,
    };
  });
}

export default data;

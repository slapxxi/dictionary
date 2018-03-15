// @flow
import { capitalize } from 'lodash';
import type { Dictionary } from '../types';

// Use ':' to divide example sentences.
const data: Dictionary = {
  index: 0,
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
    'bulge; bəlj; swell or protrude to an unnatural or incongruous extent; the veins in his neck bulged: he stared with bulging eyes; swell, stick out, puff out, balloon (out), bug out, fill out, belly, distend, tumefy, intumesce',
    'compel; kəmˈpel;force or oblige (someone) to do something; a sense of duty compelled Harry to answer her questions; force, pressure, press, push, urge',
    'indulge; inˈdəlj; allow oneself to enjoy the pleasure of; we indulged in some hot fudge sundaes; satisfy, gratify, fulfill, feed, accommodate',
    'marrow; ˈmerō; (also bone marrow) a soft fatty substance in the cavities of bones, in which blood cells are produced (often taken as typifying strength and vitality); a sight which chilled me to the marrow; red marrow, spinal marrow, marrow and pith',
    'morbid; ˈmôrbəd; characterized by or appealing to an abnormal and unhealthy interest in disturbing and unpleasant subjects, especially death and disease; he had long held a morbid fascination with the horrors of contemporary warfare; ghoulish, macabre, unhealthy, gruesome, unwholesome',
    'ponderous; ˈpänd(ə)rəs; slow and clumsy because of great weight; her footsteps were heavy and ponderous; clumsy, heavy, awkward, lumbering, slow, cumbersome, ungainly, graceless, uncoordinated, blundering',
    "yeast; yēst; a microscopic fungus consisting of single oval cells that reproduce by budding, and are capable of converting sugar into alcohol and carbon dioxide; a grayish-yellow preparation of yeast obtained chiefly from fermented beer, used as a fermenting agent, to raise bread dough, and as a food supplement; brewer's yeast",
    'wail; wāl; give a cry of pain, grief, or anger; Tina ran off wailing: “But why?” she wailed.; howl, weep, cry, sob, moan, groan, keen, lament, yowl, snivel, whimper, whine, bawl, shriek, scream, yelp, caterwaul',
    "volition; vōˈliSH(ə)n; the faculty or power of using one's will; without conscious volition she backed into her office: they choose to leave early of their own volition; of one's own free will, of one's own accord, by choice, by preference",
    'sundry; ˈsəndrē; of various kinds, several; lemon rind and sundry herbs; various, varied, miscellaneous, assorted, mixed, diverse, diversified; several, numerous, many, manifold, multifarious, multitudinous',
    'splice; splīs; join or connect (a rope or ropes) by interweaving the strands; we learned how to weave and splice ropes: the work splices detail and generalization: a cord was spliced on; interweave, braid, plait, entwine, intertwine, interlace, knit, mesh',
    'congruent; kənˈɡro͞oənt; in agreement or harmony; the rules may not be congruent with the requirements of the law: institutional and departmental objectives are largely congruent; congruous',
    'converge; kənˈvərj; (of lines) tend to meet at a point; a pair of lines of longitude are parallel at the equator but converge toward the poles: convoys from America and the UK traversed thousands of miles to converge in the Atlantic; meet, intersect, cross, connect, link up, coincide, join, unite, merge',
    'cruft; krəft; badly designed, unnecessarily complicated, or unwanted code or software; this removes all unnecessary cruft from Word documents saved as HTML; detritus',
    'conceit; kənˈsēt; excessive pride in oneself; he was puffed up with conceit; vanity, narcissism, conceitedness, egotism, self-admiration, self-regard; pride, arrogance, hubris, self-importance; self-satisfaction, smugness',
    'disparate; ˈdispərət; essentially different in kind, not allowing comparison; they inhabit disparate worlds of thought; contrasting, different, differing, dissimilar, unalike, poles apart',
    'defy; dəˈfī; openly resist or refuse to obey; a woman who defies convention: his actions defy belief: he glowered at her, defying her to mock him; disobey, go against, flout, fly in the face of, disregard, ignore',
    'detract; dəˈtrakt; (detract from) reduce or take away the worth or value of; these quibbles in no way detract from her achievement: it detracts not one iota from the credit due to them: the complaint was timed to detract attention from the ethics issue; belittle, take away from, diminish, reduce, lessen, minimize, play down, trivialize, decry, depreciate, devalue, deprecate',
    'endow; inˈdou; give or bequeath an income or property to (a person or institution); he endowed the church with lands: he was endowed with tremendous physical strength; provide, supply, furnish, equip, invest, favor, bless, grace, gift',
    "frantic; ˈfran(t)ik; wild or distraught with fear, anxiety, or other emotion; she was frantic with worry: frantic attempts to resuscitate the girl;  panic-stricken, panicky, beside oneself, at one's wits' end, distraught, overwrought, worked up, agitated, distressed; frenzied, wild, frenetic, fraught, feverish, hysterical, desperate; informal in a state, in a tizzy, wound up, het up, in a flap, tearing one's hair out",
    "fend; fend; look after and provide for oneself, without any help from others; you're old enough to fend for yourself; take care of oneself, look after oneself, provide for oneself, manage (by oneself), cope alone, stand on one's own two feet ",
    'menial; ˈmēnēəl; (of work) not requiring much skill and lacking prestige; menial factory jobs; unskilled, lowly, humble, low-status, inferior, degrading',
    'drudgery; ˈdrəj(ə)rē; hard menial or dull work; domestic drudgery; hard work, menial work, donkey work, toil, labor',
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
      viewCount: 0,
    };
  });
}

export default data;

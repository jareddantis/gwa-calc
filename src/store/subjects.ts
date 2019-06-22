/**
 * List of all the subjects per PSHS grade level,
 * along with the corresponding grade units.
 *
 * @file subjects.ts
 * @author Jared Dantis (@jareddantis)
 * @license GPLv2
 */

export interface Subject { name: string, units: number }
interface SubjectSet { name: string, subjects: Subject[] }

const sets = [
  {
    name: 'PSHS Grade 7',
    subjects: [
      { name: 'Integrated Science', units: 1.7 },
      { name: 'Mathematics', units: 1.7 },
      { name: 'Computer Science', units: 1 },
      { name: 'English', units: 1.3 },
      { name: 'Filipino', units: 1 },
      { name: 'Social Science', units: 1 },
      { name: 'PEHM', units: 1 },
      { name: 'Values Education', units: 0.7 },
      { name: 'AdTech', units: 1 },
    ],
  },
  {
    name: 'PSHS Grade 8',
    subjects: [
      { name: 'Integrated Science', units: 2 },
      { name: 'Mathematics', units: 1.7 },
      { name: 'Computer Science', units: 1 },
      { name: 'English', units: 1.3 },
      { name: 'Filipino', units: 1 },
      { name: 'Social Science', units: 1 },
      { name: 'PEHM', units: 1 },
      { name: 'Values Education', units: 0.7 },
      { name: 'AdTech', units: 1 },
      { name: 'Earth Science', units: 0.7 },
    ],
  },
  {
    name: 'PSHS Grade 9',
    subjects: [
      { name: 'Biology', units: 1 },
      { name: 'Chemistry', units: 1 },
      { name: 'Physics', units: 1 },
      { name: 'Mathematics', units: 1 },
      { name: 'English', units: 1 },
      { name: 'Filipino', units: 1 },
      { name: 'Social Science', units: 1 },
      { name: 'PEHM', units: 1 },
      { name: 'Statistics', units: 1 },
      { name: 'Computer Science', units: 1 },
    ],
  },
  {
    name: 'PSHS Grade 10',
    subjects: [
      { name: 'Biology', units: 1 },
      { name: 'Chemistry', units: 1 },
      { name: 'Physics', units: 1 },
      { name: 'Mathematics', units: 1.3 },
      { name: 'English', units: 1 },
      { name: 'Filipino', units: 1 },
      { name: 'Social Science', units: 1 },
      { name: 'PEHM', units: 1 },
      { name: 'Research', units: 1 },
      { name: 'Computer Science', units: 1 },
      { name: 'Elective', units: 1 },
    ],
  },
  {
    name: 'PSHS Grade 10 (no elective)',
    subjects: [
      { name: 'Biology', units: 1 },
      { name: 'Chemistry', units: 1 },
      { name: 'Physics', units: 1 },
      { name: 'Mathematics', units: 1.3 },
      { name: 'English', units: 1 },
      { name: 'Filipino', units: 1 },
      { name: 'Social Science', units: 1 },
      { name: 'PEHM', units: 1 },
      { name: 'Research', units: 1 },
      { name: 'Computer Science', units: 1 },
    ],
  },
  {
    name: 'PSHS SYP',
    subjects: [
      { name: 'Research', units: 2 },
      { name: 'Core Science', units: 1.7 },
      { name: 'Elective', units: 1.7 },
      { name: 'Mathematics', units: 1 },
      { name: 'English', units: 1 },
      { name: 'Filipino', units: 1 },
      { name: 'Social Science', units: 1 },
    ],
  },
]

const setMap = new Map()
for (const set of sets) {
  const { name, subjects } = set
  setMap.set(name, subjects)
}

export const setNames = Array.from(setMap.keys())
export default setMap

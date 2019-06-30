export interface Subject { name: string, units: number }

export function compareSets(oldSet: Subject[], newSet: Subject[]): boolean {
  // Check if length is different
  if (oldSet.length !== newSet.length) {
    return true
  }

  // Length is the same! Check if subjects are different
  for (const { name, units } of oldSet) {
    const matches = newSet.filter((subject) => {
      return subject.name === name && subject.units === units
    })

    if (matches.length === 0) {
      // New set lacks old subject
      return true
    }
  }

  // Subject sets are assumed to be equal
  return false
}

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

const polls = [
    {
        id: 45854,
        title: 'What is your favorite programming language?',
        description: 'There are several programming languages. Which one do you like most?',
        options: [
            { id: 15964, value: 'C', vote: 0 },
            { id: 15965, value: 'Python', vote: 0 },
            { id: 15966, value: 'Java', vote: 0 },
        ],
        created: new Date(),
        totalVote: 0,
        opinions: [],
    },
    {
        id: 45855,
        title: 'What is your favorite frontend framework?',
        description: 'There are several frontend frameworks. Which one do you like most?',
        options: [
            { id: 15967, value: 'React', vote: 0 },
            { id: 15968, value: 'Angular', vote: 0 },
            { id: 15969, value: 'Vue', vote: 0 },
        ],
        created: new Date(),
        totalVote: 0,
    },
]

export default polls;
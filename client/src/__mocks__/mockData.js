module.exports = {
  appDefaultState: {
    scrollPosition: 750,
    questionsEnabled: true,
    currentUserId: null,
    displayGraphCover: true
  },
  event: {
    target: {
      name: 'Jeff',
      value: 'websocket'
    }
  },
  beeFactsPost: {
    body: '{"users_id":2,"user_answer":"","question":"bee species"}',
    headers: { 'Content-type': 'application/json' },
    method: 'POST'
  },
  headerDefaultState: {
    concern: '',
    age: '',
    location: {},
    answered: false
  },
  impactDefaultState: {
    percent: 0,
    unit: 'million',
    monetary: '',
    economy: '',
    answeredeconomy: false,
    answeredpercent: false
  },
  impactFactsPost: {
    body: '{"users_id":2,"question":"are plants great"}',
    headers: { 'Content-type': 'application/json' },
    method: 'POST'
  },
  problemsPostBody: {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      users_id: 2,
      user_answer: 30,
      question: 'What percent of bee colonies do beekeepers lose every year?'
    })
  },
  rawStatistics: [
    {
      id: 48,
      question:
        'What percentage of your diet do you think is provided by bees?',
      user_answer: '35',
      users_id: 50
    },
    {
      id: 49,
      question: 'How much do bees contribute to the economy, anually?',
      user_answer: '400_million',
      users_id: 50
    },
    { id: 50, question: 'bee species', user_answer: '200', users_id: 50 },
    {
      id: 51,
      question: 'What percent of bee colonies do beekeepers lose every year?',
      user_answer: '40',
      users_id: 50
    },
    {
      id: 52,
      question:
        'What percentage of your diet do you think is provided by bees?',
      user_answer: '80',
      users_id: 51
    },
    {
      id: 53,
      question: 'How much do bees contribute to the economy, anually?',
      user_answer: '400_billion',
      users_id: 51
    },
    { id: 54, question: 'bee species', user_answer: '100', users_id: 51 },
    {
      id: 55,
      question: 'What percent of bee colonies do beekeepers lose every year?',
      user_answer: '25',
      users_id: 51
    }
  ],
  cleanedStatistics: {
    'How much do bees contribute to the economy, anually?': {
      count: { '400_million': 1, '400_billion': 1 },
      sum: 400400000000
    },
    'What percent of bee colonies do beekeepers lose every year?': {
      count: { 25: 1, 40: 1 },
      sum: 65
    },
    'What percentage of your diet do you think is provided by bees?': {
      count: { 35: 1, 80: 1 },
      sum: 115
    },
    'bee species': { count: { 100: 1, 200: 1 }, sum: 300 }
  },
  cleanedAverageData: {
    'How much do bees contribute to the economy, anually?': {
      count: { '400_million': 1, '400_billion': 1 },
      sum: 400400000000,
      average: 200200000000
    },
    'What percent of bee colonies do beekeepers lose every year?': {
      count: { 25: 1, 40: 1 },
      sum: 65,
      average: 32.5
    },
    'What percentage of your diet do you think is provided by bees?': {
      count: { 35: 1, 80: 1 },
      sum: 115,
      average: 57.5
    },
    'bee species': { count: { 100: 1, 200: 1 }, sum: 300, average: 150 }
  },
  pieChartDefaultState: {
    class: '',
    degree: 0,
    percent: 10
  },
  percentEvent: {
    target: {
      name: 'percent',
      value: 55
    }
  }
};

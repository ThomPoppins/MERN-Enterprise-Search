export default function calculateRelevance(user, searchTerm) {
  const searchTerms = searchTerm.toLowerCase().split(/\s+/);
  let relevance = 0;

  for (let i = 0; i < searchTerms.length; i++) {
    const term = searchTerms[i];

    if (user.username.toLowerCase().includes(term)) {
      relevance += 4;
    }
    if (user.firstName.toLowerCase().includes(term)) {
      relevance += 3;
    }
    if (user.lastName.toLowerCase().includes(term)) {
      relevance += 2;
    }
    if (user.email.toLowerCase().includes(term)) {
      relevance += 1;
    }
  }

  return relevance;
}

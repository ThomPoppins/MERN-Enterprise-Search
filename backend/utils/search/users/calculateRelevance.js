export default function calculateRelevance(user, searchTerm) {
  let relevance = 0;
  if (user.username.toLowerCase().includes(searchTerm.toLowerCase())) {
    relevance += 4;
  }
  if (user.email.toLowerCase().includes(searchTerm.toLowerCase())) {
    relevance += 3;
  }
  if (user.lastName.toLowerCase().includes(searchTerm.toLowerCase())) {
    relevance += 2;
  }
  if (user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) {
    relevance += 1;
  }
  return relevance;
}

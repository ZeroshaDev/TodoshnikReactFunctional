async function apiCall(elem, path, met, token) {
  let url = process.env.REACT_APP_URL
  const response = await fetch(url + path, {
    method: met,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: elem.id,
      content: elem.content,
      completed: elem.completed,
    }),
  })
  const responseText = await response.text()
  console.log(responseText)
}

export default apiCall

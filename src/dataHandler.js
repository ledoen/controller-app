function handleData(data) {
  const temperature = parseFloat(data);
  this.send('data', temperature);
}

module.exports = { handleData };
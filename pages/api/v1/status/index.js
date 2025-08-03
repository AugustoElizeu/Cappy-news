function status(request, response) {
  response.status(200).json({
    chave: "Engel",
  });
}

export default status;

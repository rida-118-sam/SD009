function paginate(data, page = 1, pageSize = 5) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    currentPage: page,
    totalPages: Math.ceil(data.length / pageSize),
    data: data.slice(start, end),
  };
}

module.exports = paginate;

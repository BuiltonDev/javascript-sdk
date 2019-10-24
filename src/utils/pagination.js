class Pagination {
  constructor(page, size, current, paginationTotal, queryFn, urlParams, args) {
    this.page = page;
    this.size = size;
    this.current = current;
    this.paginationTotal = paginationTotal;
    this._query = (done) => queryFn({
      ...args,
      urlParams: { ...urlParams, page: this.page, size: this.size },
    }, done)
      .then((newObj) => {
        this.current = newObj;
        return this.current;
      })
      .catch((err) => Promise.reject(err));

    this.next = (done) => {
      if (this.page >= Math.floor(this.paginationTotal / this.size)) {
        return Promise.resolve(this.current);
      }
      this.page += 1;
      return this._query(done);
    };

    this.previous = (done) => {
      if (this.page <= 0) {
        return Promise.resolve(this.current);
      }
      this.page -= 1;
      return this._query(done);
    };

    this.goToPage = (pageNb, done) => {
      this.page = pageNb;
      return this._query(done);
    };
  }
}

module.exports = Pagination;

function SearchMain() {
  return (
    <div class="container">
      <div class="jumbotron mt-5 ">
        <h1 class="display-5">Find Job</h1>
        <p class="lead">Search jobs by skill, location, and category.</p>
        <form>
          <div class="form-row">
            <div class="form-group col-md-4">
              <input type="text" class="form-control" id="inputSkill" placeholder="Skill" />
            </div>
            <div class="form-group col-md-4">
              <input type="text" class="form-control" id="inputLocation" placeholder="Location" />
            </div>
            <div class="form-group col-md-4">
              <select id="inputCategory" class="form-control">
                <option selected>Choose Category...</option>
                <option>Software Development</option>
                <option>Marketing</option>
                <option>Finance</option>
                <option>Design</option>
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchMain;

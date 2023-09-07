const SearchBar = () => {
  return (
    <div>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          aria-label="Text input with segmented dropdown button"
        ></input>
        <button type="button" className="btn btn-outline-secondary">
          Search
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <a className="dropdown-item" href="#">
              By Title
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              By Tag
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SearchBar

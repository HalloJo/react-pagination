import { useState } from 'react';
import './App.css';
import { awesomeData } from './data.ts';

function App() {
  const [data, setData] = useState(awesomeData);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const numberOfPages = Math.ceil(data.length / itemsPerPage);
  const pages = [...Array(numberOfPages + 1).keys()].slice(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const visibleItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevious = () => {
    currentPage !== 1 && setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    currentPage !== numberOfPages && setCurrentPage(currentPage + 1);
  };

  return (
    <div className="wrapper">
      <div>
        <h2>Pagination!</h2>
        <div className="options">
          <p>Items per page: </p>
          <select
            onChange={(event) => setItemsPerPage(Number(event.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
      <ul>
        {visibleItems.map((item) => {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
      <div className="pagination">
        <button onClick={handlePrevious}>Previous</button>

        <div>
          {pages.map((page) => {
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`${currentPage === page && 'active'}`}
              >
                {page}
              </button>
            );
          })}
        </div>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default App;
